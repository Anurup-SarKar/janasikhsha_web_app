// NotFound.jsx
// 404 Not Found page for the Janasiksha Prochar Kendra website.
// Displays a user-friendly message when a route is not found.
// Follows accessible, modern, and empathetic design.

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

/**
 * NotFound page component
 * Shows a 404 error message and a button to return to the home page.
 * @returns {JSX.Element} The rendered Not Found page
 */
export default function NotFound() {
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h4" color="error">404 - Page Not Found</Typography>
      <Button
        variant="contained"
        color="primary"
        component={RouterLink}
        to="/"
        sx={{ mt: 2 }}
      >
        Go to Home Page
      </Button>
    </Box>
  );
}
