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
 * @returns {JSX.Element} The rendered image carousel
 */
export default function ImageCarousel({ images, height = 550 }) {
  return (
    <Box sx={{ width: '100%', maxWidth: '100%', mx: 0, px: 0, mb: 3, position: 'relative' }}>
      <Carousel
        autoPlay
        animation="fade"
        indicators
        navButtonsAlwaysVisible
        interval={4000}
        indicatorContainerProps={{
          style: { position: 'absolute', bottom: 12, left: 0, right: 0, display: 'flex', justifyContent: 'center', padding: 0 }
        }}
        indicatorIconButtonProps={{
          style: {
            color: 'rgba(255,255,255,0.9)',
            background: 'rgba(0,0,0,0.25)',
            width: 10,
            height: 10,
            margin: '0 6px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
            border: '1px solid rgba(255,255,255,0.2)'
          }
        }}
        activeIndicatorIconButtonProps={{
          style: { color: '#fff', background: 'rgba(0,0,0,0.6)', boxShadow: '0 4px 12px rgba(0,0,0,0.35)' }
        }}
        sx={{ width: '100%', overflow: 'hidden', boxShadow: 2 }}
      >
        {images.map((img, idx) => (
          <Box
            key={idx}
            component="img"
            src={img}
            alt={`carousel-${idx}`}
            sx={{
              width: '100%',
              height: { xs: 420, sm: height },
              objectFit: 'cover',
              display: 'block'
            }}
          />
        ))}
      </Carousel>
    </Box>
  );
}
