// ChildEducation.jsx
// Child Education page
import React from 'react';
import { Box, Typography } from '@mui/material';

export default function ChildEducation() {
  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h3" sx={{ color: 'primary.main', fontFamily: 'Raleway, sans-serif', mb: 2, fontWeight: 700, fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' }, lineHeight: 1.15 }}>
        Child Education
      </Typography>
      <Typography variant="body1" sx={{ fontFamily: 'Raleway, sans-serif' }}>
        We believe education is the key to empowerment. Janasiksha Prochar Kendra offers formal and non-formal education, vocational training, and life skills development to help children build a brighter future.
      </Typography>
    </Box>
  );
}
