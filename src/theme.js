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
    h1: { fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '2rem' },
    h2: { fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '1.7rem' },
    h3: { fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '1.4rem' },
    h4: { fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '1.2rem' },
    h5: { fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '1.05rem' },
    h6: { fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '0.95rem' },
    body1: { fontFamily: 'Raleway, sans-serif' },
    body2: { fontFamily: 'Raleway, sans-serif' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;
