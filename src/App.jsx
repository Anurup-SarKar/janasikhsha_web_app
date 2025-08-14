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
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
