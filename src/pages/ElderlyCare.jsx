// ElderlyCare.jsx
// Elderly Care page
import React from 'react';
import { Box, Typography } from '@mui/material';

export default function ElderlyCare() {
  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h3" sx={{ color: 'primary.main', fontFamily: 'Raleway, sans-serif', mb: 2, fontWeight: 700, fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' }, lineHeight: 1.15 }}>
        Elderly Care
      </Typography>
      <Typography variant="body1" sx={{ fontFamily: 'Raleway, sans-serif' }}>
        Janasiksha Prochar Kendra extends care and support to elderly women, providing them with a safe, respectful, and nurturing environment in their later years.
      </Typography>
    </Box>
  );
}
