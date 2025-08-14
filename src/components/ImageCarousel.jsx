// ImageCarousel.jsx
// Generic image carousel component for the Janasiksha Prochar Kendra website.
// Uses react-material-ui-carousel for smooth, accessible, and responsive carousels.
// Accepts an array of image URLs and displays them in a modern, Material UI-styled carousel.

import React from 'react';
import { Box } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

/**
 * ImageCarousel component
 * @param {Object} props
 * @param {string[]} props.images - Array of image URLs to display
 * @param {number} [props.height=340] - Height of the carousel in pixels
 * @param {number} [props.borderRadius=16] - Border radius for carousel images
 * @returns {JSX.Element} The rendered image carousel
 */
export default function ImageCarousel({ images, height = 340, borderRadius = 16 }) {
  return (
    <Box sx={{ width: '100%', maxWidth: 900, mx: 'auto', mb: 3 }}>
      <Carousel
        autoPlay
        animation="fade"
        indicators
        navButtonsAlwaysVisible
        interval={4000}
        sx={{ borderRadius, overflow: 'hidden', boxShadow: 2 }}
      >
        {images.map((img, idx) => (
          <Box key={idx} component="img" src={img} alt="carousel" sx={{ width: '100%', height, objectFit: 'cover', borderRadius }} />
        ))}
      </Carousel>
    </Box>
  );
}
