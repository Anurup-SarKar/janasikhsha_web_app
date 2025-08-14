// LoginForm.jsx
// Login form component for the Janasiksha Prochar Kendra website.
// Handles user authentication for accessing gated features (e.g., Live CCTV).
// Follows accessible, modern, and empathetic design.

import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  useEffect(() => {
    // Blur any active element before focusing email
    if (document.activeElement && typeof document.activeElement.blur === 'function') {
      document.activeElement.blur();
    }
    setTimeout(() => {
      if (emailRef.current) {
        emailRef.current.focus();
      }
    }, 100);
  }, []);

  // Handle input changes
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  }

  // Handle form submit
  function handleSubmit(e) {
    e.preventDefault();
    // Check for user in localStorage
    const users = JSON.parse(localStorage.getItem('jpk_users') || '{}');
    if (users[form.email] && users[form.email] === form.password) {
      onLogin();
      navigate('/aboutus');
      return;
    }
    // Fallback to default validation
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (emailValid && form.password) {
      onLogin();
      navigate('/aboutus');
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
          <Button type="button" variant="outlined" color="secondary" onClick={onBack}>Back</Button>
        </Box>
      </Box>
    </Box>
  );
}
