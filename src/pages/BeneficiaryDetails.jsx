// BeneficiaryDetails.jsx
// Beneficiary Details page
import React from 'react';
import { Box, Typography } from '@mui/material';

export default function BeneficiaryDetails() {
  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h3" sx={{ color: 'primary.main', fontFamily: 'Raleway, sans-serif', mb: 2, fontWeight: 700, fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' }, lineHeight: 1.15 }}>
        Beneficiary Details
      </Typography>
      <Typography variant="body1" sx={{ fontFamily: 'Raleway, sans-serif' }}>
        Learn about the individuals and groups who have benefited from our programs. (Beneficiary stories and data can be added here.)
      </Typography>
    </Box>
  );
}
