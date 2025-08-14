// Swadhar.jsx
// Swadhar page
import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Swadhar() {
  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h3" sx={{ color: 'primary.main', fontFamily: 'Raleway, sans-serif', mb: 2 }}>
        Swadhar
      </Typography>
      <Typography variant="body1" sx={{ fontFamily: 'Raleway, sans-serif' }}>
        The Swadhar program offers shelter, counseling, and rehabilitation for women in distress, helping them regain confidence and rebuild their lives with dignity.
      </Typography>
    </Box>
  );
}
