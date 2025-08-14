// LatestProjects.jsx
// Latest Projects page for the NGO.
import React from 'react';
import { Box, Typography } from '@mui/material';

export default function LatestProjects() {
  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h3" sx={{ color: 'primary.main', fontFamily: 'Raleway, sans-serif', mb: 2 }}>
        Latest Projects
      </Typography>
      <Typography variant="body1" sx={{ fontFamily: 'Raleway, sans-serif' }}>
        Our latest projects focus on child protection, education, and rehabilitation. We are committed to providing new opportunities and hope for every child and woman in our care.
      </Typography>
    </Box>
  );
}
