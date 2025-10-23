import React from 'react';
import { Paper, Stack, Typography, Button, TextField, Table, TableHead, TableRow, TableCell, TableBody, Chip, TableContainer, Box, Card, CardContent, Divider, IconButton, Tooltip, Alert, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar } from '@mui/material';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import PaymentRoundedIcon from '@mui/icons-material/PaymentRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import { request } from '../api/client';
import jsPDF from 'jspdf';

// Organization info for 80G receipt
const ORG_INFO = {
    PAN: 'AAATK7667F',
    EIGHTYG_NO: 'AAATK7667FE1985001',
    REG_12A: 'AAATK7667FE19850',
    PLACE: 'Kolkata',
};

// Convert amount to words (Indian numbering system)
function numberToWordsIndian(num) {
    num = Math.floor(Number(num) || 0);
    if (num === 0) return 'Zero';

    const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    const inWordsUptoHundred = (n) => {
        if (n < 20) return a[n];
        const tens = Math.floor(n / 10);
        const ones = n % 10;
        return b[tens] + (ones ? ' ' + a[ones] : '');
    };

    let words = '';
    const crore = Math.floor(num / 10000000);
    num %= 10000000;
    const lakh = Math.floor(num / 100000);
    num %= 100000;
    const thousand = Math.floor(num / 1000);
    num %= 1000;
    const hundred = Math.floor(num / 100);
    const rest = num % 100;

    if (crore) words += inWordsUptoHundred(crore) + ' Crore ';
    if (lakh) words += inWordsUptoHundred(lakh) + ' Lakh ';
    if (thousand) words += inWordsUptoHundred(thousand) + ' Thousand ';
    if (hundred) words += a[hundred] + ' Hundred ';
    if (rest) words += (words ? 'and ' : '') + inWordsUptoHundred(rest) + ' ';

    return words.trim();
}

function formatAmountINR(val) {
    const n = Number(val || 0);
    return n.toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

export default function AdminTransactions({ transactions = [] }) {
    const [dateFrom, setDateFrom] = React.useState('');
    const [dateTo, setDateTo] = React.useState('');
    const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false);

    // Server/API state (count is defaulted to 50 and not shown in UI)
    const [count] = React.useState(50);
    const [skip, setSkip] = React.useState(0);
    const [rows, setRows] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    // Details dialog state
    const [detailOpen, setDetailOpen] = React.useState(false);
    const [detailItem, setDetailItem] = React.useState(null);

    // Capture payment state
    const [capturing, setCapturing] = React.useState({});
    const [captureSuccess, setCaptureSuccess] = React.useState({});
    const [captureError, setCaptureError] = React.useState({});

    const closeFiltersIfMobile = () => setMobileFiltersOpen(false);

    // Capture payment handler
    const handleCapturePayment = async (paymentId, amount) => {
        setCapturing(prev => ({ ...prev, [paymentId]: true }));
        setCaptureError(prev => ({ ...prev, [paymentId]: null }));
        setCaptureSuccess(prev => ({ ...prev, [paymentId]: false }));

        try {
            const response = await fetch(
                `/api/admin/razorpay/payments/${paymentId}/capture`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ amount: amount * 100 }), // Convert to paise
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to capture payment');
            }

            setCaptureSuccess(prev => ({ ...prev, [paymentId]: true }));

            // Refresh transactions after successful capture
            setTimeout(() => {
                fetchPayments(skip);
            }, 2000);
        } catch (error) {
            console.error('Capture payment error:', error);
            setCaptureError(prev => ({
                ...prev,
                [paymentId]: error.message || 'Failed to capture payment'
            }));
        } finally {
            setCapturing(prev => ({ ...prev, [paymentId]: false }));
        }
    };

    const setRelativeRange = (days) => {
        const to = new Date();
        const from = new Date();
        from.setDate(to.getDate() - (days - 1));
        setDateFrom(from.toISOString().slice(0, 10));
        setDateTo(to.toISOString().slice(0, 10));
        closeFiltersIfMobile();
    };
    const setParticularDate = (daysOffset = 0) => {
        const d = new Date();
        d.setDate(d.getDate() + daysOffset);
        const iso = d.toISOString().slice(0, 10);
        setDateFrom(iso); setDateTo(iso);
        closeFiltersIfMobile();
    };
    const setLastFinancialYear = () => {
        const today = new Date();
        const year = today.getMonth() >= 3 ? today.getFullYear() : today.getFullYear() - 1;
        const from = new Date(year, 3, 1);
        const to = new Date(year + 1, 2, 31);
        setDateFrom(from.toISOString().slice(0, 10));
        setDateTo(to.toISOString().slice(0, 10));
        closeFiltersIfMobile();
    };

    // Compute default last 24h epoch range
    const getDefaultRange = () => {
        const now = new Date();
        const toTs = Math.floor(now.getTime() / 1000);
        const fromTs = Math.floor((now.getTime() - 24 * 60 * 60 * 1000) / 1000);
        return { fromTs, toTs };
    };

    const resetFilters = () => {
        // Clear UI dates, then fetch using default last 24h regardless of async state
        setDateFrom('');
        setDateTo('');
        closeFiltersIfMobile();
        setSkip(0);
        fetchPayments(0, true);
    };

    const applyFilters = () => {
        closeFiltersIfMobile();
        setSkip(0);
        fetchPayments(0);
    };

    const statusChip = (status) => (
        status === 'Success' ? <Chip label="Success" color="success" size="small" /> :
            status === 'Pending' ? <Chip label="Pending" color="warning" size="small" /> :
                status === 'Failed' ? <Chip label="Failed" color="error" size="small" /> :
                    <Chip label={status} size="small" />
    );

    const statusColor = (status, theme) => {
        if (status === 'Success') return theme.palette.success.main;
        if (status === 'Pending') return theme.palette.warning.main;
        if (status === 'Failed' || status === 'Error') return theme.palette.error.main;
        return theme.palette.divider;
    };

    // Build epoch range; all params optional with sensible defaults
    const buildRange = () => {
        const now = new Date();
        let fromTs, toTs;
        if (!dateFrom && !dateTo) {
            // default last 24 hours
            toTs = Math.floor(now.getTime() / 1000);
            fromTs = Math.floor((now.getTime() - 24 * 60 * 60 * 1000) / 1000);
        } else if (dateFrom && dateTo) {
            fromTs = Math.floor(new Date(`${dateFrom}T00:00:00`).getTime() / 1000);
            toTs = Math.floor(new Date(`${dateTo}T23:59:59`).getTime() / 1000);
        } else if (dateFrom) {
            fromTs = Math.floor(new Date(`${dateFrom}T00:00:00`).getTime() / 1000);
            toTs = Math.floor(now.getTime() / 1000);
        } else {
            // only dateTo provided
            const d = new Date(`${dateTo}T23:59:59`);
            toTs = Math.floor(d.getTime() / 1000);
            fromTs = Math.floor((d.getTime() - 24 * 60 * 60 * 1000) / 1000);
        }
        return { fromTs, toTs };
    };

    // Transform payment item -> UI row, storing raw for details view
    const mapPayment = (p) => {
        const rupees = Math.round(((p?.amount ?? 0) / 100));
        const dt = p?.created_at ? new Date(p.created_at * 1000) : new Date();
        const date = dt.toISOString().slice(0, 10);
        let status = (p?.status || '').toLowerCase();
        status = status === 'captured' ? 'Success' : status === 'authorized' ? 'Pending' : status === 'failed' ? 'Failed' : p?.status || 'Unknown';
        return {
            id: p?.id || '-',
            date,
            particular: p?.description || 'Donation',
            amount: rupees,
            method: (p?.method || '-').toUpperCase(),
            status,
            raw: p,
        };
    };

    // Fetch from secured admin API (Bearer token handled by request())
    const fetchPayments = async (overrideSkip, forceDefaultRange = false) => {
        const qSkip = typeof overrideSkip === 'number' ? overrideSkip : skip;
        const { fromTs, toTs } = forceDefaultRange ? getDefaultRange() : buildRange();
        const qs = new URLSearchParams();
        // All optional; include if defined
        if (fromTs) qs.set('from', String(fromTs));
        if (toTs) qs.set('to', String(toTs));
        if (count) qs.set('count', String(count));
        if (typeof qSkip === 'number') qs.set('skip', String(qSkip));

        const path = `/api/admin/razorpay/payments?${qs.toString()}`;
        setLoading(true);
        setError('');
        try {
            const res = await request(path, { method: 'GET' });
            // API response wrapper: { statusCode, statusMessage, data: { count, items } }
            const data = res?.data || {};
            const items = Array.isArray(data?.items) ? data.items : [];
            setRows(items.map(mapPayment));
            setTotal(data?.count || items.length || 0);
            if (typeof overrideSkip === 'number') setSkip(overrideSkip);
        } catch (e) {
            setError(e?.message || 'Failed to load payments');
            setRows([]);
        } finally {
            setLoading(false);
        }
    };

    // Initial load: last 24 hours
    React.useEffect(() => {
        fetchPayments(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Use only API rows; if none, show the empty state
    const baseTx = rows;

    const handleOpenDetail = (row) => {
        const raw = row?.raw || null;
        setDetailItem(raw);
        setDetailOpen(Boolean(raw));
    };
    const handleCloseDetail = () => {
        setDetailOpen(false);
        setDetailItem(null);
    };

    const prettyStatus = (s) => {
        const v = (s || '').toLowerCase();
        if (v === 'captured') return 'Success';
        if (v === 'authorized') return 'Pending';
        if (v === 'failed') return 'Failed';
        return s || 'Unknown';
    };

    // Generate PDF receipt for a transaction
    const generatePDF = (transaction) => {
        const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 14;

        // Draw header background
        doc.setFillColor(255, 255, 255);
        doc.rect(0, 0, pageWidth, 50, 'F');

        // Organization name in maroon/red color
        doc.setTextColor(139, 0, 0); // Maroon color
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(22);
        doc.text('JANASIKSHA PROCHAR KENDRA', pageWidth / 2, 15, { align: 'center' });

        // Certificate info in orange
        doc.setTextColor(255, 100, 0);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('Certificate of Registration of Societies West Bengal Act XXVI of 1961', pageWidth / 2, 22, { align: 'center' });
        doc.setFontSize(9);
        doc.text('Registration No. : S/12026 of 1972-1973 dt. 09.08.1972', pageWidth / 2, 27, { align: 'center' });

        // Service info in purple
        doc.setTextColor(128, 0, 128);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text('Four Decades of dedicated service to the deprived', pageWidth / 2, 32, { align: 'center' });

        // Awards info in dark blue
        doc.setTextColor(0, 0, 139);
        doc.setFontSize(7.5);
        doc.setFont('helvetica', 'normal');
        const awards1 = 'Honoured with National Award, Rusi B. Gimi Award (State Award) and Nehru Childrens\' Award';
        const awards2 = 'for Outstanding Service in Child Welfare, Women Empowerment and Welfare of Senior Citizens\' and';
        const awards3 = 'Certificate of Honour of Service of Rural India (Confederation of NGOs of Rural India)';
        doc.text(awards1, pageWidth / 2, 36, { align: 'center' });
        doc.text(awards2, pageWidth / 2, 40, { align: 'center' });
        doc.text(awards3, pageWidth / 2, 44, { align: 'center' });

        // Website in green
        doc.setTextColor(0, 128, 0);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('Website : www.jpkindia.org', pageWidth / 2, 50, { align: 'center' });

        // Head Office Address (centered)
        doc.setTextColor(0, 0, 139); // Dark blue
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text('Head Office :', pageWidth / 2, 57, { align: 'center' });
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.text('CK - 6, Sector -II, Salt Lake City, Kolkata - 700 091, W.B., India', pageWidth / 2, 62, { align: 'center' });
        doc.text('Mob. : 7980320462', pageWidth / 2, 67, { align: 'center' });
        doc.text('E-mail : jpksaltlake91@gmail.com', pageWidth / 2, 72, { align: 'center' });

        // Horizontal line separator
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.5);
        doc.line(margin, 76, pageWidth - margin, 76);

        // Title
        const title = 'RECEIPT U/S 80G OF INCOME TAX ACT, 1961';
        doc.setTextColor(139, 0, 0); // Maroon
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(13);
        doc.text(title, pageWidth / 2, 85, { align: 'center' });

        // Org compliance quick facts row under title
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        const compY = 92;
        const infoLine = `Trust PAN: ${ORG_INFO.PAN || '-'}    80G Regn No: ${ORG_INFO.EIGHTYG_NO || '-'}    12A Regn No: ${ORG_INFO.REG_12A || '-'}`;
        doc.text(infoLine, pageWidth / 2, compY, { align: 'center' });

        // Info card box
        const boxTop = compY + 4;
        const boxLeft = margin;
        const boxWidth = pageWidth - margin * 2;
        const boxHeight = 142;
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.4);
        doc.roundedRect(boxLeft, boxTop, boxWidth, boxHeight, 2, 2, 'S');

        // Helpers
        const label = (x, y, text) => {
            doc.setTextColor('#4b5563');
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            doc.text(text, x, y);
        };
        const value = (x, y, text) => {
            doc.setTextColor('#111827');
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(11.5);
            doc.text(text, x, y);
        };

        const rupees = Math.round((transaction.amount || 0) / 100);
        const words = numberToWordsIndian(rupees);

        let y = boxTop + 12;
        const col1 = boxLeft + 8;
        const col2 = boxLeft + boxWidth / 2 + 2;

        // Top meta
        label(col1, y, 'Receipt No');
        value(col1, y + 6, transaction?.notes?.local_order_id || transaction.id || 'N/A');
        label(col2, y, 'Date');
        value(col2, y + 6, transaction.created_at ? new Date(transaction.created_at * 1000).toLocaleDateString() : new Date().toLocaleDateString());
        y += 18;

        // Donor details
        label(col1, y, 'Name of Donor');
        value(col1, y + 6, transaction?.notes?.donor_name || '-');
        label(col2, y, 'PAN of Donor');
        value(col2, y + 6, transaction?.notes?.donor_pan || '-');
        y += 18;

        label(col1, y, 'Email');
        value(col1, y + 6, transaction?.notes?.donor_email || transaction?.email || '-');
        label(col2, y, 'Phone');
        value(col2, y + 6, transaction?.contact || '-');
        y += 18;

        label(col1, y, 'Address');
        doc.setTextColor('#111827');
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11.5);
        const address = '-';
        const addrLines = doc.splitTextToSize(address, boxWidth - 16);
        doc.text(addrLines, col1, y + 6);
        y += Math.max(18, 6 + (addrLines.length - 1) * 6 + 12);

        // Separator
        doc.setDrawColor(230, 230, 230);
        doc.line(boxLeft + 4, y - 4, boxLeft + boxWidth - 4, y - 4);

        // Amount & payment info
        label(col1, y, 'Amount (INR)');
        value(col1, y + 8, `₹ ${formatAmountINR(rupees)}`);
        label(col2, y, 'Amount (in words)');
        value(col2, y + 8, `Rupees ${words} only`);
        y += 20;

        label(col1, y, 'Purpose');
        value(col1, y + 6, transaction?.description || 'Donation');
        label(col2, y, 'Mode of Payment');
        value(col2, y + 6, `Online (${(transaction?.method || 'Razorpay').toUpperCase()})`);
        y += 18;

        label(col1, y, 'Transaction Ref');
        value(col1, y + 6, transaction?.id || '—');
        label(col2, y, 'Place');
        value(col2, y + 6, ORG_INFO.PLACE || '-');
        y += 18;

        // 80G exemption and electronic receipt note (styled box below details)
        const notesTop = boxTop + boxHeight + 10;
        const note1 = "The Donation is exempted u/s 80G of the Income Tax Act 1961 as per the Central Board of Direct Tax's notification No. SO 1337 dt. 15.04.1965.";
        const note2 = 'This is an electronically generated receipt, no signature is required.';
        const wrapped1 = doc.splitTextToSize(note1, boxWidth - 12);
        const wrapped2 = doc.splitTextToSize(note2, boxWidth - 12);
        const notesHeight = 18 + (wrapped1.length + wrapped2.length) * 6 + 4;

        doc.setFillColor(248, 250, 252);
        doc.setDrawColor(230, 230, 230);
        doc.roundedRect(boxLeft, notesTop, boxWidth, notesHeight, 3, 3, 'FD');

        doc.setTextColor('#111827');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.text('Important Notes', boxLeft + 6, notesTop + 8);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9.5);
        doc.setTextColor('#374151');
        let ny = notesTop + 14;
        doc.text(wrapped1, boxLeft + 6, ny);
        ny += wrapped1.length * 6 + 3;
        doc.text(wrapped2, boxLeft + 6, ny);

        const fileName = `JPK_Donation_Receipt_${transaction?.notes?.local_order_id || transaction.id || Date.now()}.pdf`;
        doc.save(fileName);
    };

    return (
        <Stack spacing={2}>
            {/* Filters header */}
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ display: { xs: 'flex', sm: 'none' } }}>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>Transactions</Typography>
                <Tooltip title={mobileFiltersOpen ? 'Hide filters' : 'Show filters'}>
                    <IconButton onClick={() => setMobileFiltersOpen((v) => !v)} size="small" color={mobileFiltersOpen ? 'primary' : 'default'}>
                        <FilterAltRoundedIcon />
                    </IconButton>
                </Tooltip>
            </Stack>

            {/* Filters block */}
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, display: { xs: mobileFiltersOpen ? 'block' : 'none', sm: 'block' } }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ display: { xs: 'flex', sm: 'none' }, mb: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Filters</Typography>
                    <IconButton onClick={() => setMobileFiltersOpen(false)} size="small">
                        <CloseRoundedIcon />
                    </IconButton>
                </Stack>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, display: { xs: 'none', sm: 'block' } }}>Filters</Typography>
                <Stack direction="row" flexWrap="wrap" spacing={1} useFlexGap>
                    <Button size="small" variant="outlined" onClick={() => setParticularDate(0)}>Particular date (today)</Button>
                    <Button size="small" variant="outlined" onClick={() => setParticularDate(0)}>Today</Button>
                    <Button size="small" variant="outlined" onClick={() => setParticularDate(-1)}>Yesterday</Button>
                    <Button size="small" variant="outlined" onClick={() => setRelativeRange(7)}>Last week</Button>
                    <Button size="small" variant="outlined" onClick={() => setRelativeRange(30)}>Last month</Button>
                    <Button size="small" variant="outlined" onClick={() => setRelativeRange(365)}>Last 365 days</Button>
                    <Button size="small" variant="outlined" onClick={setLastFinancialYear}>Last financial year</Button>
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 2 }}>
                    <TextField label="From" type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} InputLabelProps={{ shrink: true }} sx={{ maxWidth: 220 }} />
                    <TextField label="To" type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} InputLabelProps={{ shrink: true }} sx={{ maxWidth: 220 }} />
                    <Button size="small" variant="contained" onClick={applyFilters} disabled={loading}>Apply</Button>
                    <Button size="small" variant="text" onClick={resetFilters} disabled={loading}>Reset</Button>
                </Stack>
                {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            </Paper>

            {/* Desktop/Tablet table */}
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Paper variant="outlined" sx={{ borderRadius: 3 }}>
                    <TableContainer sx={{ borderRadius: 3 }}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Txn ID</TableCell>
                                    <TableCell>Particular</TableCell>
                                    <TableCell align="right">Amount (₹)</TableCell>
                                    <TableCell>Method</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Receipt</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {baseTx.map((t) => (
                                    <TableRow key={t.id} hover>
                                        <TableCell onClick={() => handleOpenDetail(t)} sx={{ cursor: 'pointer' }}>{t.date}</TableCell>
                                        <TableCell onClick={() => handleOpenDetail(t)} sx={{ cursor: 'pointer' }}>{t.id}</TableCell>
                                        <TableCell onClick={() => handleOpenDetail(t)} sx={{ cursor: 'pointer' }}>{t.particular}</TableCell>
                                        <TableCell onClick={() => handleOpenDetail(t)} sx={{ cursor: 'pointer' }} align="right">{Number(t.amount || 0).toLocaleString()}</TableCell>
                                        <TableCell onClick={() => handleOpenDetail(t)} sx={{ cursor: 'pointer' }}>{t.method}</TableCell>
                                        <TableCell onClick={() => handleOpenDetail(t)} sx={{ cursor: 'pointer' }}>{statusChip(t.status)}</TableCell>
                                        <TableCell>
                                            <Tooltip title="Download Receipt">
                                                <IconButton
                                                    size="small"
                                                    color="primary"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        generatePDF(t.raw);
                                                    }}
                                                >
                                                    <DownloadRoundedIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell>
                                            {t.status === 'Pending' && (
                                                <Box>
                                                    <Button
                                                        size="small"
                                                        variant="contained"
                                                        color="primary"
                                                        disabled={capturing[t.id]}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleCapturePayment(t.id, t.amount);
                                                        }}
                                                        sx={{ minWidth: 100 }}
                                                    >
                                                        {capturing[t.id] ? <CircularProgress size={16} color="inherit" /> : 'Capture'}
                                                    </Button>
                                                    {captureSuccess[t.id] && (
                                                        <Typography variant="caption" color="success.main" sx={{ display: 'block', mt: 0.5 }}>
                                                            Success!
                                                        </Typography>
                                                    )}
                                                    {captureError[t.id] && (
                                                        <Typography variant="caption" color="error.main" sx={{ display: 'block', mt: 0.5 }}>
                                                            {captureError[t.id]}
                                                        </Typography>
                                                    )}
                                                </Box>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {!loading && baseTx.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={8} align="center">No transactions for selected range.</TableCell>
                                    </TableRow>
                                )}
                                {loading && (
                                    <TableRow>
                                        <TableCell colSpan={8} align="center"><CircularProgress size={20} /></TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>

            {/* Mobile card list */}
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <Stack spacing={1.5}>
                    {baseTx.map((t) => (
                        <Card key={t.id} variant="outlined" sx={{ borderRadius: 3, position: 'relative', overflow: 'hidden' }}>
                            {/* Status accent bar */}
                            <Box sx={(theme) => ({ position: 'absolute', top: 0, left: 0, right: 0, height: 4, bgcolor: statusColor(t.status, theme) })} />
                            <CardContent sx={{ pt: 1.25 }}>
                                <Stack spacing={1}>
                                    <Stack direction="row" alignItems="center" justifyContent="space-between" onClick={() => handleOpenDetail(t)} sx={{ cursor: 'pointer' }}>
                                        <Typography variant="h6" sx={{ fontWeight: 800 }}>₹ {Number(t.amount || 0).toLocaleString()}</Typography>
                                        {statusChip(t.status)}
                                    </Stack>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, cursor: 'pointer' }} onClick={() => handleOpenDetail(t)}>{t.particular}</Typography>
                                    <Divider sx={{ my: 0.5 }} />
                                    <Stack spacing={0.75} onClick={() => handleOpenDetail(t)} sx={{ cursor: 'pointer' }}>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <ReceiptLongRoundedIcon fontSize="small" color="action" />
                                            <Typography variant="body2" sx={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }} color="text.secondary">{t.id}</Typography>
                                        </Stack>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <CalendarMonthRoundedIcon fontSize="small" color="action" />
                                            <Typography variant="body2" color="text.secondary">{t.date}</Typography>
                                        </Stack>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <PaymentRoundedIcon fontSize="small" color="action" />
                                            <Typography variant="body2" color="text.secondary">{t.method}</Typography>
                                        </Stack>
                                    </Stack>
                                    {/* Action buttons */}
                                    <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                                        <Button
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            startIcon={<DownloadRoundedIcon />}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                generatePDF(t.raw);
                                            }}
                                        >
                                            Download Receipt
                                        </Button>
                                        {t.status === 'Pending' && (
                                            <>
                                                <Button
                                                    fullWidth
                                                    size="small"
                                                    variant="contained"
                                                    color="primary"
                                                    disabled={capturing[t.id]}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleCapturePayment(t.id, t.amount);
                                                    }}
                                                >
                                                    {capturing[t.id] ? <CircularProgress size={16} color="inherit" /> : 'Capture Payment'}
                                                </Button>
                                                {captureSuccess[t.id] && (
                                                    <Typography variant="caption" color="success.main" sx={{ display: 'block', textAlign: 'center' }}>
                                                        Payment captured successfully!
                                                    </Typography>
                                                )}
                                                {captureError[t.id] && (
                                                    <Typography variant="caption" color="error.main" sx={{ display: 'block', textAlign: 'center' }}>
                                                        {captureError[t.id]}
                                                    </Typography>
                                                )}
                                            </>
                                        )}
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    ))}
                    {!loading && baseTx.length === 0 && (
                        <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', borderRadius: 3 }}>
                            No transactions for selected range.
                        </Paper>
                    )}
                    {loading && (
                        <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', borderRadius: 3 }}>
                            <CircularProgress size={20} />
                        </Paper>
                    )}
                </Stack>
            </Box>

            {/* Details Dialog */}
            <Dialog open={detailOpen} onClose={handleCloseDetail} maxWidth="md" fullWidth>
                <DialogTitle>Transaction details</DialogTitle>
                <DialogContent dividers>
                    {detailItem ? (
                        <Stack spacing={2}>
                            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Summary</Typography>
                                <Table size="small">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell sx={{ width: 220 }}>Transaction ID</TableCell>
                                            <TableCell sx={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}>{detailItem.id}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Status</TableCell>
                                            <TableCell>{prettyStatus(detailItem.status)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Amount</TableCell>
                                            <TableCell>₹ {Math.round((detailItem.amount || 0) / 100).toLocaleString()} {detailItem.currency || ''}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Method</TableCell>
                                            <TableCell>{(detailItem.method || '-').toUpperCase()}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Description</TableCell>
                                            <TableCell>{detailItem.description || '-'}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Created at</TableCell>
                                            <TableCell>{detailItem.created_at ? new Date(detailItem.created_at * 1000).toLocaleString() : '-'}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Paper>

                            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Donor details</Typography>
                                <Table size="small">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell sx={{ width: 220 }}>Donor name</TableCell>
                                            <TableCell>{detailItem?.notes?.donor_name || '-'}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Donor email</TableCell>
                                            <TableCell>{detailItem?.notes?.donor_email || detailItem?.email || '-'}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Donor contact</TableCell>
                                            <TableCell>{detailItem?.contact || '-'}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Donor PAN</TableCell>
                                            <TableCell>{detailItem?.notes?.donor_pan || '-'}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Local order ID</TableCell>
                                            <TableCell sx={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}>{detailItem?.notes?.local_order_id || '-'}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Paper>

                            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Payment details</Typography>
                                <Table size="small">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell sx={{ width: 220 }}>Currency</TableCell>
                                            <TableCell>{detailItem.currency || '-'}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Captured</TableCell>
                                            <TableCell>{String(detailItem.captured)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Order ID</TableCell>
                                            <TableCell>{detailItem.order_id || '-'}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Invoice ID</TableCell>
                                            <TableCell>{detailItem.invoice_id || '-'}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>International</TableCell>
                                            <TableCell>{String(detailItem.international)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Bank</TableCell>
                                            <TableCell>{detailItem.bank || '-'}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Wallet</TableCell>
                                            <TableCell>{detailItem.wallet || '-'}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>VPA</TableCell>
                                            <TableCell>{detailItem.vpa || '-'}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Email</TableCell>
                                            <TableCell>{detailItem.email || '-'}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Contact</TableCell>
                                            <TableCell>{detailItem.contact || '-'}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Amount refunded</TableCell>
                                            <TableCell>₹ {Math.round((detailItem.amount_refunded || 0) / 100).toLocaleString()}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Fee</TableCell>
                                            <TableCell>{detailItem.fee != null ? `₹ ${Math.round((detailItem.fee || 0) / 100).toLocaleString()}` : '-'}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Tax</TableCell>
                                            <TableCell>{detailItem.tax != null ? `₹ ${Math.round((detailItem.tax || 0) / 100).toLocaleString()}` : '-'}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Acquirer transaction ID</TableCell>
                                            <TableCell>{detailItem?.acquirer_data?.bank_transaction_id || '-'}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Paper>

                            {(detailItem.error_code || detailItem.error_description || detailItem.error_reason) && (
                                <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: 'error.main' }}>Errors</Typography>
                                    <Table size="small">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell sx={{ width: 220 }}>Error code</TableCell>
                                                <TableCell>{detailItem.error_code || '-'}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Error description</TableCell>
                                                <TableCell>{detailItem.error_description || '-'}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Error source</TableCell>
                                                <TableCell>{detailItem.error_source || '-'}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Error step</TableCell>
                                                <TableCell>{detailItem.error_step || '-'}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Error reason</TableCell>
                                                <TableCell>{detailItem.error_reason || '-'}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Paper>
                            )}
                        </Stack>
                    ) : (
                        <Typography variant="body2">No details available.</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button
                        startIcon={<DownloadRoundedIcon />}
                        onClick={() => generatePDF(detailItem)}
                        variant="contained"
                        color="primary"
                    >
                        Download Receipt
                    </Button>
                    <Button onClick={handleCloseDetail}>Close</Button>
                </DialogActions>
            </Dialog>
        </Stack>
    );
}
