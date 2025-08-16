// App.jsx
// Main application component for the Janasiksha Prochar Kendra website.
// Converted to a single-page app with smooth in-page navigation.

import React, { useState, useEffect } from 'react';
import { ThemeProvider, Container, Box } from '@mui/material';
import theme from './theme';
import ResponsiveNavbar from './components/ResponsiveNavbar';
import HeroBanner from './components/HeroBanner';
import SinglePage from './pages/SinglePage';
import ScrollTopButton from './components/ScrollTopButton';

/**
 * Main App component for the NGO website.
 * Converted to a single-page layout with smooth scrolling navigation.
 * @returns {JSX.Element} The rendered App with all sections and layout.
 */
function App() {
  // User authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Keep page at the top on first load when no hash is present
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  // Smooth scroll helper
  const scrollToId = (id) => {
    if (!id) return;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth={false} disableGutters sx={{ width: '100vw', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', px: { xs: 0, md: 0 } }}>
        {/* Responsive navigation bar with login/logout and menu */}
        <ResponsiveNavbar
          isLoggedIn={isLoggedIn}
          onLogin={() => setIsLoggedIn(true)}
          onLogout={() => setIsLoggedIn(false)}
          onNavigate={scrollToId}
        />
        {/* Main content area with hero banner and single-page sections */}
        <Box tabIndex={-1} sx={{ outline: 'none' }}>
          <HeroBanner onDonateClick={() => scrollToId('donate')} />
          <SinglePage isLoggedIn={isLoggedIn} onLogin={() => setIsLoggedIn(true)} />
        </Box>
        {/* Footer with contact info and copyright */}
        <Box component="footer" sx={{
          bgcolor: (theme) => theme.palette.primary.main,
          color: '#fff',
          textAlign: 'center',
          py: 2,
          mt: 6,
          borderRadius: 0,
          fontFamily: 'Raleway, sans-serif',
          fontWeight: 600,
          fontSize: { xs: '1rem', md: '1.1rem' },
          letterSpacing: 0.5,
          boxShadow: '0 -2px 8px rgba(0, 91, 150, 0.2)',
        }}>
          89, Elliot Road, Kolkata - 700016, West Bengal, India &nbsp;|&nbsp;
          <a href="tel:+913322293292" style={{ color: '#fff', textDecoration: 'underline' }}>+91 33 2229 3292</a>
          {/* TODO: Add official email and social links for Janasiksha Prochar Kendra */}
          <br />
          Copyright © 2020 Janasiksha Prochar Kendra - All Rights Reserved.
        </Box>
        <ScrollTopButton />
      </Container>
    </ThemeProvider>
  );
}

export default App;
