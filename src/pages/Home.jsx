// Home.jsx
// Home page for the Janasiksha Prochar Kendra website.
// Displays a hero image carousel and introductory content about the NGO's mission and impact.
// Follows accessible, modern, and empathetic design.

import React from 'react';
import { Box, Typography } from '@mui/material';
import ImageCarousel from '../components/ImageCarousel';
import { heroImages } from '../assets/CarouselImages';

/**
 * Home page component
 * Shows a hero image carousel and introductory information about the NGO.
 * @returns {JSX.Element} The rendered Home page
 */
export default function Home() {
  return (
    <Box>
      <ImageCarousel images={heroImages} height={400} borderRadius={18} />
      <Box sx={{ bgcolor: '#fff', borderRadius: 3, boxShadow: 2, p: { xs: 2, md: 4 }, mb: 3 }}>
        <Typography variant="h4" mb={2}>About Us</Typography>
        <Typography>
          We are a non-profit organization committed to the welfare, education, and rehabilitation of girl children and survivors of sexual violence. Our mission is to create a safe, nurturing environment and empower them to lead fulfilling lives.
        </Typography>
      </Box>
    </Box>
  );
}
