// SupportUs.jsx
// Support Us page for the Janasiksha Prochar Kendra website.
// Explains ways to support the NGO, including donations and volunteering.
// Follows accessible, modern, and empathetic design.

import React from 'react';
import { Box, Typography } from '@mui/material';

/**
 * SupportUs page component
 * Shows information about supporting the NGO, including donation and volunteer options.
 * @returns {JSX.Element} The rendered Support Us page
 */

export default function SupportUs() {
  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h3" sx={{ color: 'primary.main', fontFamily: 'Raleway, sans-serif', mb: 2 }}>
        Support Us
      </Typography>
      <Typography variant="body1" sx={{ fontFamily: 'Raleway, sans-serif' }}>
        Your contribution will provide underprivileged children and girls with a chance to learn and aspire. Support us in our mission to empower and protect those in need.
      </Typography>
    </Box>
  );
}
