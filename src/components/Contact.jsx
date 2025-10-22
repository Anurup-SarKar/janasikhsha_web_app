// Contact.jsx
// Contact information page for the Janasiksha Prochar Kendra website.
// Displays email, phone, address, map, and quick links for the NGO.
// Follows accessible, modern, and empathetic design.

import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

/**
 * Contact page component.
 * Shows the NGO's contact details, key contact persons, office locations, and Google map.
 * @returns {JSX.Element} The rendered Contact page.
 */
export default function Contact() {
  return (
    <Box sx={{ bgcolor: (theme) => theme.palette.background.paper, borderRadius: 3, boxShadow: 2, p: { xs: 2, md: 4 }, mb: 3 }}>
      {/* Contact header */}
      <Typography variant="h2" mb={3} sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, color: (theme) => theme.palette.primary.main, fontWeight: 800, fontFamily: 'Raleway, sans-serif',textAlign: 'center' }}>
        Contact Us
      </Typography>
      {/* Key Contact Persons & Email */}
      <Box mb={3} sx={{ bgcolor: '#fff3e0', p: 3, borderRadius: 2, border: '2px solid #ffb74d' }}>
        <Typography variant="h6" sx={{ color: (theme) => theme.palette.primary.main, fontWeight: 700, fontFamily: 'Raleway, sans-serif', mb: 2 }}>
          Key Contact Persons & Email
        </Typography>
        
        {/* Contact Persons */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 2, md: 4 }, mb: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600, mb: 1, color: (theme) => theme.palette.secondary.main }}>
              <strong>Mr. Asim Mukherjee</strong><br />
              <span style={{ fontSize: '0.9rem', fontWeight: 400 }}>Secretary</span>
            </Typography>
            <Typography sx={{ fontFamily: 'Raleway, sans-serif' }}>
              <strong>Mobile:</strong> <Link href="tel:+919007728441" underline="hover" sx={{ color: (theme) => theme.palette.primary.main, fontFamily: 'Raleway, sans-serif', fontWeight: 500 }}>+91 9007728441</Link>
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600, mb: 1, color: (theme) => theme.palette.secondary.main }}>
              <strong>Mr. Avishek Mukherjee</strong><br />
              <span style={{ fontSize: '0.9rem', fontWeight: 400 }}>Executive Director</span>
            </Typography>
            <Typography sx={{ fontFamily: 'Raleway, sans-serif' }}>
              <strong>Mobile:</strong> <Link href="tel:+918697001939/8240016399" underline="hover" sx={{ color: (theme) => theme.palette.primary.main, fontFamily: 'Raleway, sans-serif', fontWeight: 500 }}>+91 8697001939/8240016399</Link>
            </Typography>
          </Box>
        </Box>

        {/* Email Addresses */}
        <Box sx={{ borderTop: '1px solid #ffcc80', pt: 2 }}>
          <Typography sx={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600, mb: 1, color: (theme) => theme.palette.primary.main }}>
            Email Addresses:
          </Typography>
          <Typography sx={{ fontFamily: 'Raleway, sans-serif' }}>
            <strong>Primary:</strong> <Link href="mailto:jpk.kolkata@gmail.com" underline="hover" sx={{ color: (theme) => theme.palette.primary.main, fontFamily: 'Raleway, sans-serif', fontWeight: 500 }}>jpk.kolkata@gmail.com</Link><br />
          </Typography>
        </Box>
      </Box>
      
    
     {/* City Office */}
      <Box mb={3} sx={{ bgcolor: '#f0f7ff', p: 2, borderRadius: 2, border: '1px solid #e3f2fd' }}>
        <Typography variant="h6" sx={{ color: (theme) => theme.palette.primary.main, fontWeight: 600, fontFamily: 'Raleway, sans-serif', mb: 1 }}>
          Head Office
        </Typography>
        <Typography sx={{ fontFamily: 'Raleway, sans-serif', mb: 1 }}>
          Block-CK, Plot-6, Sector-II, Salt Lake City<br />
          P.S:-Bidhannagar (East), Dist:-North(24) Parganas, Kolkata, WB, India, PIN-700091
        </Typography>
        <Typography sx={{ fontFamily: 'Raleway, sans-serif', mb: 2 }}>
          <strong>Mob : </strong> <Link href="tel:+917980320462" underline="hover" sx={{ color: (theme) => theme.palette.primary.main, fontFamily: 'Raleway, sans-serif', fontWeight: 500 }}>+91-7980320462</Link><br />
          <strong>Email : </strong> <Link href="mailto:jpk.saltlake91@gmail.com" underline="hover" sx={{ color: (theme) => theme.palette.primary.main, fontFamily: 'Raleway, sans-serif', fontWeight: 500 }}>jpk.saltlake91@gmail.com</Link>
        </Typography>
        {/* Map for City Office */}
        <Box sx={{ mt: 2 }}>
          <iframe
            title="City Office - Salt Lake City, Kolkata"
            src="https://www.google.com/maps?q=Block+CK+Plot+6+Sector+2+Salt+Lake+City+Bidhannagar+Kolkata+West+Bengal+700091+India&output=embed"
            width="100%"
            height="250"
            style={{ border: 0, borderRadius: 8 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Box>
      </Box>

      {/* Rural Field Office */}
      <Box mb={3} sx={{ bgcolor: '#f0fff4', p: 2, borderRadius: 2, border: '1px solid #e8f5e8' }}>
        <Typography variant="h6" sx={{ color: (theme) => theme.palette.primary.main, fontWeight: 600, fontFamily: 'Raleway, sans-serif', mb: 1 }}>
          Rural Field Office
        </Typography>
        <Typography sx={{ fontFamily: 'Raleway, sans-serif', mb: 1 }}>
          P.O. & Vill: Baganda<br />
          P.S:-Jangipara, Sub Division:-Srirampore, District:-Hooghly,WB, India, PIN- 712404<br />
        </Typography>
        <Typography sx={{ fontFamily: 'Raleway, sans-serif', mb: 2 }}>
          <strong>Mob : </strong> <Link href="tel:+919883014760" underline="hover" sx={{ color: (theme) => theme.palette.primary.main, fontFamily: 'Raleway, sans-serif', fontWeight: 500 }}>+91-9883014760</Link><br />
        <strong>Email : </strong> <Link href="mailto:jpk.baganda2019@gmail.com" underline="hover" sx={{ color: (theme) => theme.palette.primary.main, fontFamily: 'Raleway, sans-serif', fontWeight: 500 }}>jpk.baganda2019@gmail.com</Link>
        </Typography>
        {/* Map for Rural Field Office */}
        <Box sx={{ mt: 2 }}>
          <iframe
            title="Rural Field Office - Baganda, Jangipara, Hooghly"
src="https://www.google.com/maps?q=Baganda+Village+Jangipara+Hooghly+West+Bengal+712404+India&output=embed"
            width="100%"
            height="250"
            style={{ border: 0, borderRadius: 8 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Box>
      </Box>

      {/* Footer note */}
      <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Raleway, sans-serif' }}>
        Follow us on <Link href="https://www.facebook.com/share/19tNrUoq1o/" target="_blank" rel="noopener noreferrer" underline="hover">Facebook</Link><br />
        Copyright © 2020 Janasiksha Prochar Kendra - All Rights Reserved.
      </Typography>
    </Box>
  );
}