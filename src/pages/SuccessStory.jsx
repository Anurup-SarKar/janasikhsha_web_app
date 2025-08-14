// SuccessStory.jsx
// Success Story page for the NGO.
import React from 'react';
import { Box, Typography } from '@mui/material';

export default function SuccessStory() {
  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h3" sx={{ color: 'primary.main', fontFamily: 'Raleway, sans-serif', mb: 2 }}>
        Success Story
      </Typography>
      <Typography variant="body1" sx={{ fontFamily: 'Raleway, sans-serif' }}>
        Discover inspiring success stories of resilience and achievement from the Janasiksha Prochar Kendra community.
      </Typography>
    </Box>
  );
}
