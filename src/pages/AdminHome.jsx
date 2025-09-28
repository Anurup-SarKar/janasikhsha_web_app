// AdminHome.jsx
// Standalone Admin Panel accessible directly at /admin_home
// UI-only: beautiful MUI layout using the existing theme and font. No links/buttons added to the public site.

import React from 'react';
import { Box, Container, Paper, Tabs, Tab, Divider } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { AdminLayout } from '../admin';
import AdminDashboard from '../admin/pages/AdminDashboard';
import AdminUsers from '../admin/pages/AdminUsers';
import AdminTransactions from '../admin/pages/AdminTransactions';
import useUsers from '../admin/hooks/useUsers';

// Custom styled Tabs and Tab for improved UI and to remove side lines
const StyledTabs = styled((props) => (
    <Tabs
        {...props}
        TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
))(({ theme }) => ({
    boxShadow: 'none',
    '& .MuiTabs-scroller': {
        overflow: 'hidden', // hide scroll area edges and buttons
    },
    '&:before, &:after': {
        display: 'none',
    },
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        height: 0,
    },
    '& .MuiTabs-indicatorSpan': {
        maxWidth: 56,
        width: '100%',
        backgroundColor: theme.palette.primary.main,
        height: 3,
        borderRadius: 3,
        transition: 'all .25s ease',
    },
}));

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
    textTransform: 'none',
    fontWeight: 700,
    minHeight: 48,
    color: theme.palette.text.secondary,
    transition: 'background-color .2s ease, color .2s ease, box-shadow .2s ease, transform .2s ease',
    outline: 'none',
    border: 'none',
    borderRadius: 8,
    position: 'relative',
    '&.Mui-selected': {
        color: theme.palette.primary.main,
        backgroundColor: alpha(theme.palette.primary.main, 0.12),
        boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.25)}`,
    },
    '&.Mui-selected:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.18),
        boxShadow: `0 3px 12px ${alpha(theme.palette.primary.main, 0.28)}`,
    },
    '&:hover': {
        // subtle hover without layout shift
        backgroundColor: theme.palette.action.hover,
        color: theme.palette.text.primary,
    },
    '&:focus': { outline: 'none' },
}));

function a11yProps(index) {
    return { id: `admin-tab-${index}`, 'aria-controls': `admin-tabpanel-${index}` };
}

function TabPanel({ children, value, index }) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`admin-tabpanel-${index}`} aria-labelledby={`admin-tab-${index}`} style={{ height: '100%' }}>
            {value === index && children}
        </div>
    );
}

const monthlyDonations = [
    { month: 'Jan', total: 42000 },
    { month: 'Feb', total: 51000 },
    { month: 'Mar', total: 46800 },
    { month: 'Apr', total: 59000 },
    { month: 'May', total: 61000 },
    { month: 'Jun', total: 55250 },
];

const initialTx = [
    { id: 'TXN-1001', date: '2025-09-06', particular: 'Donation', amount: 2500, method: 'UPI', status: 'Success' },
    { id: 'TXN-1000', date: '2025-09-05', particular: 'Donation', amount: 1200, method: 'Card', status: 'Success' },
    { id: 'TXN-0999', date: '2025-08-30', particular: 'Donation', amount: 5000, method: 'NetBanking', status: 'Success' },
    { id: 'TXN-0998', date: '2025-08-15', particular: 'Donation', amount: 750, method: 'Cash', status: 'Pending' },
];

export default function AdminHome() {
    const [tab, setTab] = React.useState(0);

    // Users state via hook (no static data)
    const {
        users,
        setUsers,
        loading: usersLoading,
        actionLoading: userActionLoading,
        deleteByEmail,
        createUser,
        updateUser,
        validateOnChange,
        getTextFieldProps,
        getMobileInputGuardProps,
        fieldErrors,
        clearFieldErrors,
        // expose error to UI
        error: apiError,
        clearError: clearApiError,
    } = useUsers();
    // Transactions state
    const [tx] = React.useState(initialTx);

    return (
        <AdminLayout>
            <Container maxWidth="lg" sx={{ mt: 3 }}>
                <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                    <Box sx={{ px: 2, pt: 1, bgcolor: (t) => t.palette.background.paper }}>
                        <StyledTabs
                            value={tab}
                            onChange={(_, v) => setTab(v)}
                            aria-label="Admin Tabs"
                            variant="scrollable"
                            scrollButtons={false}
                            allowScrollButtonsMobile={false}
                        >
                            <StyledTab icon={<DashboardIcon />} iconPosition="start" label="Dashboard" {...a11yProps(0)} />
                            <StyledTab icon={<PeopleIcon />} iconPosition="start" label="User Data" {...a11yProps(1)} />
                            <StyledTab icon={<ReceiptLongIcon />} iconPosition="start" label="Transactions" {...a11yProps(2)} />
                        </StyledTabs>
                    </Box>

                    <Divider />

                    <Box sx={{ p: 3 }}>
                        <TabPanel value={tab} index={0}>
                            <AdminDashboard users={users} monthlyDonations={monthlyDonations} />
                        </TabPanel>

                        <TabPanel value={tab} index={1}>
                            <AdminUsers
                                users={users}
                                setUsers={setUsers}
                                loading={usersLoading}
                                actionLoading={userActionLoading}
                                deleteByEmail={deleteByEmail}
                                createUser={createUser}
                                updateUser={updateUser}
                                // pass validation + input guard helpers to the Add dialog
                                validateOnChange={validateOnChange}
                                getTextFieldProps={getTextFieldProps}
                                getMobileInputGuardProps={getMobileInputGuardProps}
                                fieldErrors={fieldErrors}
                                clearFieldErrors={clearFieldErrors}
                                apiError={apiError}
                                clearApiError={clearApiError}
                            />
                        </TabPanel>

                        <TabPanel value={tab} index={2}>
                            <AdminTransactions transactions={tx} />
                        </TabPanel>
                    </Box>
                </Paper>
            </Container>
        </AdminLayout>
    );
}
