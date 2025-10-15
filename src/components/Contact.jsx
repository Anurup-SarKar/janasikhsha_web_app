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
      <Typography variant="h4" mb={2} sx={{ color: (theme) => theme.palette.primary.main, fontWeight: 700, fontFamily: 'Raleway, sans-serif' }}>
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
              <strong>Mobile:</strong> <Link href="tel:+918697001939" underline="hover" sx={{ color: (theme) => theme.palette.primary.main, fontFamily: 'Raleway, sans-serif', fontWeight: 500 }}>+91 8697001939</Link>
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
            <strong>Alternative:</strong> <Link href="mailto:rpm@vsnl.net" underline="hover" sx={{ color: (theme) => theme.palette.primary.main, fontFamily: 'Raleway, sans-serif', fontWeight: 500 }}>rpm@vsnl.net</Link>
          </Typography>
        </Box>
      </Box>
      
      {/* Registered Office */}
      <Box mb={3} sx={{ bgcolor: '#f8f9fa', p: 2, borderRadius: 2, border: '1px solid #e0e0e0' }}>
        <Typography variant="h6" sx={{ color: (theme) => theme.palette.primary.main, fontWeight: 600, fontFamily: 'Raleway, sans-serif', mb: 1 }}>
          Registered Office
        </Typography>
        <Typography sx={{ fontFamily: 'Raleway, sans-serif', mb: 1 }}>
          57-B, College Street,<br />
          Kolkata 700073<br />
          West Bengal, India
        </Typography>
        <Typography sx={{ fontFamily: 'Raleway, sans-serif', mb: 2 }}>
          <strong>Tel:</strong> <Link href="tel:+913322413324" underline="hover" sx={{ color: (theme) => theme.palette.primary.main, fontFamily: 'Raleway, sans-serif', fontWeight: 500 }}>+91-(033) 2241-3324</Link> / <Link href="tel:+913322571408" underline="hover" sx={{ color: (theme) => theme.palette.primary.main, fontFamily: 'Raleway, sans-serif', fontWeight: 500 }}>2257-1408</Link><br />
          <strong>Fax:</strong> +91-(033) 2241-3324
        </Typography>
        {/* Map for Registered Office */}
        <Box sx={{ mt: 2 }}>
          <iframe
            title="Registered Office - College Street, Kolkata"
            src="https://www.google.com/maps?q=57-B+College+Street,+Kolkata+700073,+West+Bengal,+India&output=embed"
            width="100%"
            height="200"
            style={{ border: 0, borderRadius: 8 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </Box>
      </Box>

      {/* City Office */}
      <Box mb={3} sx={{ bgcolor: '#f0f7ff', p: 2, borderRadius: 2, border: '1px solid #e3f2fd' }}>
        <Typography variant="h6" sx={{ color: (theme) => theme.palette.primary.main, fontWeight: 600, fontFamily: 'Raleway, sans-serif', mb: 1 }}>
          City Office
        </Typography>
        <Typography sx={{ fontFamily: 'Raleway, sans-serif', mb: 1 }}>
          CK – 6, Sector – II<br />
          Salt Lake City<br />
          Kolkata 700064<br />
          West Bengal, India
        </Typography>
        <Typography sx={{ fontFamily: 'Raleway, sans-serif', mb: 2 }}>
          <strong>Phone:</strong> <Link href="tel:+913323597259" underline="hover" sx={{ color: (theme) => theme.palette.primary.main, fontFamily: 'Raleway, sans-serif', fontWeight: 500 }}>+91-033-2359 7259</Link>
        </Typography>
        {/* Map for City Office */}
        <Box sx={{ mt: 2 }}>
          <iframe
            title="City Office - Salt Lake City, Kolkata"
            src="https://www.google.com/maps?q=CK-6+Sector-II+Salt+Lake+City+Kolkata+700064+West+Bengal+India&output=embed"
            width="100%"
            height="200"
            style={{ border: 0, borderRadius: 8 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </Box>
      </Box>

      {/* Rural Field Station */}
      <Box mb={3} sx={{ bgcolor: '#f0fff4', p: 2, borderRadius: 2, border: '1px solid #e8f5e8' }}>
        <Typography variant="h6" sx={{ color: (theme) => theme.palette.primary.main, fontWeight: 600, fontFamily: 'Raleway, sans-serif', mb: 1 }}>
          Rural Field Station
        </Typography>
        <Typography sx={{ fontFamily: 'Raleway, sans-serif', mb: 1 }}>
          P.O. & Vill: Baganda<br />
          Via: Jangipara<br />
          Dist: Hooghly<br />
          West Bengal, India
        </Typography>
        <Typography sx={{ fontFamily: 'Raleway, sans-serif', mb: 2 }}>
          <strong>Phone:</strong> <Link href="tel:+913212227263" underline="hover" sx={{ color: (theme) => theme.palette.primary.main, fontFamily: 'Raleway, sans-serif', fontWeight: 500 }}>+91-03212-27263</Link>
        </Typography>
        {/* Map for Rural Field Station */}
        <Box sx={{ mt: 2 }}>
          <iframe
            title="Rural Field Station - Baganda, Jangipara, Hooghly"
            src="https://www.google.com/maps?q=Baganda+Jangipara+Hooghly+West+Bengal+India&output=embed"
            width="100%"
            height="200"
            style={{ border: 0, borderRadius: 8 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
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
