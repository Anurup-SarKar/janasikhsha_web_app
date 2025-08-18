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
 * @returns {JSX.Element} The rendered login form
 */
export default function LoginForm({ onBack, onLogin, hideBackButton, embedded, loginColor = 'primary' }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const emailRef = useRef(null);

  useEffect(() => {
    // Avoid auto-scrolling the page on initial load by not auto-focusing.
    // Only focus when the URL explicitly targets the login section.
    if (window.location.hash === '#login' && emailRef.current) {
      setTimeout(() => emailRef.current?.focus(), 100);
    }
  }, []);

  // Handle input changes
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  }

  // Smooth scroll helper
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Handle form submit
  function handleSubmit(e) {
    e.preventDefault();
    // Check for user in localStorage
    const users = JSON.parse(localStorage.getItem('jpk_users') || '{}');
    if (users[form.email] && users[form.email] === form.password) {
      onLogin?.();
      scrollToId('aboutus');
      return;
    }
    // Fallback to basic validation
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (emailValid && form.password) {
      onLogin?.();
      scrollToId('aboutus');
    } else {
      setError('Please enter a valid email and password.');
      return;
    }
    // If not found in users
    setError('Invalid username or password.');
  }

  return (
    <Box sx={{
      ...(embedded ? { p: 0, my: 0, boxShadow: 'none', borderRadius: 0 } : { boxShadow: 2, borderRadius: 3, p: { xs: 2, md: 4 }, my: 6 }),
      bgcolor: 'background.paper',
      maxWidth: 400,
      mx: 'auto'
    }}>
      {!embedded && <Typography variant="h4" mb={2}>User Login</Typography>}
      <Box component="form" onSubmit={handleSubmit} autoComplete="off" display="flex" flexDirection="column" gap={2}>
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
        />
        <TextField name="password" label="Password" type="password" value={form.password} onChange={handleChange} required fullWidth />
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
            Login
          </Button>
          {!hideBackButton && (
            <Button type="button" variant="outlined" color="secondary" onClick={onBack || (() => scrollToId('home'))} fullWidth>Back</Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
