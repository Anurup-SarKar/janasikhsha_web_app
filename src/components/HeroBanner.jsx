// HeroBanner.jsx
// Hero banner component for the Janasiksha Prochar Kendra website.
// Displays a prominent call-to-action with a donation button and background image or color.
// Follows accessible, modern, and empathetic design.

import React from 'react';
import { Box, Typography, Button, useMediaQuery } from '@mui/material';
import theme from '../theme';

/**
 * HeroBanner component
 * Shows a large banner with a headline, subheadline, and a donation button.
 * Only visible on desktop (md and up), hidden on mobile.
 * @param {Object} props
 * @param {Function} props.onDonateClick - Callback for the donation button
 * @returns {JSX.Element|null} The rendered hero banner or null on mobile
 */
export default function HeroBanner({ onDonateClick }) {
  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.paper,
        color: theme.palette.primary.main,
        py: { xs: 3, md: 7 },
        px: { xs: 2, md: 0 },
        borderRadius: '0 0 32px 32px',
        textAlign: 'center',
        boxShadow: 3,
        mb: 3,
        border: `2px solid ${theme.palette.secondary.main}`,
        backgroundImage: 'linear-gradient(90deg, rgba(0,91,150,0.03) 0%, rgba(255,127,17,0.06) 100%)',
        position: 'relative',
        overflow: 'hidden',
        maxWidth: '100vw',
      }}
    >
      {/* Spacer between navbar and header text */}
      <Box sx={{ height: { xs: 24, md: 32 } }} />
      <Typography
        variant="h2"
        fontWeight={700}
        sx={{
          fontFamily: 'Raleway, sans-serif',
          color: theme.palette.primary.main,
          mb: 1,
          textShadow: '0 2px 8px rgba(0, 91, 150, 0.12)',
          letterSpacing: 1,
          fontSize: { xs: '1.3rem', sm: '1.7rem', md: '2.2rem' }, // reduced
          wordBreak: 'break-word',
          lineHeight: 1.15,
        }}
      >
        Right To Survive & Thrive
      </Typography>
      <Typography
        variant="h5"
        sx={{
          fontFamily: 'Raleway, sans-serif',
          color: theme.palette.text.primary,
          mb: 3,
          fontWeight: 500,
          letterSpacing: 0.5,
          fontSize: { xs: '1rem', sm: '1.15rem', md: '1.3rem' }, // reduced
          wordBreak: 'break-word',
        }}
      >
        Let's Stand For Children's Right
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontFamily: 'Raleway, sans-serif',
          color: theme.palette.text.primary,
          maxWidth: 700,
          mx: 'auto',
          mb: 3,
          fontSize: { xs: '0.9rem', sm: '1rem', md: '1.05rem' }, // reduced
          wordBreak: 'break-word',
        }}
      >
        Bengal Presidency Council of Women & the All Bengal Women's Conference formed an independent organization for Suppression of Immoral Traffic. This society came into being as <b>Janasiksha Prochar Kendra</b>.
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        onClick={onDonateClick || (() => {
          const el = document.getElementById('donate');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        })}
        sx={{
          fontFamily: 'Raleway, sans-serif',
          fontWeight: 700,
          fontSize: { xs: '0.95rem', md: '1.05rem' }, // reduced
          px: { xs: 3, md: 5 },
          py: { xs: 1, md: 1.5 },
          borderRadius: 3,
          boxShadow: '0 2px 12px rgba(0, 91, 150, 0.2)',
          mb: 2,
          '&:hover': {
            filter: 'brightness(0.95)'
          },
        }}
      >
        Support Us
      </Button>
      <Typography
        variant="body1"
        sx={{
          fontFamily: 'Raleway, sans-serif',
          color: theme.palette.primary.main,
          fontWeight: 600,
          mt: 2,
          fontSize: { xs: '0.95rem', md: '1rem' }, // reduced
        }}
      >
        Your contribution will provide underprivileged children and girls with a chance to learn and aspire.
      </Typography>
    </Box>
  );
}
