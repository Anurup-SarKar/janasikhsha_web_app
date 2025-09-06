import React from 'react';
import { Paper, Stack, Typography, Button, TextField, Table, TableHead, TableRow, TableCell, TableBody, Chip } from '@mui/material';

export default function AdminTransactions({ transactions }) {
    const [dateFrom, setDateFrom] = React.useState('');
    const [dateTo, setDateTo] = React.useState('');

    const setRelativeRange = (days) => {
        const to = new Date();
        const from = new Date();
        from.setDate(to.getDate() - (days - 1));
        setDateFrom(from.toISOString().slice(0, 10));
        setDateTo(to.toISOString().slice(0, 10));
    };
    const setParticularDate = (daysOffset = 0) => {
        const d = new Date();
        d.setDate(d.getDate() + daysOffset);
        const iso = d.toISOString().slice(0, 10);
        setDateFrom(iso); setDateTo(iso);
    };
    const setLastFinancialYear = () => {
        const today = new Date();
        const year = today.getMonth() >= 3 ? today.getFullYear() : today.getFullYear() - 1;
        const from = new Date(year, 3, 1);
        const to = new Date(year + 1, 2, 31);
        setDateFrom(from.toISOString().slice(0, 10));
        setDateTo(to.toISOString().slice(0, 10));
    };

    const filteredTx = transactions.filter(t => {
        if (!dateFrom || !dateTo) return true;
        return t.date >= dateFrom && t.date <= dateTo;
    });

    return (
        <Stack spacing={2}>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>Filters</Typography>
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
            </Paper>

            <Paper variant="outlined" sx={{ borderRadius: 3 }}>
                <Table>
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
                                    {t.status === 'Success' ? <Chip label="Success" color="success" size="small" /> :
                                        t.status === 'Pending' ? <Chip label="Pending" color="warning" size="small" /> :
                                            <Chip label={t.status} size="small" />}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Stack>
    );
}
