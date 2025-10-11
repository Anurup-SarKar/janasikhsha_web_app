import React from 'react';
import { Paper, Stack, Typography, Button, TextField, Table, TableHead, TableRow, TableCell, TableBody, Chip, TableContainer, Box, Card, CardContent, Divider, IconButton, Tooltip } from '@mui/material';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import PaymentRoundedIcon from '@mui/icons-material/PaymentRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';

export default function AdminTransactions({ transactions }) {
    const [dateFrom, setDateFrom] = React.useState('');
    const [dateTo, setDateTo] = React.useState('');
    const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false);

    const closeFiltersIfMobile = () => {
        // Safe to call always; on desktop the container stays visible regardless of this state
        setMobileFiltersOpen(false);
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

    const resetFilters = () => {
        setDateFrom('');
        setDateTo('');
        closeFiltersIfMobile();
    };

    const applyFilters = () => {
        // Filtering is reactive; this simply closes the panel on mobile to show results
        closeFiltersIfMobile();
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

    const filteredTx = transactions.filter(t => {
        if (!dateFrom || !dateTo) return true;
        return t.date >= dateFrom && t.date <= dateTo;
    });

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
                </Stack>
                {/* Mobile actions */}
                <Stack direction="row" spacing={1} sx={{ mt: 2, display: { xs: 'flex', sm: 'none' } }}>
                    <Button size="small" variant="contained" onClick={applyFilters}>Apply</Button>
                    <Button size="small" variant="text" onClick={resetFilters}>Reset</Button>
                </Stack>
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
                                {filteredTx.map((t) => (
                                    <TableRow key={t.id} hover>
                                        <TableCell>{t.date}</TableCell>
                                        <TableCell>{t.id}</TableCell>
                                        <TableCell>{t.particular}</TableCell>
                                        <TableCell align="right">{t.amount.toLocaleString()}</TableCell>
                                        <TableCell>{t.method}</TableCell>
                                        <TableCell>
                                            {statusChip(t.status)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>

            {/* Mobile card list */}
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <Stack spacing={1.5}>
                    {filteredTx.map((t) => (
                        <Card key={t.id} variant="outlined" sx={{ borderRadius: 3, position: 'relative', overflow: 'hidden' }}>
                            {/* Status accent bar */}
                            <Box sx={(theme) => ({ position: 'absolute', top: 0, left: 0, right: 0, height: 4, bgcolor: statusColor(t.status, theme) })} />
                            <CardContent sx={{ pt: 1.25 }}>
                                <Stack spacing={1}>
                                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                                        <Typography variant="h6" sx={{ fontWeight: 800 }}>₹ {t.amount.toLocaleString()}</Typography>
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
                    {filteredTx.length === 0 && (
                        <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', borderRadius: 3 }}>
                            No transactions for selected range.
                        </Paper>
                    )}
                </Stack>
            </Box>
        </Stack>
    );
}
