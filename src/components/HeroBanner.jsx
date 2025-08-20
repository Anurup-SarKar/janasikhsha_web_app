// HeroBanner.jsx
// Hero banner component for the Janasiksha Prochar Kendra website.
// Displays a prominent call-to-action with a donation button and background image or color.
// Follows accessible, modern, and empathetic design.

import React from 'react';
import { Box, Typography, Button, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import theme from '../theme';

/**
 * HeroBanner component
 * Shows a large banner with a headline, subheadline, and a donation button.
 * Only visible on desktop (md and up), hidden on mobile.
 * @returns {JSX.Element|null} The rendered hero banner or null on mobile
 * Clicking the Donate Now button navigates to the donation page (/donate)
 */
export default function HeroBanner() {
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const navigate = useNavigate();
  if (!isDesktop) return null;
  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.paper,
        color: theme.palette.primary.main,
        py: { xs: 4, md: 7 },
        textAlign: 'center',
        boxShadow: 3,
        mb: 3,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Typography
        variant="h2"
        fontWeight={700}
        sx={{
          fontFamily: 'Raleway, sans-serif',
          color: theme.palette.primary.main,
          mb: 1,
          marginTop:5,
          textShadow: '0 2px 8px rgba(0, 91, 150, 0.12)',
          letterSpacing: 1,
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
          fontSize: { xs: '1rem', md: '1.15rem' },
        }}
      >
        Bengal Presidency Council of Women & the All Bengal Women's Conference formed an independent organization for Suppression of Immoral Traffic. This society came into being as <b>Janasiksha Prochar Kendra</b>.
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={() => navigate('/donate')}
        sx={{
          fontFamily: 'Raleway, sans-serif',
          fontWeight: 700,
          fontSize: '1.15rem',
          px: 5,
          py: 1.5,
          borderRadius: 3,
          boxShadow: '0 2px 12px rgba(0, 91, 150, 0.2)',
          mb: 2,
          backgroundColor: theme.palette.secondary.main,
          color: '#fff',
          '&:hover': {
            backgroundColor: theme.palette.secondary.dark || theme.palette.secondary.main,
          },
        }}
      >
        Donate Now
      </Button>
      <Typography
        variant="body1"
        sx={{
          fontFamily: 'Raleway, sans-serif',
          color: theme.palette.primary.main,
          fontWeight: 600,
          mt: 2,
        }}
      >
        Your contribution will provide underprivileged children and girls with a chance to learn and aspire.
      </Typography>
    </Box>
  );
}
