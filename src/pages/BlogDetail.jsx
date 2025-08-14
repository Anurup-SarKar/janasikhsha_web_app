// BlogDetail.jsx
// Blog detail page (removed) for the Janasiksha Prochar Kendra website.
// This feature has been deprecated and the content has been removed.

import React from 'react';
import { Box, Typography, Button } from '@mui/material';

/**
 * BlogDetail page component
 * Shows the full content of a single blog post, with a back button.
 * @param {Object} props
 * @param {Object} props.blog - The blog post object to display
 * @param {Function} props.onBack - Callback for the back button
 * @returns {JSX.Element} The rendered Blog Detail page
 */
export default function BlogDetail({ blog, onBack }) {
  return (
    <Box sx={{ bgcolor: (theme) => theme.palette.background.paper, borderRadius: 3, boxShadow: 2, p: { xs: 2, md: 5 }, mb: 3, border: (theme) => `2px solid ${theme.palette.secondary.main}`, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" sx={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, textAlign: 'center', mb: 2 }}>
        Blog Details Removed
      </Typography>
      <Button variant="contained" color="secondary" sx={{ mt: 2, fontFamily: 'Raleway, sans-serif' }} onClick={onBack || (() => window.history.back())}>
        Go Back
      </Button>
    </Box>
  );
}
