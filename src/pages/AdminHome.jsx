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

// Mock data for UI
const initialUsers = [
    {
        id: 11,
        username: 'testuser123',
        email: 'test@example.com',
        mobile: '1234567890',
        fullName: 'Test User',
        cctvLink: null,
        isCctvVisible: false,
        isCctvStorageVisible: false,
        isAdmin: false,
        isActive: true,
    },
    {
        id: 12,
        username: 'anita',
        email: 'anita@example.com',
        mobile: '9876543210',
        fullName: 'Anita Bose',
        cctvLink: 'https://example.com/cctv/anita',
        isCctvVisible: true,
        isCctvStorageVisible: true,
        isAdmin: true,
        isActive: true,
    },
];

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

    // Users state
    const [users, setUsers] = React.useState(initialUsers);
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
                            <AdminUsers users={users} setUsers={setUsers} />
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
