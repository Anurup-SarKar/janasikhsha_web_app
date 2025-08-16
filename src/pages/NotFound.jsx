// NotFound.jsx
// 404 Not Found page for the Janasiksha Prochar Kendra website.
// Displays a user-friendly message when a route is not found.
// Follows accessible, modern, and empathetic design.

import React from 'react';
import { Box, Typography, Button } from '@mui/material';

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
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        sx={{ mt: 2 }}
      >
        Go to Top
      </Button>
    </Box>
  );
}
