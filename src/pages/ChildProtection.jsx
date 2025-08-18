// ChildProtection.jsx
// Child Protection page
import React from 'react';
import { Box, Typography } from '@mui/material';

export default function ChildProtection() {
  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h3" sx={{ color: 'primary.main', fontFamily: 'Raleway, sans-serif', mb: 2, fontWeight: 700, fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' }, lineHeight: 1.15 }}>
        Child Protection
      </Typography>
      <Typography variant="body1" sx={{ fontFamily: 'Raleway, sans-serif' }}>
        Janasiksha Prochar Kendra provides a safe haven for children rescued from trafficking, abuse, and neglect. Our programs focus on rehabilitation, counseling, and reintegration into society, ensuring every child’s right to safety and dignity.
      </Typography>
    </Box>
  );
}
