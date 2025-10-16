// theme.js
// Custom Material UI theme for the Janasiksha Prochar Kendra website.
// Defines color palette, typography, and component overrides for a modern, accessible, and empathetic look.

import { createTheme } from '@mui/material/styles';

/**
 * Custom MUI theme object
 * @type {import('@mui/material').Theme}
 */
const theme = createTheme({
  palette: {
    primary: { main: '#005B96', contrastText: '#FFFFFF' }, // Blue
    secondary: { main: '#FF7F11', contrastText: '#0B0F18' }, // Orange
    background: {
      default: '#FFFFFF', // White
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1F2937', // Slate-800 for contrast
      secondary: '#374151',
    },
  },
  typography: {
    fontFamily: 'Raleway, sans-serif',
    h1: { 
      fontFamily: 'Raleway, sans-serif', 
      fontWeight: 700, 
      fontSize: '2rem',
      '@media (max-width: 768px)': {
        fontSize: '1.5rem',
      },
    },
    h2: { 
      fontFamily: 'Raleway, sans-serif', 
      fontWeight: 700, 
      fontSize: '1.7rem',
      '@media (max-width: 768px)': {
        fontSize: '1.3rem',
      },
    },
    h3: { 
      fontFamily: 'Raleway, sans-serif', 
      fontWeight: 700, 
      fontSize: '1.4rem',
      '@media (max-width: 768px)': {
        fontSize: '1.2rem',
      },
    },
    h4: { 
      fontFamily: 'Raleway, sans-serif', 
      fontWeight: 700, 
      fontSize: '1.2rem',
      '@media (max-width: 768px)': {
        fontSize: '1.1rem',
      },
    },
    h5: { 
      fontFamily: 'Raleway, sans-serif', 
      fontWeight: 700, 
      fontSize: '1.05rem',
      '@media (max-width: 768px)': {
        fontSize: '1rem',
      },
    },
    h6: { 
      fontFamily: 'Raleway, sans-serif', 
      fontWeight: 700, 
      fontSize: '0.95rem',
      '@media (max-width: 768px)': {
        fontSize: '0.9rem',
      },
    },
    body1: { 
      fontFamily: 'Raleway, sans-serif',
      '@media (max-width: 768px)': {
        fontSize: '0.9rem',
      },
    },
    body2: { 
      fontFamily: 'Raleway, sans-serif',
      '@media (max-width: 768px)': {
        fontSize: '0.85rem',
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          minHeight: 44, // Minimum touch target size for mobile
          padding: '8px 16px',
          '@media (max-width: 768px)': {
            minHeight: 48, // Larger touch targets on mobile
            fontSize: '1rem',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          minWidth: 44,
          minHeight: 44,
          '@media (max-width: 768px)': {
            minWidth: 48,
            minHeight: 48,
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 48,
          '@media (max-width: 768px)': {
            minHeight: 52,
            fontSize: '0.9rem',
          },
        },
      },
    },
  },
});

export default theme;
