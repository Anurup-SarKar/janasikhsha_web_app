// Contact.jsx
// Contact information page for the Janasiksha Prochar Kendra website.
// Displays email, phone, address, map, and quick links for the NGO.
// Follows accessible, modern, and empathetic design.

import React from 'react';
import { Box, Typography, Link } from '@mui/material';

/**
 * Contact page component.
 * Shows the NGO's contact details, Google map, and quick navigation links.
 * Quick links include About, What We Do, Projects, News, Case History, Success Story, Support, Location.
 * @returns {JSX.Element} The rendered Contact page.
 */
export default function Contact() {
  const go = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Box sx={{ bgcolor: (theme) => theme.palette.background.paper, borderRadius: 3, boxShadow: 2, p: { xs: 2, md: 4 }, mb: 3 }}>
      {/* Contact header */}
      <Typography variant="h4" mb={2} sx={{ color: (theme) => theme.palette.primary.main, fontWeight: 700, fontFamily: 'Raleway, sans-serif' }}>
        Contact Us
      </Typography>
      {/* Email */}
      <Typography mb={1} sx={{ fontFamily: 'Raleway, sans-serif' }}>
        <strong>Email:</strong> <Link href="mailto:info@jpk.org" underline="hover">info@jpk.org</Link>
      </Typography>
      {/* Phone */}
      <Typography mb={1} sx={{ fontFamily: 'Raleway, sans-serif' }}>
        <strong>Phone:</strong> <Link href="tel:+913322293292" underline="hover">+91 33 2229 3292</Link>
      </Typography>
      {/* Address */}
      <Typography mb={2} sx={{ fontFamily: 'Raleway, sans-serif' }}>
        <strong>Address:</strong> 89, Elliot Road, Kolkata - 700016, West Bengal, India
      </Typography>
      {/* Google Map Embed */}
      <Box mb={2}>
        <iframe
          title="Janasiksha Prochar Kendra Location"
          src="https://www.google.com/maps?q=89+Elliot+Road,+Kolkata,+West+Bengal+700016,+India&output=embed"
          width="100%"
          height="220"
          style={{ border: 0, borderRadius: 8 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </Box>
      {/* Quick Links Section */}
      <Box mb={2}>
        <Typography variant="h6" sx={{ color: (theme) => theme.palette.secondary.main, fontWeight: 600, fontFamily: 'Raleway, sans-serif' }}>
          Quick Links
        </Typography>
        <Box component="ul" sx={{ pl: 2, fontFamily: 'Raleway, sans-serif' }}>
          <li><Link component="button" onClick={() => go('aboutus')} underline="hover">About Us</Link></li>
          <li><Link component="button" onClick={() => go('whatwedo')} underline="hover">What We Do</Link></li>
          <li><Link component="button" onClick={() => go('latestprojects')} underline="hover">Our Latest Projects</Link></li>
          <li><Link component="button" onClick={() => go('newsroom')} underline="hover">News Room</Link></li>
          <li><Link component="button" onClick={() => go('casehistory')} underline="hover">Case History</Link></li>
          <li><Link component="button" onClick={() => go('successstory')} underline="hover">Success Story</Link></li>
          <li><Link component="button" onClick={() => go('supportus')} underline="hover">Support Us</Link></li>
          <li><Link component="button" onClick={() => go('location')} underline="hover">Location</Link></li>
        </Box>
      </Box>
      {/* Footer note */}
      <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Raleway, sans-serif' }}>
        {/* TODO: Replace with official social links */}
        Follow us on <Link href="#" target="_blank" rel="noopener" underline="hover">Facebook</Link><br />
        Copyright © 2020 Janasiksha Prochar Kendra - All Rights Reserved.
      </Typography>
    </Box>
  );
}
