/**
 * Gallery.jsx
 *
 * Gallery page for the Janasiksha Prochar Kendra website.
 * Displays a hero image carousel, a horizontally scrollable image carousel, and a video carousel.
 * The image carousel shows photos of girls and support groups (royalty-free Unsplash images).
 * The video carousel shows sample public domain videos (can be replaced with real NGO event videos).
 * Both carousels are accessible and support swipe/arrow navigation.
 * Modern, accessible, and empathetic design.
 *
 * @fileoverview Gallery page with image and video carousels, styled and documented for accessibility and maintainability.
 */

import React, { useRef } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ImageCarousel from './ImageCarousel';
import { galleryImages } from '../assets/CarouselImages';

// List of gallery images (Unsplash, royalty-free)
const imageItems = [
  { src: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80', alt: 'Smiling Girls Group' },
  { src: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80', alt: 'Happy Girl Smiling' },
  { src: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80', alt: 'Girls in Classroom' },
  { src: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80', alt: 'Empowered Girl' },
  { src: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80', alt: 'Girls Smiling' },
  { src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80', alt: 'Support Group' },
];

// List of gallery videos (sample public domain videos)
const videoItems = [
  {
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    poster: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
    alt: 'NGO Event Video',
    type: 'video/mp4',
  },
  {
    src: 'https://www.w3schools.com/html/movie.mp4',
    poster: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80',
    alt: 'Awareness Program',
    type: 'video/mp4',
  },
];

/**
 * Carousel component for horizontal scrolling of items (images/videos)
 *
 * @param {Object} props - Component props
 * @param {Array} props.items - List of items to display
 * @param {Function} props.renderItem - Function to render each item
 * @returns {JSX.Element} The rendered carousel
 */
function Carousel({ items, renderItem }) {
  const scrollRef = useRef(null);
  /**
   * Scrolls the carousel by a given offset
   * @param {number} offset - The number of pixels to scroll horizontally
   */
  const scroll = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };
  return (
    <Box sx={{ position: 'relative', width: '100%', mb: 2 }}>
      {/* Left arrow button for scrolling */}
      <IconButton
        aria-label="scroll left"
        onClick={() => scroll(-350)}
        sx={{ position: 'absolute', left: 0, top: '50%', zIndex: 2, transform: 'translateY(-50%)', bgcolor: 'background.paper', boxShadow: 1, display: { xs: 'none', sm: 'flex' } }}
      >
        <ArrowBackIosIcon />
      </IconButton>
      {/* Carousel content */}
      <Box
        ref={scrollRef}
        sx={{
          display: 'flex',
          overflowX: 'auto',
          gap: 2,
          scrollSnapType: 'x mandatory',
          py: 2,
          px: 5,
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': { height: 8 },
          '&::-webkit-scrollbar-thumb': { bgcolor: 'grey.300', borderRadius: 4 },
        }}
      >
        {items.map((item, idx) => (
          <Box
            key={idx}
            sx={{
              minWidth: { xs: 240, sm: 320 },
              maxWidth: 400,
              flex: '0 0 auto',
              scrollSnapAlign: 'center',
              borderRadius: 2,
              boxShadow: 1,
              bgcolor: 'background.paper',
              p: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {renderItem(item)}
          </Box>
        ))}
      </Box>
      {/* Right arrow button for scrolling */}
      <IconButton
        aria-label="scroll right"
        onClick={() => scroll(350)}
        sx={{ position: 'absolute', right: 0, top: '50%', zIndex: 2, transform: 'translateY(-50%)', bgcolor: 'background.paper', boxShadow: 1, display: { xs: 'none', sm: 'flex' } }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
}

/**
 * Gallery component for the NGO website.
 * Shows a hero image carousel, a horizontally scrollable image carousel, and a video carousel.
 *
 * @component
 * @returns {JSX.Element} The rendered Gallery page.
 */
export default function Gallery() {
  return (
    <Box>
      {/* Hero image carousel */}
      <ImageCarousel images={galleryImages} height={340} borderRadius={16} />
      {/* Main gallery content */}
      <Box sx={{ bgcolor: 'background.paper', borderRadius: 3, boxShadow: 2, p: { xs: 2, md: 4 }, mb: 3 }}>
        <Typography variant="h4" mb={2}>Gallery</Typography>
        <Typography variant="h6" mb={1}>Photos</Typography>
        <Carousel
          items={imageItems}
          renderItem={(item) => (
            <Box component="img" src={item.src} alt={item.alt} sx={{ width: '100%', borderRadius: 2, objectFit: 'cover', height: 200 }} loading="lazy" />
          )}
        />
        <Typography variant="h6" mb={1} mt={3}>Videos</Typography>
        <Carousel
          items={videoItems}
          renderItem={(item) => (
            <video
              controls
              poster={item.poster}
              style={{ width: '100%', borderRadius: 8, height: 200, background: 'background.default' }}
              aria-label={item.alt}
              preload="none"
              tabIndex={0}
            >
              <source src={item.src} type={item.type || 'video/mp4'} />
              Sorry, your browser does not support embedded videos.
            </video>
          )}
        />
        <Typography variant="body2" color="text.secondary" mt={2} textAlign="center">
          Swipe left/right or use arrows to browse more images and videos
        </Typography>
      </Box>
    </Box>
  );
}
