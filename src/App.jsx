// App.jsx
// Main application component for the Janasiksha Prochar Kendra website.
// Handles routing, authentication state, and renders the main layout and all feature pages.
// Uses Material-UI for styling and theming. Follows modern, accessible, and empathetic design.

import React, { useState } from 'react';
import { ThemeProvider, Container, Box } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate, Link as RouterLink } from 'react-router-dom';
import theme from './theme';
import ResponsiveNavbar from './components/ResponsiveNavbar';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import DonationForm from './components/DonationForm';
import LoginDialog from './components/LoginDialog';
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

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Container maxWidth={false} disableGutters sx={{ width: '100vw', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', px: { xs: 0, md: 0 } }}>
          {/* Responsive navigation bar with login/logout and menu */}
          <ResponsiveNavbar isLoggedIn={isLoggedIn} onLogin={() => setIsLoggedIn(true)} onLogout={() => setIsLoggedIn(false)} />
          {/* Main content area with routed pages — grows to fill available space so footer stays at bottom */}
          <Box tabIndex={-1} sx={{ outline: 'none', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
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
              <Route path="/login" element={
                <LoginDialog
                  open={true}
                  onClose={() => window.location.assign(import.meta.env.BASE_URL)}
                  onLogin={() => setIsLoggedIn(true)}
                />
              } />
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
                  <li><RouterLink to="/who-we-are" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 6 }}>&gt;&nbsp;Who We Are</RouterLink></li>
                  <li><RouterLink to="/our-manifesto" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 6 }}>&gt;&nbsp;Our Manifesto</RouterLink></li>
                  <li><RouterLink to="/our-team" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 6 }}>&gt;&nbsp;Our Team</RouterLink></li>
                </Box>
              </Box>
              {/* What We Do */}
              <Box sx={{ minWidth: 180, mb: { xs: 2, md: 0 } }}>
                <Box sx={{ fontWeight: 700, fontSize: '1.1rem', mb: 1, color: 'secondary.main' }}>WHAT WE DO</Box>
                <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                  <li><RouterLink to="/child-protection" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 6 }}>&gt;&nbsp;Child Protection</RouterLink></li>
                  <li><RouterLink to="/child-education" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 6 }}>&gt;&nbsp;Child Education</RouterLink></li>
                  <li><RouterLink to="/after-care" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 6 }}>&gt;&nbsp;After Care</RouterLink></li>
                  <li><RouterLink to="/swadhar" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 6 }}>&gt;&nbsp;Swadhar</RouterLink></li>
                  <li><RouterLink to="/elderly-care" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 6 }}>&gt;&nbsp;Elderly Care</RouterLink></li>
                  <li><RouterLink to="/staff-list" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 6 }}>&gt;&nbsp;Staff List</RouterLink></li>
                  <li><RouterLink to="/beneficiary-details" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 6 }}>&gt;&nbsp;Beneficiary Details</RouterLink></li>
                </Box>
              </Box>
              {/* Quick Links */}
              <Box sx={{ minWidth: 180, mb: { xs: 2, md: 0 } }}>
                <Box sx={{ fontWeight: 700, fontSize: '1.1rem', mb: 1, color: 'secondary.main' }}>QUICK LINKS</Box>
                <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                  <li><RouterLink to="/latest-projects" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 6 }}>&gt;&nbsp;Our Latest Projects</RouterLink></li>
                  <li><RouterLink to="/news-room" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 6 }}>&gt;&nbsp;News Room</RouterLink></li>
                  <li><RouterLink to="/case-history" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 6 }}>&gt;&nbsp;Case History</RouterLink></li>
                  <li><RouterLink to="/success-story" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 6 }}>&gt;&nbsp;Success Story</RouterLink></li>
                  <li><RouterLink to="/support-us" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 6 }}>&gt;&nbsp;Support Us</RouterLink></li>
                </Box>
              </Box>
              {/* Location & Contact */}
              <Box sx={{ minWidth: 220 }}>
                <Box sx={{ fontWeight: 700, fontSize: '1.1rem', mb: 1, color: 'secondary.main' }}>LOCATION</Box>
                <Box sx={{ mb: 1 }}>89, Elliot Road, Kolkata - 700016, West Bengal, India</Box>
                <Box sx={{ mb: 1 }}><a href="tel:+913322293292" style={{ color: '#fff', textDecoration: 'none' }}>+91 33 2229 3292</a></Box>
                <Box sx={{ mb: 1 }}><a href="mailto:info@jpk.org" style={{ color: '#fff', textDecoration: 'none' }}>info@jpk.org</a></Box>
                <Box sx={{ mb: 1 }}><a href="https://www.facebook.com/ABWUIndia" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>Follow us on Facebook</a></Box>
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
