import React from 'react';
import { Grid, Card, CardContent, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

export default function AdminDashboard({ users, monthlyDonations }) {
    const totalThisMonth = monthlyDonations[monthlyDonations.length - 1]?.total ?? 0;
    const totalPrevMonth = monthlyDonations[monthlyDonations.length - 2]?.total ?? 0;
    const ytd = monthlyDonations.reduce((s, m) => s + m.total, 0);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <Card elevation={2} sx={{ borderRadius: 3 }}>
                    <CardContent>
                        <Typography variant="overline" color="text.secondary">Total This Month</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 800, mt: 1 }}>₹{totalThisMonth.toLocaleString()}</Typography>
                        <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>vs last month: ₹{totalPrevMonth.toLocaleString()}</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card elevation={2} sx={{ borderRadius: 3 }}>
                    <CardContent>
                        <Typography variant="overline" color="text.secondary">Year to Date</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 800, mt: 1 }}>₹{ytd.toLocaleString()}</Typography>
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

            <Grid item xs={12}>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Monthly Donations</Typography>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Month</TableCell>
                                <TableCell align="right">Total (₹)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {monthlyDonations.map((m) => (
                                <TableRow key={m.month}>
                                    <TableCell>{m.month}</TableCell>
                                    <TableCell align="right">{m.total.toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
        </Grid>
    );
}
