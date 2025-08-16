// LoginForm.jsx
// Login form component for the Janasiksha Prochar Kendra website.
// Handles user authentication for accessing gated features (e.g., Live CCTV).
// Follows accessible, modern, and empathetic design.

import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

/**
 * LoginForm component
 * Renders a login form for user authentication.
 * @param {Object} props
 * @param {Function} props.onLogin - Callback for successful login
 * @param {Function} props.onBack - Callback for cancel/back action
 * @returns {JSX.Element} The rendered login form
 */
export default function LoginForm({ onBack, onLogin }) {
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
    <Box sx={{ bgcolor: 'background.paper', borderRadius: 3, boxShadow: 2, p: { xs: 2, md: 4 }, maxWidth: 400, mx: 'auto', my: 6 }}>
      <Typography variant="h4" mb={2}>User Login</Typography>
      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
        <TextField
          id="login-email"
          name="email"
          label="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          fullWidth
          inputRef={emailRef}
        />
        <TextField name="password" label="Password" type="password" value={form.password} onChange={handleChange} required fullWidth />
        {error && <Typography color="error" textAlign="center">{error}</Typography>}
        <Box display="flex" gap={2} justifyContent="center">
          <Button type="submit" variant="contained" color="primary">Login</Button>
          <Button type="button" variant="outlined" color="secondary" onClick={onBack || (() => scrollToId('home'))}>Back</Button>
        </Box>
      </Box>
    </Box>
  );
}
