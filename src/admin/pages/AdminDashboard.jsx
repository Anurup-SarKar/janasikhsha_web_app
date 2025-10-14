import React from 'react';
import { Grid, Card, CardContent, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress, Alert, Stack, Button } from '@mui/material';
import { fetchUsers } from '../api/users';
import { fetchAdminPayments } from '../api/razorpay';

export default function AdminDashboard() {
    const [users, setUsers] = React.useState([]);
    const [monthlyDonations, setMonthlyDonations] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState('');
    const [showAllMonths, setShowAllMonths] = React.useState(false);

    const formatINR = (n) => Number(n || 0).toLocaleString('en-IN');

    const loadData = async () => {
        setLoading(true); setError('');
        try {
            // Fetch users
            const u = await fetchUsers().catch(() => []);
            setUsers(Array.isArray(u) ? u : []);

            // Fetch payments for last 12 months and aggregate by month
            const now = new Date();
            const fromDt = new Date(now);
            fromDt.setMonth(fromDt.getMonth() - 11); // include current month + 11 previous
            const dateFrom = fromDt.toISOString().slice(0, 10);
            const dateTo = now.toISOString().slice(0, 10);

            const res = await fetchAdminPayments({ dateFrom, dateTo, count: 200, skip: 0 });
            const data = res?.data || {};
            const items = Array.isArray(data?.items) ? data.items : [];

            // Aggregate to monthly totals (sum rupees for non-failed payments)
            const buckets = new Map(); // key: YYYY-MM, value total rupees
            for (const p of items) {
                if (!p) continue;
                const status = String(p.status || '').toLowerCase();
                if (status === 'failed') continue;
                const rupees = Math.round(((p.amount || 0) / 100));
                const d = p.created_at ? new Date(p.created_at * 1000) : new Date();
                const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
                buckets.set(key, (buckets.get(key) || 0) + rupees);
            }

            // Build last 12 months array, ensuring order and zeroes where missing
            const months = [];
            const seed = new Date(fromDt);
            for (let i = 0; i < 12; i++) {
                const y = seed.getFullYear();
                const m = seed.getMonth() + 1;
                const key = `${y}-${String(m).padStart(2, '0')}`;
                months.push({ month: key, total: buckets.get(key) || 0 });
                seed.setMonth(seed.getMonth() + 1);
            }
            setMonthlyDonations(months);
        } catch (e) {
            setError(e?.message || 'Failed to load dashboard data');
            setMonthlyDonations([]);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => { loadData(); }, []);

    const totalThisMonth = monthlyDonations[monthlyDonations.length - 1]?.total ?? 0;
    const totalPrevMonth = monthlyDonations[monthlyDonations.length - 2]?.total ?? 0;
    const ytd = monthlyDonations.reduce((s, m) => s + m.total, 0);

    // Quarter helpers (FY Apr-Mar)
    const getFYStartYear = (d) => (d.getMonth() + 1 >= 4 ? d.getFullYear() : d.getFullYear() - 1);
    const getQuarterIndex = (d) => {
        const m = d.getMonth() + 1; // 1-12
        if (m >= 4 && m <= 6) return 1; // Q1 Apr-Jun
        if (m >= 7 && m <= 9) return 2; // Q2 Jul-Sep
        if (m >= 10 && m <= 12) return 3; // Q3 Oct-Dec
        return 4; // Q4 Jan-Mar
    };
    const fyLabel = (startYear) => `${startYear}-${String((startYear + 1) % 100).padStart(2, '0')}`;

    const buildQuarterKeys = (fyStartYear, qIdx) => {
        // Return array of 3 YYYY-MM keys for that FY quarter
        if (qIdx === 1) return [
            `${fyStartYear}-04`, `${fyStartYear}-05`, `${fyStartYear}-06`
        ];
        if (qIdx === 2) return [
            `${fyStartYear}-07`, `${fyStartYear}-08`, `${fyStartYear}-09`
        ];
        if (qIdx === 3) return [
            `${fyStartYear}-10`, `${fyStartYear}-11`, `${fyStartYear}-12`
        ];
        // Q4
        const next = fyStartYear + 1;
        return [`${next}-01`, `${next}-02`, `${next}-03`];
    };

    const mdMap = new Map(monthlyDonations.map(m => [m.month, m.total]));
    const today = new Date();
    const currFYStart = getFYStartYear(today);
    const currQ = getQuarterIndex(today);
    const prevFYStart = currFYStart - 1;

    const currQKeys = buildQuarterKeys(currFYStart, currQ);
    const prevQKeys = buildQuarterKeys(prevFYStart, currQ);

    const currQTotal = currQKeys.reduce((s, k) => s + (mdMap.get(k) || 0), 0);
    const prevQTotal = prevQKeys.reduce((s, k) => s + (mdMap.get(k) || 0), 0);

    const monthsToShow = showAllMonths
        ? monthlyDonations
        : monthlyDonations.slice(-3);

    return (
        <Grid container spacing={2}>
            {error && (
                <Grid item xs={12}>
                    <Alert severity="error">{error}</Alert>
                </Grid>
            )}

            <Grid item xs={12} md={4}>
                <Card elevation={2} sx={{ borderRadius: 3 }}>
                    <CardContent>
                        <Typography variant="overline" color="text.secondary">Total This Month</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 800, mt: 1 }}>₹{formatINR(totalThisMonth)}</Typography>
                        <Typography variant="body2" color={totalThisMonth >= totalPrevMonth ? 'success.main' : 'error.main'} sx={{ mt: 1 }}>
                            vs last month: ₹{formatINR(totalPrevMonth)}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card elevation={2} sx={{ borderRadius: 3 }}>
                    <CardContent>
                        <Typography variant="overline" color="text.secondary">Year to Date</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 800, mt: 1 }}>₹{formatINR(ytd)}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>FY Summary</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card elevation={2} sx={{ borderRadius: 3 }}>
                    <CardContent>
                        <Typography variant="overline" color="text.secondary">Active Users</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 800, mt: 1 }}>{users.filter(u => u.isActive).length}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Admins: {users.filter(u => u.isAdmin).length}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            {/* Quarter comparison */}
            <Grid item xs={12}>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            {fyLabel(currFYStart)} Q{currQ} vs {fyLabel(prevFYStart)} Q{currQ}
                        </Typography>
                    </Stack>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12} sm={6}>
                            <Card variant="outlined" sx={{ borderRadius: 3 }}>
                                <CardContent>
                                    <Typography variant="overline" color="text.secondary">{fyLabel(currFYStart)} Q{currQ}</Typography>
                                    <Typography variant="h5" sx={{ fontWeight: 800, mt: 0.5 }}>₹{formatINR(currQTotal)}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Card variant="outlined" sx={{ borderRadius: 3 }}>
                                <CardContent>
                                    <Typography variant="overline" color="text.secondary">{fyLabel(prevFYStart)} Q{currQ}</Typography>
                                    <Typography variant="h5" sx={{ fontWeight: 800, mt: 0.5 }}>₹{formatINR(prevQTotal)}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>

            {/* Monthly Donations */}
            <Grid item xs={12}>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 800 }}>Monthly Donations</Typography>
                        <Button size="small" variant="text" onClick={() => setShowAllMonths(v => !v)}>
                            {showAllMonths ? 'Collapse to last 3 months' : 'Show last 12 months'}
                        </Button>
                    </Stack>
                    {loading ? (
                        <CircularProgress size={24} />
                    ) : (
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Month</TableCell>
                                    <TableCell align="right">Total (₹)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {monthsToShow.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={2} align="center">No data found.</TableCell>
                                    </TableRow>
                                ) : (
                                    monthsToShow.map((m) => (
                                        <TableRow key={m.month}>
                                            <TableCell>{m.month}</TableCell>
                                            <TableCell align="right">₹{Number(m.total || 0).toLocaleString('en-IN')}</TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    )}
                </Paper>
            </Grid>
        </Grid>
    );
}
