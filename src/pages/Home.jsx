// Home.jsx
// Home page for the Janasiksha Prochar Kendra website.
// Displays a hero image carousel and introductory content about the NGO's mission and impact.
// Follows accessible, modern, and empathetic design.

import React from 'react';
import { Box } from '@mui/material';
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
    </Box>
  );
}
