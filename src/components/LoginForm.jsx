// LoginForm.jsx
// Login form component for the Janasiksha Prochar Kendra website.
// Handles user authentication for accessing gated features (e.g., Live CCTV).
// Follows accessible, modern, and empathetic design.

import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { alpha } from '@mui/material/styles';

/**
 * LoginForm component
 * Renders a login form for user authentication.
 * @param {Object} props
 * @param {Function} props.onLogin - Callback for successful login
 * @param {Function} props.onBack - Callback for cancel/back action
 * @param {boolean} [props.hideBackButton] - Optional flag to hide the back button
 * @param {boolean} [props.embedded] - Optional flag to render in embedded mode (e.g., in a dialog)
 * @param {string} [props.loginColor] - Optional color for the login button (default: 'primary')
 * @param {boolean} [props.showForgot] - Controls whether the forgot password section is shown
 * @param {Function} [props.onShowForgot] - Callback to switch to forgot password view
 * @param {Function} [props.onShowLogin] - Callback to switch back to login view
 * @returns {JSX.Element} The rendered login form
 */
export default function LoginForm({ onBack, onLogin, hideBackButton, embedded, loginColor = 'primary', showForgot, onShowForgot, onShowLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [internalShowForgot, setInternalShowForgot] = useState(false);
  // Fix: always use prop if provided, else use internal state
  const isForgot = showForgot !== undefined ? showForgot : internalShowForgot;
  const [resetMsg, setResetMsg] = useState('');
  const emailRef = useRef(null);

  // OTP phase state
  const [isOtpPhase, setIsOtpPhase] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpMsg, setOtpMsg] = useState('');

  // Additional controls to aggressively suppress autofill in Forgot Password field
  const [fpReadOnly, setFpReadOnly] = useState(true);
  const [fpFieldName] = useState(() => 'fp_' + Math.random().toString(36).slice(2));
  const [fpFieldId] = useState(() => 'fpe_' + Math.random().toString(36).slice(2));
  const fpEditableRef = useRef(null);

  useEffect(() => {
    // Avoid auto-scrolling the page on initial load by not auto-focusing.
    // Only focus when the URL explicitly targets the login section.
    if (window.location.hash === '#login' && emailRef.current) {
      setTimeout(() => emailRef.current?.focus(), 100);
    }
  }, []);

  // Reset OTP phase if switching to Forgot Password view
  useEffect(() => {
    if (isForgot) {
      setIsOtpPhase(false);
      setOtp('');
      setOtpMsg('');
      // Sync contentEditable value when switching views
      if (fpEditableRef.current) {
        fpEditableRef.current.textContent = form.email || '';
      }
    }
  }, [isForgot]);

  // Handle input changes
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  }

  const handleForgotEmailChange = (e) => {
    // Ensure we still write into form.email while using a non-standard name to avoid autofill
    setForm(prev => ({ ...prev, email: e.target.value }));
    setError('');
  };

  const handleOtpChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(digits);
    setError('');
  };

  // Smooth scroll helper
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Handle form submit (initial credentials step)
  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setOtpMsg('');

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (!emailValid || !form.password) {
      setError('Please enter a valid email and password.');
      return;
    }

    // Optional: Try demo credential check, but still proceed to OTP
    const users = JSON.parse(localStorage.getItem('jpk_users') || '{}');
    if (users[form.email] && users[form.email] !== form.password) {
      setError('Invalid username or password.');
      return;
    }

    // Move to OTP verification phase instead of logging in directly
    setIsOtpPhase(true);
    setOtp('');
    setOtpMsg('We have sent a 6-digit OTP to your email.');
  }

  // Verify OTP
  function handleVerifyOtp(e) {
    e.preventDefault();
    setError('');

    if (!/^[0-9]{6}$/.test(otp)) {
      setError('Please enter a valid 6-digit OTP.');
      return;
    }

    onLogin?.();
    scrollToId('aboutus');
  }

  // Resend OTP
  const handleResendOtp = () => {
    setOtp('');
    setOtpMsg('A new OTP has been sent.');
  };

  // Handle forgot password
  function handleForgotPassword(e) {
    e.preventDefault();
    setResetMsg('');
    setError('');
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (!emailValid) {
      setError('Please enter a valid email to reset password.');
      return;
    }
    const users = JSON.parse(localStorage.getItem('jpk_users') || '{}');
    if (users[form.email]) {
      setResetMsg('A password reset link has been sent to your email (demo only).');
    } else {
      setError('No account found with this email.');
    }
  }

  return (
    <Box sx={{
      ...(embedded ? { p: 0, my: 0, boxShadow: 'none', borderRadius: 0 } : { boxShadow: 2, borderRadius: 3, p: { xs: 2, md: 4 }, my: 6 }),
      bgcolor: 'background.paper',
      maxWidth: 400,
      mx: 'auto'
    }}>
      {!isForgot ? (
        <>
          {!embedded && <Typography variant="h4" mb={2}>User Login</Typography>}
          <Box component="form" onSubmit={isOtpPhase ? handleVerifyOtp : handleSubmit} autoComplete="off" display="flex" flexDirection="column" gap={2}>
            <TextField
              id="login-email"
              name="email"
              label="Email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              fullWidth
              autoComplete="off"
              inputRef={emailRef}
              inputProps={{ autoComplete: 'off', autoCorrect: 'off', autoCapitalize: 'none', spellCheck: false }}
              disabled={isOtpPhase}
            />
            <TextField name="password" label="Password" type="password" value={form.password} onChange={handleChange} required fullWidth disabled={isOtpPhase} />

            {/* OTP Section (visible in OTP phase) */}
            {isOtpPhase && (
              <>
                <TextField
                  name="otp"
                  label="Enter OTP"
                  type="tel"
                  value={otp}
                  onChange={handleOtpChange}
                  autoComplete="one-time-code"
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 6, autoComplete: 'one-time-code' }}
                  required
                  fullWidth
                />
                {otpMsg && <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', mt: -0.5 }}>{otpMsg}</Typography>}
                <Box display="flex" justifyContent="flex-end" mt={1}>
                  <Button variant="text" color="primary" onClick={handleResendOtp} sx={{ textTransform: 'none', fontSize: '0.95rem', fontWeight: 500 }}>
                    Resend OTP
                  </Button>
                </Box>
              </>
            )}

            {error && <Typography color="error" textAlign="center">{error}</Typography>}
            <Box display="flex" gap={2} justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                color={loginColor}
                fullWidth
                sx={(theme) => ({
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  borderRadius: 3,
                  boxShadow: `0 2px 12px ${alpha((theme.palette[loginColor]?.main) || theme.palette.primary.main, 0.2)}`,
                  '&:hover': {
                    filter: 'brightness(0.98)',
                    boxShadow: `0 4px 16px ${alpha((theme.palette[loginColor]?.main) || theme.palette.primary.main, 0.28)}`,
                  }
                })}
              >
                {isOtpPhase ? 'Verify' : 'Login'}
              </Button>
              {!hideBackButton && (
                <Button type="button" variant="outlined" color="secondary" onClick={onBack || (() => scrollToId('home'))} fullWidth>Back</Button>
              )}
            </Box>
            {!isOtpPhase && (
              <Box display="flex" justifyContent="flex-end" mt={1}>
                <Button
                  variant="text"
                  color="primary"
                  sx={{ textTransform: 'none', fontSize: '0.95rem', fontWeight: 500 }}
                  onClick={() => {
                    if (onShowForgot) onShowForgot();
                    else setInternalShowForgot(true);
                  }}
                >
                  Forgot password?
                </Button>
              </Box>
            )}
          </Box>
        </>
      ) : (
        <>
          {/* Forgot Password Section */}
          <Box mt={2}>
            <form onSubmit={handleForgotPassword} autoComplete="off">
              <Typography variant="body2" sx={{ mb: 0.5 }}>Enter your email to reset password</Typography>
              <Box
                ref={fpEditableRef}
                component="div"
                role="textbox"
                aria-label="Email for password reset"
                contentEditable
                suppressContentEditableWarning
                inputMode="email"
                spellCheck={false}
                sx={(theme) => ({
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  px: 1.5,
                  py: 1.25,
                  mb: 1.5,
                  fontFamily: 'inherit',
                  fontSize: '0.95rem',
                  outline: 'none',
                  '&:focus': {
                    borderColor: (theme.palette.primary?.main) || theme.palette.primary,
                    boxShadow: `0 0 0 3px ${alpha((theme.palette.primary?.main) || theme.palette.primary, 0.12)}`,
                  }
                })}
                onInput={(e) => {
                  const text = (e.currentTarget.textContent || '').replace(/\s+/g, '');
                  setForm((prev) => ({ ...prev, email: text }));
                  setError('');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                  }
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth
                sx={(theme) => ({
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  borderRadius: 3,
                  boxShadow: `0 2px 12px ${alpha((theme.palette.secondary?.main) || theme.palette.primary.main, 0.2)}`,
                  '&:hover': {
                    filter: 'brightness(0.98)',
                    boxShadow: `0 4px 16px ${alpha((theme.palette.secondary?.main) || theme.palette.primary.main, 0.28)}`,
                  }
                })}
              >
                Send Reset Link
              </Button>
            </form>
            {resetMsg && <Typography color="success.main" textAlign="center" mt={1}>{resetMsg}</Typography>}
            {error && <Typography color="error" textAlign="center" mt={1}>{error}</Typography>}
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button
                variant="text"
                color="primary"
                sx={{ textTransform: 'none', fontSize: '0.95rem', fontWeight: 500 }}
                onClick={() => {
                  // Clear all local state when returning to login
                  setForm({ email: '', password: '' });
                  setError('');
                  setResetMsg('');
                  setIsOtpPhase(false);
                  setOtp('');
                  setOtpMsg('');
                  setFpReadOnly(true);
                  if (fpEditableRef.current) fpEditableRef.current.textContent = '';

                  if (onShowLogin) onShowLogin();
                  else setInternalShowForgot(false);
                }}
              >
                Back to Login
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}