// StaffList.jsx
// Staff List page
import React from 'react';
import { Box, Typography } from '@mui/material';

export default function StaffList() {
  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h3" sx={{ color: 'primary.main', fontFamily: 'Raleway, sans-serif', mb: 2, fontWeight: 700, fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' }, lineHeight: 1.15 }}>
        Staff List
      </Typography>
      <Typography variant="body1" sx={{ fontFamily: 'Raleway, sans-serif' }}>
        Meet our dedicated staff members who make our mission possible. (Staff details and photos can be added here.)
      </Typography>
    </Box>
  );
}
