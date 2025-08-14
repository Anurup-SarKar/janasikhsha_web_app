// AfterCare.jsx
// After Care page
import React from 'react';
import { Box, Typography } from '@mui/material';

export default function AfterCare() {
  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h3" sx={{ color: 'primary.main', fontFamily: 'Raleway, sans-serif', mb: 2 }}>
        After Care
      </Typography>
      <Typography variant="body1" sx={{ fontFamily: 'Raleway, sans-serif' }}>
        Our After Care program supports young women as they transition to independent living, providing guidance, resources, and emotional support to help them thrive beyond our care.
      </Typography>
      <Typography variant="body1" sx={{ fontFamily: 'Raleway, sans-serif' }}>
        Janasiksha Prochar Kendra's After Care mission is to ensure that no young woman feels alone or unsupported during their transition to independence. We are committed to walking alongside each young woman, offering personalized support and connecting them with essential resources and opportunities for personal and professional growth.
      </Typography>
    </Box>
  );
}
