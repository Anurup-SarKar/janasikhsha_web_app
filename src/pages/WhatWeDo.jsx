// WhatWeDo.jsx
// What We Do page for the Janasiksha Prochar Kendra website.
// Describes the NGO's programs and services, with an image carousel.
// Follows accessible, modern, and empathetic design.

import React from 'react';
import { Box, Typography } from '@mui/material';
import ImageCarousel from '../components/ImageCarousel';
import { whatWeDoImages } from '../assets/CarouselImages';

/**
 * WhatWeDo page component
 * Shows an image carousel and details about the NGO's work and impact.
 * @returns {JSX.Element} The rendered What We Do page
 */

export default function WhatWeDo() {
  return (
    <Box>
      <ImageCarousel images={whatWeDoImages} height={320} borderRadius={16} />
      <Box sx={{ bgcolor: (theme) => theme.palette.background.paper, borderRadius: 3, boxShadow: 2, p: { xs: 2, md: 5 }, mb: 3, border: (theme) => `2px solid ${theme.palette.secondary.main}`, maxWidth: 900, mx: 'auto' }}>
        <Typography variant="h3" sx={{ color: (theme) => theme.palette.primary.main, fontFamily: 'Raleway, sans-serif', fontWeight: 700, mb: 2, textAlign: 'center', textShadow: '0 2px 8px rgba(0, 91, 150, 0.12)' }}>
          What We Do: Child Protection
        </Typography>
        <Typography variant="h5" sx={{ color: (theme) => theme.palette.text.primary, fontFamily: 'Raleway, sans-serif', fontWeight: 600, mb: 3, textAlign: 'center' }}>
          "Rescue, Rehabilitate, Reintegrate"
        </Typography>
        <Typography variant="body1" sx={{ fontFamily: 'Raleway, sans-serif', color: (theme) => theme.palette.text.primary, fontSize: '1.15rem', mb: 2, textAlign: 'justify' }}>
          Janasiksha Prochar Kendra provides a safe haven for children rescued from trafficking, abuse, and neglect. Our Child Protection program is dedicated to:
          <ul style={{ marginTop: 16, marginBottom: 16 }}>
            <li>Rescuing children from vulnerable and exploitative situations.</li>
            <li>Providing immediate shelter, food, clothing, and medical care.</li>
            <li>Offering psychological counseling and trauma support.</li>
            <li>Ensuring access to education and life skills training.</li>
            <li>Working towards family tracing and safe reintegration where possible.</li>
            <li>Supporting legal action and advocacy for child rights.</li>
          </ul>
          Our multidisciplinary team works closely with government agencies, law enforcement, and other NGOs to ensure every child’s right to safety and dignity is upheld. We believe in a holistic approach—rescue, rehabilitate, and reintegrate—so that every child can look forward to a brighter, empowered future.
        </Typography>
        <Typography variant="body1" sx={{ fontFamily: 'Raleway, sans-serif', color: (theme) => theme.palette.primary.main, fontWeight: 600, mt: 3, textAlign: 'center' }}>
          "Every child deserves a childhood. Join us in protecting their rights."
        </Typography>
      </Box>
    </Box>
  );
}
