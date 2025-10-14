import React from 'react';
import { Paper, Stack, Typography, Button, TextField, Table, TableHead, TableRow, TableCell, TableBody, Chip, TableContainer, Box, Card, CardContent, Divider, IconButton, Tooltip, Alert, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import PaymentRoundedIcon from '@mui/icons-material/PaymentRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import { request } from '../api/client';

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

    const closeFiltersIfMobile = () => setMobileFiltersOpen(false);

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
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {baseTx.map((t) => (
                                    <TableRow key={t.id} hover onClick={() => handleOpenDetail(t)} sx={{ cursor: 'pointer' }}>
                                        <TableCell>{t.date}</TableCell>
                                        <TableCell>{t.id}</TableCell>
                                        <TableCell>{t.particular}</TableCell>
                                        <TableCell align="right">{Number(t.amount || 0).toLocaleString()}</TableCell>
                                        <TableCell>{t.method}</TableCell>
                                        <TableCell>{statusChip(t.status)}</TableCell>
                                    </TableRow>
                                ))}
                                {!loading && baseTx.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center">No transactions for selected range.</TableCell>
                                    </TableRow>
                                )}
                                {loading && (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center"><CircularProgress size={20} /></TableCell>
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
                        <Card key={t.id} variant="outlined" onClick={() => handleOpenDetail(t)} sx={{ borderRadius: 3, position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
                            {/* Status accent bar */}
                            <Box sx={(theme) => ({ position: 'absolute', top: 0, left: 0, right: 0, height: 4, bgcolor: statusColor(t.status, theme) })} />
                            <CardContent sx={{ pt: 1.25 }}>
                                <Stack spacing={1}>
                                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                                        <Typography variant="h6" sx={{ fontWeight: 800 }}>₹ {Number(t.amount || 0).toLocaleString()}</Typography>
                                        {statusChip(t.status)}
                                    </Stack>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{t.particular}</Typography>
                                    <Divider sx={{ my: 0.5 }} />
                                    <Stack spacing={0.75}>
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
                    <Button onClick={handleCloseDetail}>Close</Button>
                </DialogActions>
            </Dialog>
        </Stack>
    );
}
