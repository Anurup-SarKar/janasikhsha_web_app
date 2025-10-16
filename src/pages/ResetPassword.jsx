import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Container, Paper, Stack, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';
import LockResetRoundedIcon from '@mui/icons-material/LockResetRounded';
import { performPasswordReset } from '../admin/api/auth';

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function ResetPassword() {
    const navigate = useNavigate();
    const query = useQuery();

    // Detect if this is admin based ONLY on URL parameter 'type=admin'
    // Normal users will not have this parameter
    const [isAdmin] = React.useState(() => query.get('type') === 'admin');

    // Email and token come from URL; email is non-editable
    const [email] = React.useState(() => decodeURIComponent(query.get('email') || ''));
    const [token] = React.useState(query.get('token') || '');
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState('');

    // Validate link - for admin, check stored token; for normal users, just check URL params exist
    React.useEffect(() => {
        // For admin users, validate against stored token
        if (isAdmin) {
            try {
                const storedToken = localStorage.getItem('admin_reset_token');
                const expiresAtStr = localStorage.getItem('admin_reset_expiresAt');
                const expiresAt = expiresAtStr ? parseInt(expiresAtStr, 10) : 0;
                const now = Date.now();
                const emailStored = localStorage.getItem('admin_reset_email') || '';

                if (!token || !storedToken || token !== storedToken) {
                    sessionStorage.setItem('admin_reset_link_error', 'Reset link is invalid or expired. Please request a new link.');
                    if (email) sessionStorage.setItem('admin_reset_email', email);
                    navigate('/admin_home');
                    return;
                }
                if (expiresAt && now > expiresAt) {
                    sessionStorage.setItem('admin_reset_link_error', 'Reset link expired. Please request a new link.');
                    if (email || emailStored) sessionStorage.setItem('admin_reset_email', email || emailStored);
                    navigate('/admin_home');
                    return;
                }
            } catch (e) {
                // If any error, be safe and redirect to login dialog with message
                sessionStorage.setItem('admin_reset_link_error', 'Unable to verify reset link. Please request a new link.');
                if (email) sessionStorage.setItem('admin_reset_email', email);
                navigate('/admin_home');
            }
        } else {
            // For normal users, just validate token and email exist in URL (backend will validate token)
            if (!token || !email) {
                setMessage('Invalid reset link. Token or email is missing.');
            }
        }
    }, [token, email, navigate, isAdmin]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!email) { setMessage('Email is missing from the link.'); return; }
        if (!newPassword || newPassword.length < 8) { setMessage('Password must be at least 8 characters long.'); return; }
        if (newPassword !== confirmPassword) { setMessage('Passwords do not match.'); return; }

        setLoading(true);
        try {
            const res = await performPasswordReset(email, token, newPassword);
            if (res?.statusCode === 200) {
                // Success: redirect to JPK home page
                setMessage('Password reset successful! Redirecting to home page...');
                setTimeout(() => {
                    if (isAdmin) {
                        // Clean up admin reset tokens
                        localStorage.removeItem('admin_reset_token');
                        localStorage.removeItem('admin_reset_expiresAt');
                        localStorage.removeItem('admin_reset_email');
                    }
                    // Redirect to home page for both admin and normal users
                    navigate('/');
                }, 2000);
            } else {
                setMessage(res?.statusMessage || 'Password reset failed.');
            }
        } catch (err) {
            const msg = err?.message || 'Password reset failed.';
            try {
                const match = msg.match(/\{.*"statusMessage"\s*:\s*"([^"]+)"/);
                setMessage(match ? match[1] : msg);
            } catch {
                setMessage(msg);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ py: 6 }}>
            <Paper elevation={3} sx={{ p: { xs: 2, md: 3 }, borderRadius: 3 }}>
                <Stack spacing={2} component="form" onSubmit={handleSubmit}>
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
                        <LockResetRoundedIcon color="primary" />
                        <Typography variant="h5" sx={{ fontWeight: 800 }}>Reset Password</Typography>
                    </Stack>

                    {message && (
                        <Alert severity={/success/i.test(message) ? 'success' : 'error'} onClose={() => setMessage('')}>
                            {message}
                        </Alert>
                    )}

                    <TextField
                        label={isAdmin ? "Admin Email Address" : "Email Address"}
                        type="email"
                        value={email}
                        fullWidth
                        required
                        autoComplete="email"
                        InputProps={{ readOnly: true }}
                        helperText="This is pre-filled from your reset link"
                    />

                    {/* Token field removed; token comes from the URL and must match stored token */}

                    <TextField
                        label="New Password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        fullWidth
                        required
                        helperText="Minimum 8 characters"
                    />

                    <TextField
                        label="Confirm New Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        fullWidth
                        required
                        error={!!confirmPassword && newPassword !== confirmPassword}
                        helperText={!!confirmPassword && newPassword !== confirmPassword ? 'Passwords do not match' : ' '}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LockResetRoundedIcon />}
                        disabled={loading}
                        sx={{ fontWeight: 700 }}
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </Button>
                </Stack>
            </Paper>
        </Container>
    );
}
