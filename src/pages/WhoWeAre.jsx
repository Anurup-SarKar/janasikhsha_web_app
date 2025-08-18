// WhoWeAre.jsx
// Who We Are page
import React from 'react';
import { Box, Typography } from '@mui/material';

export default function WhoWeAre() {
  return (
    <Box sx={{ bgcolor: (theme) => theme.palette.background.paper, borderRadius: 3, boxShadow: 2, p: { xs: 2, md: 5 }, mb: 3, border: (theme) => `2px solid ${theme.palette.secondary.main}`, maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h3" sx={{ color: (theme) => theme.palette.primary.main, fontFamily: 'Raleway, sans-serif', fontWeight: 700, mb: 2, textAlign: 'center', textShadow: '0 2px 8px rgba(0, 91, 150, 0.12)', fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' }, lineHeight: 1.15 }}>
        Who We Are
      </Typography>
      <Typography variant="h5" sx={{ color: (theme) => theme.palette.text.primary, fontFamily: 'Raleway, sans-serif', fontWeight: 600, mb: 3, textAlign: 'center' }}>
        Right To Survive & Thrive. Let's Stand For Children's Right.
      </Typography>
      <Typography variant="body1" sx={{ fontFamily: 'Raleway, sans-serif', color: (theme) => theme.palette.text.primary, fontSize: '1.15rem', mb: 2, textAlign: 'justify' }}>
        Bengal Presidency Council of Women & the All Bengal Women's Conference formed an independent organization for Suppression of Immoral Traffic. This society came into being as <b>Janasiksha Prochar Kendra</b>.<br /><br />
        Janasiksha Prochar Kendra is dedicated to the right to survive and thrive. We stand for the protection, education, and empowerment of underprivileged girls and women. Our mission is to provide shelter, education, and support to those in need, and to advocate for the rights of women and children in society.<br /><br />
        Our journey began with a vision to create a safe, nurturing environment for every child and woman. Today, Janasiksha Prochar Kendra continues to work tirelessly to ensure that every individual in our care has the opportunity to aspire, achieve, and lead a life of dignity.
      </Typography>
      <Typography variant="body1" sx={{ fontFamily: 'Raleway, sans-serif', color: (theme) => theme.palette.primary.main, fontWeight: 600, mt: 3, textAlign: 'center' }}>
        "Your contribution will provide underprivileged children and girls with a chance to learn and aspire."
      </Typography>
    </Box>
  );
}
