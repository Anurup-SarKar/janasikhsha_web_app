// App.jsx
// Main application component for the Janasiksha Prochar Kendra website.
// Handles routing, authentication state, and renders the main layout and all feature pages.
// Uses Material-UI for styling and theming. Follows modern, accessible, and empathetic design.

import React, { useState } from 'react';
import { ThemeProvider, Container, Box } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import theme from './theme';
import ResponsiveNavbar from './components/ResponsiveNavbar';
import HeroBanner from './components/HeroBanner';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import DonationForm from './components/DonationForm';
import LoginForm from './components/LoginForm';
import LiveCCTV from './components/LiveCCTV';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import AboutUs from './pages/AboutUs';
import WhatWeDo from './pages/WhatWeDo';
import LatestProjects from './pages/LatestProjects';
import NewsRoom from './pages/NewsRoom';
import CaseHistory from './pages/CaseHistory';
import SuccessStory from './pages/SuccessStory';
import SupportUs from './pages/SupportUs';
import Location from './pages/Location';
import WhoWeAre from './pages/WhoWeAre';
import OurManifesto from './pages/OurManifesto';
import OurTeam from './pages/OurTeam';
import ChildProtection from './pages/ChildProtection';
import ChildEducation from './pages/ChildEducation';
import AfterCare from './pages/AfterCare';
import Swadhar from './pages/Swadhar';
import ElderlyCare from './pages/ElderlyCare';
import StaffList from './pages/StaffList';
import BeneficiaryDetails from './pages/BeneficiaryDetails';

/**
 * Main App component for the NGO website.
 * Handles navigation, login/logout, and renders all feature pages.
 * Uses React Router for URL-based routing and Material UI for theming.
 * @returns {JSX.Element} The rendered App with all routes and layout.
 */
function App() {
  // User authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter basename={undefined}>
        <Container maxWidth={false} disableGutters sx={{ width: '100vw', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', px: { xs: 0, md: 0 } }}>
          {/* Responsive navigation bar with login/logout and menu */}
          <ResponsiveNavbar isLoggedIn={isLoggedIn} onLogin={() => setIsLoggedIn(true)} onLogout={() => setIsLoggedIn(false)} />
          {/* Main content area with hero banner and routed pages */}
          <Box tabIndex={-1} sx={{ outline: 'none' }}>
            <HeroBanner onDonateClick={() => window.location.assign('/donate')} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/whatwedo" element={<WhatWeDo />} />
              <Route path="/latestprojects" element={<LatestProjects />} />
              <Route path="/newsroom" element={<NewsRoom />} />
              <Route path="/casehistory" element={<CaseHistory />} />
              <Route path="/successstory" element={<SuccessStory />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/supportus" element={<SupportUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/location" element={<Location />} />
              <Route path="/donate" element={<DonationForm />} />
              <Route path="/livecctv" element={isLoggedIn ? <LiveCCTV /> : <Navigate to="/login" />} />
              <Route path="/whoweare" element={<WhoWeAre />} />
              <Route path="/ourmanifesto" element={<OurManifesto />} />
              <Route path="/ourteam" element={<OurTeam />} />
              <Route path="/childprotection" element={<ChildProtection />} />
              <Route path="/childeducation" element={<ChildEducation />} />
              <Route path="/aftercare" element={<AfterCare />} />
              <Route path="/swadhar" element={<Swadhar />} />
              <Route path="/elderlycare" element={<ElderlyCare />} />
              <Route path="/stafflist" element={<StaffList />} />
              <Route path="/beneficiarydetails" element={<BeneficiaryDetails />} />
              <Route path="/login" element={<LoginForm onLogin={() => setIsLoggedIn(true)} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>
          {/* Footer styled like abwu.org.in */}
          <Box component="footer" sx={{
            bgcolor: (theme) => theme.palette.primary.main,
            color: '#fff',
            mt: 6,
            borderRadius: 0,
            fontFamily: 'Raleway, sans-serif',
            fontWeight: 500,
            fontSize: { xs: '1rem', md: '1.1rem' },
            letterSpacing: 0.5,
            boxShadow: '0 -2px 8px rgba(0, 91, 150, 0.2)',
            px: { xs: 2, md: 8 },
            pt: 5,
            pb: 2,
          }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', gap: 4, mb: 2 }}>
              {/* About Us */}
              <Box sx={{ minWidth: 180, mb: { xs: 2, md: 0 } }}>
                <Box sx={{ fontWeight: 700, fontSize: '1.1rem', mb: 1, color: 'secondary.main' }}>ABOUT US</Box>
                <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                  <li><a href="/who-we-are" style={{ color: '#fff', textDecoration: 'underline' }}>Who We Are</a></li>
                  <li><a href="/our-manifesto" style={{ color: '#fff', textDecoration: 'underline' }}>Our Manifesto</a></li>
                  <li><a href="/our-team" style={{ color: '#fff', textDecoration: 'underline' }}>Our Team</a></li>
                </Box>
              </Box>
              {/* What We Do */}
              <Box sx={{ minWidth: 180, mb: { xs: 2, md: 0 } }}>
                <Box sx={{ fontWeight: 700, fontSize: '1.1rem', mb: 1, color: 'secondary.main' }}>WHAT WE DO</Box>
                <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                  <li><a href="/child-protection" style={{ color: '#fff', textDecoration: 'underline' }}>Child Protection</a></li>
                  <li><a href="/child-education" style={{ color: '#fff', textDecoration: 'underline' }}>Child Education</a></li>
                  <li><a href="/after-care" style={{ color: '#fff', textDecoration: 'underline' }}>After Care</a></li>
                  <li><a href="/swadhar" style={{ color: '#fff', textDecoration: 'underline' }}>Swadhar</a></li>
                  <li><a href="/elderly-care" style={{ color: '#fff', textDecoration: 'underline' }}>Elderly Care</a></li>
                  <li><a href="/staff-list" style={{ color: '#fff', textDecoration: 'underline' }}>Staff List</a></li>
                  <li><a href="/beneficiary-details" style={{ color: '#fff', textDecoration: 'underline' }}>Beneficiary Details</a></li>
                </Box>
              </Box>
              {/* Quick Links */}
              <Box sx={{ minWidth: 180, mb: { xs: 2, md: 0 } }}>
                <Box sx={{ fontWeight: 700, fontSize: '1.1rem', mb: 1, color: 'secondary.main' }}>QUICK LINKS</Box>
                <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                  <li><a href="/latest-projects" style={{ color: '#fff', textDecoration: 'underline' }}>Our Latest Projects</a></li>
                  <li><a href="/news-room" style={{ color: '#fff', textDecoration: 'underline' }}>News Room</a></li>
                  <li><a href="/case-history" style={{ color: '#fff', textDecoration: 'underline' }}>Case History</a></li>
                  <li><a href="/success-story" style={{ color: '#fff', textDecoration: 'underline' }}>Success Story</a></li>
                  <li><a href="/support-us" style={{ color: '#fff', textDecoration: 'underline' }}>Support Us</a></li>
                </Box>
              </Box>
              {/* Location & Contact */}
              <Box sx={{ minWidth: 220 }}>
                <Box sx={{ fontWeight: 700, fontSize: '1.1rem', mb: 1, color: 'secondary.main' }}>LOCATION</Box>
                <Box sx={{ mb: 1 }}>89, Elliot Road, Kolkata - 700016, West Bengal, India</Box>
                <Box sx={{ mb: 1 }}><a href="tel:+913322293292" style={{ color: '#fff', textDecoration: 'underline' }}>+91 33 2229 3292</a></Box>
                <Box sx={{ mb: 1 }}><a href="mailto:info@jpk.org" style={{ color: '#fff', textDecoration: 'underline' }}>info@jpk.org</a></Box>
                <Box sx={{ mb: 1 }}><a href="https://www.facebook.com/ABWUIndia" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'underline' }}>Follow us on Facebook</a></Box>
              </Box>
            </Box>
            <Box sx={{ borderTop: '1px solid #fff', pt: 2, textAlign: 'center', fontWeight: 600, fontSize: '1rem', letterSpacing: 0.5 }}>
              Copyright © 2020 Janasiksha Prochar Kendra - All Rights Reserved.
            </Box>
          </Box>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
