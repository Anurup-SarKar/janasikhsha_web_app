// SuccessStory.jsx
// Success Story page for the NGO.
import React from 'react';
import { Box, Typography } from '@mui/material';

export default function SuccessStory() {
  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h3" sx={{ color: 'primary.main', fontFamily: 'Raleway, sans-serif', mb: 2, fontWeight: 700, fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' }, lineHeight: 1.15 }}>
        Success Story
      </Typography>
      <Typography variant="body1" sx={{ fontFamily: 'Raleway, sans-serif' }}>
        Discover inspiring success stories of resilience and achievement from the Janasiksha Prochar Kendra community.
      </Typography>
    </Box>
  );
}
