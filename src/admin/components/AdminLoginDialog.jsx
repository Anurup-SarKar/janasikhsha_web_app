// AdminLoginDialog.jsx
// Admin authentication dialog before accessing admin dashboard
// Implements two-step authentication: email/password -> OTP validation

import React from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Box, Typography, Divider, TextField, Button, Stack, Alert, FormControl, FormLabel, Link, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import { alpha } from '@mui/material/styles';
import { adminLogin, validateOtp } from '../api/auth';
import { setAuthToken } from '../api/client';

export default function AdminLoginDialog({ open, onClose, onLogin }) {
    // Track authentication phases: 'login', 'otp', 'forgot'
    const [phase, setPhase] = React.useState('login');
    const [resetKey, setResetKey] = React.useState(0);

    // Form state
    const [credentials, setCredentials] = React.useState({ email: '', password: '' });
    const [otp, setOtp] = React.useState('');
    const [forgotEmail, setForgotEmail] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [otpData, setOtpData] = React.useState(null); // Store OTP response data

    // Reset form when dialog opens
    React.useEffect(() => {
        if (open) {
            setPhase('login');
            setCredentials({ email: '', password: '' });
            setOtp('');
            setForgotEmail('');
            setError('');
            setOtpData(null);
            setResetKey((k) => k + 1);
        }
    }, [open]);

    const handleShowForgot = () => {
        setPhase('forgot');
        setError('');
    };

    const handleShowLogin = () => {
        setPhase('login');
        setError('');
    };

    const handleCancelOtp = () => {
        setPhase('login');
        setOtp('');
        setOtpData(null);
        setError('');
    };

    const handleClose = () => {
        setPhase('login');
        setCredentials({ email: '', password: '' });
        setOtp('');
        setForgotEmail('');
        setOtpData(null);
        setError('');
        onClose?.();
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await adminLogin(credentials.email, credentials.password);

            if (response.statusCode === 200 && response.data?.otp) {
                setOtpData(response.data);
                setPhase('otp');
                setError('');
            } else {
                setError(response.statusMessage || 'Login failed. Please try again.');
            }
        } catch (err) {
            const errorMsg = err.message || 'Login failed. Please check your credentials.';
            // Extract statusMessage from API error if available
            try {
                const match = errorMsg.match(/\{.*"statusMessage"\s*:\s*"([^"]+)"/);
                if (match) {
                    setError(match[1]);
                } else {
                    setError(errorMsg);
                }
            } catch {
                setError(errorMsg);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await validateOtp(credentials.email, credentials.password, otp);

            if (response.statusCode === 200 && response.data?.token) {
                // Check if user has admin permissions
                const user = response.data.user;
                const isAdmin = user?.isAdmin === true || user?.isAdmin === 'true';

                console.log('[Auth] User permissions check:', {
                    email: user?.email,
                    isAdmin: user?.isAdmin,
                    hasAdminAccess: isAdmin
                });

                if (!isAdmin) {
                    // User does not have admin access
                    console.log('[Auth] Access denied - user is not admin');
                    setError('Access Denied: You do not have administrator privileges to access this panel. Please contact your system administrator.');

                    // Don't store the token since user doesn't have admin access
                    // Reset form to allow login with different credentials
                    setPhase('login');
                    setCredentials({ email: '', password: '' });
                    setOtp('');
                    setOtpData(null);
                    return;
                }

                // Store the auth token (only for admin users)
                const token = response.data.token;
                console.log('[Auth] Admin login successful - storing token:', token.substring(0, 20) + '...');
                setAuthToken(token);

                // Verify token was stored correctly
                const { verifyAuthSetup } = await import('../api/client');
                const verification = verifyAuthSetup();
                console.log('[Auth] Token verification:', verification);

                onLogin?.(response.data.user);
                // Don't call handleClose() - just reset form state without triggering onClose
                setPhase('login');
                setCredentials({ email: '', password: '' });
                setOtp('');
                setOtpData(null);
                setError('');
            } else {
                setError(response.statusMessage || 'Invalid OTP. Please try again.');
            }
        } catch (err) {
            const errorMsg = err.message || 'OTP validation failed. Please try again.';
            // Extract statusMessage from API error if available
            try {
                const match = errorMsg.match(/\{.*"statusMessage"\s*:\s*"([^"]+)"/);
                if (match) {
                    setError(match[1]);
                } else {
                    setError(errorMsg);
                }
            } catch {
                setError(errorMsg);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setError('Password reset instructions sent to your email.');
            // Auto switch back to login after 2 seconds
            setTimeout(() => {
                handleShowLogin();
            }, 2000);
        } catch (err) {
            setError('Failed to send reset email. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Dialog header text and subtitle based on phase
    const getHeaderInfo = () => {
        switch (phase) {
            case 'otp':
                return {
                    text: 'Enter OTP Code',
                    subtitle: `OTP sent to ${credentials.email}. Expires in ${otpData?.expiresInSeconds || 300} seconds.`,
                    icon: <SecurityRoundedIcon />
                };
            case 'forgot':
                return {
                    text: 'Reset Admin Password',
                    subtitle: 'Enter your admin email to reset password',
                    icon: <LockRoundedIcon />
                };
            default:
                return {
                    text: 'Enter Admin Credentials',
                    subtitle: 'Access the admin dashboard',
                    icon: <AdminPanelSettingsRoundedIcon />
                };
        }
    };

    const headerInfo = getHeaderInfo();

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="xs"
            fullWidth
            slotProps={{
                backdrop: {
                    sx: {
                        backdropFilter: 'saturate(160%) blur(6px)',
                        backgroundColor: 'rgba(0,0,0,0.35)'
                    }
                }
            }}
            PaperProps={{
                elevation: 8,
                sx: {
                    borderRadius: 4,
                    overflow: 'hidden',
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                }
            }}
        >
            <Box sx={{ position: 'relative', p: 2.5, bgcolor: 'primary.main' }}>
                <DialogTitle sx={{ p: 0, m: 0, color: 'primary.contrastText' }}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                        {headerInfo.icon}
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 800, lineHeight: 1.2, color: 'inherit' }}>
                                {headerInfo.text}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 0.5, color: 'inherit', opacity: 0.9 }}>
                                {headerInfo.subtitle}
                            </Typography>
                        </Box>
                    </Stack>
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.primary.main,
                        bgcolor: alpha('#FFFFFF', 0.9),
                        border: (theme) => `1px solid ${alpha(theme.palette.common.black, 0.12)}`,
                        '&:hover': { bgcolor: alpha('#FFFFFF', 1) }
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider />
            <DialogContent sx={{ p: 3 }}>
                {error && (
                    <Alert
                        severity={error.includes('sent') ? 'success' : 'error'}
                        sx={{ mb: 2 }}
                        onClose={() => setError('')}
                    >
                        {error}
                    </Alert>
                )}

                {phase === 'login' && (
                    // Login Form
                    <Box component="form" onSubmit={handleLogin}>
                        <Stack spacing={2.5}>
                            <TextField
                                label="Admin Email"
                                type="email"
                                value={credentials.email}
                                onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                                fullWidth
                                required
                                autoComplete="email"
                                autoFocus
                                disabled={loading}
                            />
                            <TextField
                                label="Admin Password"
                                type="password"
                                value={credentials.password}
                                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                                fullWidth
                                required
                                autoComplete="current-password"
                                disabled={loading}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                fullWidth
                                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LockRoundedIcon />}
                                disabled={loading || !credentials.email || !credentials.password}
                                sx={{ mt: 1, fontWeight: 700 }}
                            >
                                {loading ? 'Sending OTP...' : 'Send OTP'}
                            </Button>

                            <Box sx={{ textAlign: 'center', mt: 1 }}>
                                <Link
                                    component="button"
                                    type="button"
                                    variant="body2"
                                    onClick={handleShowForgot}
                                    disabled={loading}
                                    sx={{ textDecoration: 'none', fontWeight: 600 }}
                                >
                                    Forgot your admin password?
                                </Link>
                            </Box>
                        </Stack>
                    </Box>
                )}

                {phase === 'otp' && (
                    // OTP Form
                    <Box component="form" onSubmit={handleOtpSubmit}>
                        <Stack spacing={2.5}>
                            {/* Show disabled email and password fields */}
                            <TextField
                                label="Admin Email"
                                value={credentials.email}
                                fullWidth
                                disabled
                                variant="filled"
                            />
                            <TextField
                                label="Admin Password"
                                type="password"
                                value="••••••••••••"
                                fullWidth
                                disabled
                                variant="filled"
                            />

                            {/* Testing Purpose: Show OTP from API response */}
                            {otpData?.otp && (
                                <Alert
                                    severity="info"
                                    sx={{
                                        bgcolor: 'info.light',
                                        color: 'info.contrastText',
                                        fontWeight: 600,
                                        '& .MuiAlert-message': {
                                            fontSize: '1rem',
                                            textAlign: 'center',
                                            width: '100%'
                                        }
                                    }}
                                >
                                    <Typography variant="body2" sx={{ mb: 0.5, opacity: 0.8 }}>
                                        Testing Mode - OTP Code:
                                    </Typography>
                                    <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '0.3rem' }}>
                                        {otpData.otp}
                                    </Typography>
                                    <Typography variant="caption" sx={{ opacity: 0.7, mt: 0.5, display: 'block' }}>
                                        (Remove this after email server setup)
                                    </Typography>
                                </Alert>
                            )}

                            <Stack direction="row" spacing={1} alignItems="flex-end">
                                <TextField
                                    label="Enter OTP Code"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    fullWidth
                                    required
                                    autoFocus
                                    disabled={loading}
                                    placeholder="6-digit OTP"
                                    inputProps={{
                                        maxLength: 6,
                                        style: { textAlign: 'center', fontSize: '1.2rem', letterSpacing: '0.5rem' }
                                    }}
                                />
                                {/* Testing Purpose: Quick fill button */}
                                {otpData?.otp && (
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => setOtp(otpData.otp)}
                                        disabled={loading}
                                        sx={{
                                            minWidth: 'auto',
                                            px: 1.5,
                                            mb: 0.5,
                                            fontSize: '0.75rem'
                                        }}
                                    >
                                        Fill
                                    </Button>
                                )}
                            </Stack>

                            <Stack direction="row" spacing={2}>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    fullWidth
                                    onClick={handleCancelOtp}
                                    disabled={loading}
                                    sx={{ fontWeight: 700 }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SecurityRoundedIcon />}
                                    disabled={loading || otp.length !== 6}
                                    sx={{ fontWeight: 700 }}
                                >
                                    {loading ? 'Verifying...' : 'Verify OTP'}
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                )}

                {phase === 'forgot' && (
                    // Forgot Password Form
                    <Box component="form" onSubmit={handleForgotPassword}>
                        <Stack spacing={2.5}>
                            <TextField
                                label="Admin Email Address"
                                type="email"
                                value={forgotEmail}
                                onChange={(e) => setForgotEmail(e.target.value)}
                                fullWidth
                                required
                                autoComplete="email"
                                autoFocus
                                disabled={loading}
                                helperText="Enter the email associated with your admin account"
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                fullWidth
                                disabled={loading || !forgotEmail}
                                sx={{ mt: 1, fontWeight: 700 }}
                            >
                                {loading ? 'Sending...' : 'Send Reset Instructions'}
                            </Button>

                            <Box sx={{ textAlign: 'center', mt: 1 }}>
                                <Link
                                    component="button"
                                    type="button"
                                    variant="body2"
                                    onClick={handleShowLogin}
                                    disabled={loading}
                                    sx={{ textDecoration: 'none', fontWeight: 600 }}
                                >
                                    ← Back to Admin Login
                                </Link>
                            </Box>
                        </Stack>
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    );
}
