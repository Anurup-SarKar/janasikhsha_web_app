// ImageCarousel.jsx
// Generic image carousel component for the Janasiksha Prochar Kendra website.
// Reimplemented using embla-carousel-react for React 19 compatibility.
// Accepts an array of image URLs and displays them in a modern, Material UI-styled carousel.

import React, { useCallback, useEffect, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

/**
 * ImageCarousel component
 * @param {Object} props
 * @param {string[]} props.images - Array of image URLs to display
 * @param {number} [props.height=550] - Height of the carousel in pixels
 * @returns {JSX.Element} The rendered image carousel
 */
export default function ImageCarousel({ images, height = 550 }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', duration: 20 },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      onSelect();
    });
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  if (!images || images.length === 0) return null;

  return (
    <Box sx={{ width: '100%', maxWidth: '100%', mx: 0, px: 0, mb: 3, position: 'relative' }}>
      {/* Viewport */}
      <Box ref={emblaRef} sx={{ overflow: 'hidden', width: '100%', boxShadow: 2 }}>
        {/* Container */}
        <Box sx={{ display: 'flex' }}>
          {images.map((img, idx) => (
            <Box key={idx} sx={{ position: 'relative', flex: '0 0 100%', minWidth: 0 }}>
              <Box
                component="img"
                src={img}
                alt={`carousel-${idx}`}
                sx={{ width: '100%', height: { xs: 420, sm: height }, objectFit: 'cover', display: 'block' }}
              />
            </Box>
          ))}
        </Box>
      </Box>

      {/* Prev/Next buttons */}
      <IconButton
        aria-label="Previous slide"
        onClick={scrollPrev}
        sx={{ position: 'absolute', top: '50%', left: 8, transform: 'translateY(-50%)', bgcolor: 'rgba(0,0,0,0.35)', color: '#fff', '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' } }}
        size="small"
      >
        ‹
      </IconButton>
      <IconButton
        aria-label="Next slide"
        onClick={scrollNext}
        sx={{ position: 'absolute', top: '50%', right: 8, transform: 'translateY(-50%)', bgcolor: 'rgba(0,0,0,0.35)', color: '#fff', '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' } }}
        size="small"
      >
        ›
      </IconButton>

      {/* Indicators */}
      <Box sx={{ position: 'absolute', bottom: 12, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 1 }}>
        {scrollSnaps.map((_, idx) => (
          <Box
            key={idx}
            role="button"
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => scrollTo(idx)}
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              cursor: 'pointer',
              backgroundColor: idx === selectedIndex ? 'rgba(255,255,255,0.95)' : 'rgba(0,0,0,0.35)',
              border: '1px solid rgba(255,255,255,0.3)',
              boxShadow: 2
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
