// AdminHome.jsx
// Standalone Admin Panel accessible directly at /admin_home
// UI-only: beautiful MUI layout using the existing theme and font. No links/buttons added to the public site.

import React from 'react';
import { Box, Container, Paper, Tabs, Tab, Divider, IconButton, Menu, MenuItem, Typography, useMediaQuery } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import MenuIcon from '@mui/icons-material/Menu';
import AdminLayout from '../admin/layout/AdminLayout';
import AdminDashboard from '../admin/pages/AdminDashboard';
import AdminUsers from '../admin/pages/AdminUsers';
import AdminTransactions from '../admin/pages/AdminTransactions';
import AdminLoginDialog from '../admin/components/AdminLoginDialog';
import useUsers from '../admin/hooks/useUsers';
import { clearAuthToken } from '../admin/api/client';

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

function AuthenticatedAdminHome() {
    const [tab, setTab] = React.useState(0);
    const isMobile = useMediaQuery((t) => t.breakpoints.down('sm'));
    const [menuAnchor, setMenuAnchor] = React.useState(null);
    const tabLabels = ['Dashboard', 'User Data', 'Transactions'];

    // Users state via hook (only when authenticated)
    const {
        users,
        setUsers,
        loading: usersLoading,
        actionLoading: userActionLoading,
        reload: reloadUsers,
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

    // Handle admin logout
    const handleAdminLogout = () => {
        clearAuthToken();
        // Reload the page to show login dialog
        window.location.reload();
    };

    return (
        <AdminLayout onLogout={handleAdminLogout}>
            <Container maxWidth="lg" sx={{ mt: 3 }}>
                <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                    <Box sx={{ px: 2, pt: 1, bgcolor: (t) => t.palette.background.paper }}>
                        {isMobile ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <IconButton color="primary" onClick={(e) => setMenuAnchor(e.currentTarget)} aria-label="Open sections">
                                    <MenuIcon />
                                </IconButton>
                                <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                                    {tabLabels[tab]}
                                </Typography>
                                {/* spacer to balance layout */}
                                <Box sx={{ width: 40 }} />
                                <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)}>
                                    {tabLabels.map((label, idx) => (
                                        <MenuItem
                                            key={label}
                                            selected={idx === tab}
                                            onClick={() => { setTab(idx); setMenuAnchor(null); }}
                                        >
                                            {label}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        ) : (
                            <StyledTabs
                                value={tab}
                                onChange={(_, v) => setTab(v)}
                                aria-label="Admin Tabs"
                                variant="scrollable"
                                scrollButtons
                                allowScrollButtonsMobile
                            >
                                <StyledTab icon={<DashboardIcon />} iconPosition="start" label="Dashboard" {...a11yProps(0)} />
                                <StyledTab icon={<PeopleIcon />} iconPosition="start" label="User Data" {...a11yProps(1)} />
                                <StyledTab icon={<ReceiptLongIcon />} iconPosition="start" label="Transactions" {...a11yProps(2)} />
                            </StyledTabs>
                        )}
                    </Box>

                    <Divider />

                    <Box sx={{ p: { xs: 2, md: 3 } }}>
                        <TabPanel value={tab} index={0}>
                            <AdminDashboard users={users} monthlyDonations={monthlyDonations} />
                        </TabPanel>

                        <TabPanel value={tab} index={1}>
                            <AdminUsers
                                users={users}
                                setUsers={setUsers}
                                loading={usersLoading}
                                actionLoading={userActionLoading}
                                reloadUsers={reloadUsers}
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

export default function AdminHome() {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    // Handle admin login
    const handleAdminLogin = (userData) => {
        setIsAuthenticated(true);
        // You can store user data if needed
        console.log('Admin logged in:', userData);
    };

    // Check for existing auth token on component mount and verify admin permissions
    React.useEffect(() => {
        const token = localStorage.getItem('admin_auth_token');
        if (token) {
            // Verify the token contains admin permissions
            try {
                // Decode JWT token to check permissions
                const parts = token.split('.');
                if (parts.length === 3) {
                    const payload = parts[1];
                    const paddedPayload = payload + '='.repeat((4 - payload.length % 4) % 4);
                    const decodedPayload = atob(paddedPayload.replace(/-/g, '+').replace(/_/g, '/'));
                    const tokenData = JSON.parse(decodedPayload);

                    const isAdmin = tokenData.isAdmin === 'true' || tokenData.isAdmin === true;
                    const isExpired = tokenData.exp && tokenData.exp < Math.floor(Date.now() / 1000);

                    console.log('[Auth] Token validation:', {
                        email: tokenData.email,
                        isAdmin,
                        isExpired,
                        expiresAt: tokenData.exp ? new Date(tokenData.exp * 1000).toLocaleString() : 'unknown'
                    });

                    if (isExpired) {
                        console.log('[Auth] Token expired - clearing and requiring re-login');
                        localStorage.removeItem('admin_auth_token');
                        return;
                    }

                    if (!isAdmin) {
                        console.log('[Auth] Token does not have admin permissions - clearing and requiring re-login');
                        localStorage.removeItem('admin_auth_token');
                        return;
                    }

                    // Token is valid and user is admin
                    import('../admin/api/client').then(({ setAuthToken }) => {
                        setAuthToken(token);
                        setIsAuthenticated(true);
                        console.log('[Auth] Restored admin session from localStorage');
                    });
                } else {
                    console.log('[Auth] Invalid token format - clearing');
                    localStorage.removeItem('admin_auth_token');
                }
            } catch (error) {
                console.error('[Auth] Token validation failed:', error);
                localStorage.removeItem('admin_auth_token');
            }
        }
    }, []);

    // Show login dialog if not authenticated
    if (!isAuthenticated) {
        return (
            <AdminLoginDialog
                open={true}
                onLogin={handleAdminLogin}
                onClose={() => {
                    // Redirect back to home or show error - for now just reload
                    window.location.href = '/';
                }}
            />
        );
    }

    // Show authenticated admin dashboard
    return <AuthenticatedAdminHome />;
}
