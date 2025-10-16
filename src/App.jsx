// App.jsx
// Main application component for the Janasiksha Prochar Kendra website.
// Handles routing, authentication state, and renders the main layout and all feature pages.
// Uses Material-UI for styling and theming. Follows modern, accessible, and empathetic design.

import { useState } from 'react';
import { ThemeProvider, Container, Box, Toolbar } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate, Link as RouterLink, useLocation } from 'react-router-dom';
import theme from './theme';
import ResponsiveNavbar from './components/ResponsiveNavbar';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import DonationForm from './components/DonationForm';
import LoginDialog from './components/LoginDialog';
import LiveCCTV from './components/LiveCCTV';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import WhatWeDo from './pages/WhatWeDo';
import LatestProjects from './pages/LatestProjects';
import History from './pages/History';
import WhoWeAre from './pages/WhoWeAre';
import OurTeam from './pages/OurTeam';
import PDFViewer from './pages/PDFViewer';
import OurAchievements from './pages/OurAchievements';
import ProposedScheme from './pages/ProposedScheme';
import BeneficiaryDetails from './pages/BeneficiaryDetails';
import AdminHome from './pages/AdminHome';
import ResetPassword from './pages/ResetPassword';
import MaintenanceHome from './pages/MaintenanceHome';

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
        <ScrollToTop />
        <AppRoutes isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

function AppRoutes({ isLoggedIn, setIsLoggedIn }) {
  const location = useLocation();
  const isAdminRoute = location.pathname === '/admin_home' || location.pathname === '/reset_password';
  const isMaintenanceRoute = location.pathname === '/';

  return (
    <Container maxWidth={false} disableGutters sx={{ width: '100vw', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', px: { xs: 0, md: 0 } }}>
      {/* Responsive navigation bar with login/logout and menu (hidden for admin and maintenance routes) */}
      {!isAdminRoute && !isMaintenanceRoute && (
        <>
          <ResponsiveNavbar isLoggedIn={isLoggedIn} onLogin={() => setIsLoggedIn(true)} onLogout={() => setIsLoggedIn(false)} />
          {/* Spacer to offset fixed AppBar so routed pages start below the navbar */}
          <Toolbar />
        </>
      )}

      {/* Main content area with routed pages — grows to fill available space so footer stays at bottom */}
      <Box tabIndex={-1} sx={{ outline: 'none', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <Routes>
          <Route path="/" element={<MaintenanceHome />} />
          <Route path="/whatwedo" element={<WhatWeDo />} />
          <Route path="/latestprojects" element={<LatestProjects />} />
          <Route path="/history" element={<History />} />
          <Route path="/photogallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<DonationForm />} />
          <Route path="/donationform" element={<DonationForm />} />
          <Route path="/livecctv" element={isLoggedIn ? <LiveCCTV /> : <Navigate to="/login" />} />
          <Route path="/whoweare" element={<WhoWeAre />} />
          <Route path="/memorandum" element={<PDFViewer />} />
          <Route path="/proposedscheme" element={<ProposedScheme />} />
          <Route path="/admin_home" element={<AdminHome />} />
          <Route path="/reset_password" element={<ResetPassword />} />
          <Route path="/pdf/:documentId" element={<PDFViewer />} />
          <Route path="/ourteam" element={<OurTeam />} />
          <Route path="/ourachievements" element={<OurAchievements />} />
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

      {/* Footer styled like abwu.org.in (hidden for admin and maintenance routes) */}
      {!isAdminRoute && !isMaintenanceRoute && (
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
                <li><RouterLink to="/whoweare" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 6 }}>&gt;&nbsp;Who We Are</RouterLink></li>
                <li><RouterLink to="/memorandum" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 6 }}>&gt;&nbsp;Memorandum of Association</RouterLink></li>
                <li><RouterLink to="/ourteam" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 6 }}>&gt;&nbsp;Authority of Organization & Staff Structure</RouterLink></li>
              </Box>
            </Box>
            {/* Quick Links */}
            <Box sx={{ minWidth: 180, mb: { xs: 2, md: 0 } }}>
              <Box sx={{ fontWeight: 700, fontSize: '1.1rem', mb: 1, color: 'secondary.main' }}>QUICK LINKS</Box>
              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                <li><RouterLink to="/latestprojects" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 6 }}>&gt;&nbsp;Running Scheme</RouterLink></li>
                <li><RouterLink to="/proposedscheme" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 6 }}>&gt;&nbsp;Proposed Scheme</RouterLink></li>
                <li><RouterLink to="/ourachievements" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 6 }}>&gt;&nbsp;Our Achivements</RouterLink></li>
                <li><RouterLink to="/history" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 6 }}>&gt;&nbsp;History Of Organization</RouterLink></li>
                <li><RouterLink to="/photogallery" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 6 }}>&gt;&nbsp;Photo Gallery</RouterLink></li>
              </Box>
            </Box>
            {/* Location & Contact */}
            <Box sx={{ minWidth: 280 }}>
              <Box sx={{ fontWeight: 700, fontSize: '1.1rem', mb: 1, color: 'secondary.main' }}>CONTACT US</Box>
              <Box sx={{ mb: 1, fontSize: '0.9rem' }}>
                <strong>Liaison Office:</strong><br />
                31B,Bhabani Dutta Lane, Kolkata-700073, WB, India
              </Box>
              <Box sx={{ mb: 1, fontSize: '0.9rem' }}>
                <strong>Head Office:</strong><br />
                CK-6, Sector-II, Salt Lake City, Kolkata 700064,WB, India
              </Box>
               <Box sx={{ mb: 1, fontSize: '0.9rem' }}>
                <strong>Rural Office:</strong><br />
                P.O+Vill: Baganda,Via:jangipara, Hoogly 712404,WB, India
              </Box>
              <Box sx={{ mb: 1 }}><a href="tel:+913322413324" style={{ color: '#fff', textDecoration: 'none' }}>+91-(033) 2241-3324</a></Box>
              <Box sx={{ mb: 1 }}><a href="mailto:jpk.kolkata@gmail.com" style={{ color: '#fff', textDecoration: 'none' }}>jpk.kolkata@gmail.com</a></Box>
              <Box sx={{ mb: 1 }}><a href="https://www.facebook.com/ABWUIndia" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>Follow us on Facebook</a></Box>
            </Box>
          </Box>
          <Box sx={{ borderTop: '1px solid #fff', pt: 2, textAlign: 'center', fontWeight: 600, fontSize: '1rem', letterSpacing: 0.5 }}>
            Copyright © 2020 Janasiksha Prochar Kendra - All Rights Reserved.
          </Box>
        </Box>
      )}
    </Container>
  );
}

export default App;
