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
import { adminLogin, validateOtp, requestPasswordReset, performPasswordReset } from '../api/auth';
import { setAuthToken } from '../api/client';

export default function AdminLoginDialog({ open, onClose, onLogin }) {
    // Track authentication phases: 'login', 'otp', 'forgot', 'reset'
    const [phase, setPhase] = React.useState('login');
    const [resetKey, setResetKey] = React.useState(0);

    // Form state
    const [credentials, setCredentials] = React.useState({ email: '', password: '' });
    const [otp, setOtp] = React.useState('');
    const [forgotEmail, setForgotEmail] = React.useState('');
    const [resetToken, setResetToken] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [otpData, setOtpData] = React.useState(null); // Store OTP response data
    const [resetExpiresIn, setResetExpiresIn] = React.useState(null);

    // Reset form when dialog opens
    React.useEffect(() => {
        if (open) {
            setPhase('login');
            setCredentials({ email: '', password: '' });
            setOtp('');
            setForgotEmail('');
            setResetToken('');
            setNewPassword('');
            setConfirmPassword('');
            setError('');
            setOtpData(null);
            setResetExpiresIn(null);
            setResetKey((k) => k + 1);

            // If reset link was invalid/expired, bring user to Forgot with prefilled email and message
            try {
                const linkError = sessionStorage.getItem('admin_reset_link_error');
                const prefillEmail = sessionStorage.getItem('admin_reset_email');
                if (linkError) {
                    setPhase('forgot');
                    if (prefillEmail) setForgotEmail(prefillEmail);
                    setError(linkError);
                    sessionStorage.removeItem('admin_reset_link_error');
                    sessionStorage.removeItem('admin_reset_email');
                }
            } catch { }
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

    const handleShowReset = (prefillEmail = '') => {
        if (prefillEmail) setForgotEmail(prefillEmail);
        setPhase('reset');
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
        setResetToken('');
        setNewPassword('');
        setConfirmPassword('');
        setOtpData(null);
        setResetExpiresIn(null);
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
            const res = await requestPasswordReset(forgotEmail);
            if (res?.statusCode === 200) {
                // Persist token and expiry locally for later validation on the reset page
                try {
                    if (res.data?.resetToken) {
                        localStorage.setItem('admin_reset_token', res.data.resetToken);
                    }
                    if (res.data?.expiresInSeconds) {
                        const expiresAt = Date.now() + Number(res.data.expiresInSeconds) * 1000;
                        localStorage.setItem('admin_reset_expiresAt', String(expiresAt));
                    }
                    if (forgotEmail) {
                        localStorage.setItem('admin_reset_email', forgotEmail);
                    }
                } catch { }

                setError('Please check your email for the password reset link.');
                // Stay on forgot phase so user can read instructions or use the link below
                // setPhase('reset');
            } else {
                setError(res?.statusMessage || 'Failed to request password reset.');
            }
        } catch (err) {
            const msg = err.message || 'Failed to request password reset.';
            try {
                const match = msg.match(/\{.*"statusMessage"\s*:\s*"([^"]+)"/);
                setError(match ? match[1] : msg);
            } catch {
                setError(msg);
            }
        } finally {
            setLoading(false);
        }
    };

    const handlePerformReset = async (e) => {
        e.preventDefault();
        if (!forgotEmail) { setError('Please enter your email.'); return; }
        // Token is stored internally from the request API; if absent, guide user to use the email link
        if (!resetToken) { setError('Reset token not available. Please open the reset link sent to your email to continue.'); return; }
        if (!newPassword || newPassword.length < 8) { setError('Password must be at least 8 characters long.'); return; }
        if (newPassword !== confirmPassword) { setError('Passwords do not match.'); return; }
        setLoading(true);
        setError('');
        try {
            const res = await performPasswordReset(forgotEmail, resetToken, newPassword);
            if (res?.statusCode === 200) {
                setError(res.statusMessage || 'Password reset successful');
                // After success, return to login with email prefilled
                setCredentials({ email: forgotEmail, password: '' });
                setPhase('login');
                setResetToken('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                setError(res?.statusMessage || 'Password reset failed.');
            }
        } catch (err) {
            const msg = err.message || 'Password reset failed.';
            try {
                const match = msg.match(/\{.*"statusMessage"\s*:\s*"([^"]+)"/);
                setError(match ? match[1] : msg);
            } catch {
                setError(msg);
            }
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
                    subtitle: 'Enter your admin email to get a reset token',
                    icon: <LockRoundedIcon />
                };
            case 'reset':
                return {
                    text: 'Set New Password',
                    subtitle: resetExpiresIn ? `Token expires in ${resetExpiresIn} seconds` : 'Enter token and new password',
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
                        severity={/sent|success/i.test(error) ? 'success' : 'error'}
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
                    // Forgot Password Form (request token)
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

                            {resetToken && (
                                <Stack spacing={1} sx={{ mt: 1 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        You can also open the reset page directly:
                                    </Typography>
                                    <Link href={`/reset_password?token=${encodeURIComponent(resetToken)}`} underline="hover" sx={{ fontWeight: 700 }}>
                                        {`${window.location.origin}/reset_password?token=${resetToken}`}
                                    </Link>
                                    <Button
                                        type="button"
                                        variant="outlined"
                                        size="small"
                                        onClick={() => window.location.assign(`/reset_password?token=${encodeURIComponent(resetToken)}`)}
                                        disabled={loading}
                                        sx={{ alignSelf: 'flex-start' }}
                                    >
                                        Open Reset Page
                                    </Button>
                                </Stack>
                            )}

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

                {phase === 'reset' && (
                    // Perform Password Reset Form
                    <Box component="form" onSubmit={handlePerformReset}>
                        <Stack spacing={2.5}>
                            <TextField
                                label="Admin Email Address"
                                type="email"
                                value={forgotEmail}
                                onChange={(e) => setForgotEmail(e.target.value)}
                                fullWidth
                                required
                                autoComplete="email"
                                disabled={loading}
                            />
                            {/* Reset token is stored internally and will be sent automatically */}
                            <TextField
                                label="New Password"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                fullWidth
                                required
                                disabled={loading}
                                helperText="Minimum 8 characters"
                            />
                            <TextField
                                label="Confirm New Password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                fullWidth
                                required
                                disabled={loading}
                                error={!!confirmPassword && newPassword !== confirmPassword}
                                helperText={!!confirmPassword && newPassword !== confirmPassword ? 'Passwords do not match' : ' '}
                            />

                            <Stack direction="row" spacing={2}>
                                <Button
                                    type="button"
                                    variant="text"
                                    size="large"
                                    fullWidth
                                    onClick={handleShowForgot}
                                    disabled={loading}
                                    sx={{ fontWeight: 700 }}
                                >
                                    ← Request token again
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    disabled={loading || !forgotEmail || !newPassword || newPassword !== confirmPassword}
                                    sx={{ fontWeight: 700 }}
                                >
                                    {loading ? 'Resetting...' : 'Reset Password'}
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    );
}
