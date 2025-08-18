// Blog.jsx
// Blog listing page (removed) for the Janasiksha Prochar Kendra website.
// This feature has been deprecated and the content has been removed.

import React from 'react';
import { Box, Typography } from '@mui/material';

/**
 * Blog page component
 * Shows a list of blog posts with title, date, excerpt, and a Read More button.
 * @returns {JSX.Element} The rendered Blog listing page
 */

export default function Blog() {
  return (
    <Box sx={{ bgcolor: (theme) => theme.palette.background.paper, borderRadius: 3, boxShadow: 2, p: { xs: 2, md: 5 }, mb: 3, border: (theme) => `2px solid ${theme.palette.secondary.main}`, maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h3" sx={{ color: (theme) => theme.palette.primary.main, fontFamily: 'Raleway, sans-serif', fontWeight: 700, mb: 2, textAlign: 'center', textShadow: '0 2px 8px rgba(0, 91, 150, 0.12)', fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' }, lineHeight: 1.15 }}>
        Blog
      </Typography>
      <Typography variant="body1" sx={{ fontFamily: 'Raleway, sans-serif', textAlign: 'center', color: (theme) => theme.palette.text.primary }}>
        Blog has been removed.
      </Typography>
    </Box>
  );
}
