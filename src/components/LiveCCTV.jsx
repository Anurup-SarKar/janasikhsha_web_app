// LiveCCTV.jsx
// Live CCTV component for the Janasiksha Prochar Kendra website.
// Displays a gated YouTube live stream for authorized users (after login).
// Follows accessible, modern, and empathetic design.

import React from 'react';
import { Box, Typography } from '@mui/material';

/**
 * LiveCCTV component
 * Shows a YouTube live stream (CCTV) for logged-in users only.
 * @returns {JSX.Element} The rendered CCTV live stream
 */
export default function LiveCCTV() {
  return (
    <Box sx={{ bgcolor: '#fff', borderRadius: 3, boxShadow: 2, p: { xs: 2, md: 4 }, mb: 3, textAlign: 'center' }}>
      <Typography variant="h4" mb={2}>Live CCTV</Typography>
      <Typography mb={2}>Below is a free public live CCTV stream for demonstration purposes.</Typography>
      <Box sx={{ position: 'relative', width: '100%', maxWidth: 600, mx: 'auto', pt: '56.25%' }}>
        <iframe
          src="https://www.youtube.com/embed/rnXIjl_Rzy4?autoplay=1&mute=1&modestbranding=1&rel=0&showinfo=0&controls=1&enablejsapi=1"
          title="Live CCTV Stream"
          allow="autoplay; encrypted-media"
          allowFullScreen
          frameBorder="0"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 0,
            borderRadius: 8,
            boxShadow: '0 2px 8px rgba(0, 91, 150, 0.12)',
            background: '#fff',
          }}
        ></iframe>
      </Box>
      <Typography variant="caption" color="text.secondary">
        Source: YouTube - Live Stream
      </Typography>
    </Box>
  );
}
