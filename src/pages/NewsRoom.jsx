// NewsRoom.jsx
// News Room page for the Janasiksha Prochar Kendra website.
// Displays news articles, press releases, and media coverage about the NGO.
// Follows accessible, modern, and empathetic design.

import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';

/**
 * NewsRoom page component
 * Shows news articles and media coverage about the NGO.
 * @returns {JSX.Element} The rendered News Room page
 */

const projects = [
  {
    title: 'Vocational Training for Girls',
    desc: 'Janasiksha Prochar Kendra provides vocational training in tailoring, embroidery, and computer skills to empower girls for independent livelihoods.'
  },
  {
    title: 'Health & Nutrition Program',
    desc: 'Regular health checkups, nutritious meals, and hygiene awareness sessions are conducted for all residents.'
  },
  {
    title: 'Educational Support',
    desc: 'Formal and non-formal education, tuition, and scholarships are provided to ensure every child’s right to learn.'
  },
  {
    title: 'Rehabilitation & Counseling',
    desc: 'Professional counseling and rehabilitation services help children and women recover from trauma and reintegrate into society.'
  },
  {
    title: 'Awareness Campaigns',
    desc: 'Janasiksha Prochar Kendra organizes campaigns on child rights, anti-trafficking, and women’s empowerment in the community.'
  },
];

export default function NewsRoom() {
  return (
    <Box sx={{ bgcolor: (theme) => theme.palette.background.paper, borderRadius: 3, boxShadow: 2, p: { xs: 2, md: 5 }, mb: 3, border: (theme) => `2px solid ${theme.palette.secondary.main}`, maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h3" sx={{ color: (theme) => theme.palette.primary.main, fontFamily: 'Raleway, sans-serif', fontWeight: 700, mb: 2, textAlign: 'center', textShadow: '0 2px 8px rgba(0, 91, 150, 0.12)', fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' }, lineHeight: 1.15 }}>
        News Room / Latest Projects
      </Typography>
      <Typography variant="h5" sx={{ color: (theme) => theme.palette.text.primary, fontFamily: 'Raleway, sans-serif', fontWeight: 600, mb: 3, textAlign: 'center' }}>
        Our Latest Initiatives
      </Typography>
      <Grid container spacing={3}>
        {projects.map((proj, idx) => (
          <Grid item xs={12} sm={6} key={idx}>
            <Card sx={{ bgcolor: '#fff', borderRadius: 2, boxShadow: 1, minHeight: 140 }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: (theme) => theme.palette.secondary.main, fontFamily: 'Raleway, sans-serif', fontWeight: 700, mb: 1 }}>{proj.title}</Typography>
                <Typography variant="body2" sx={{ fontFamily: 'Raleway, sans-serif', color: (theme) => theme.palette.text.primary }}>{proj.desc}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography variant="body1" sx={{ fontFamily: 'Raleway, sans-serif', color: (theme) => theme.palette.primary.main, fontWeight: 600, mt: 4, textAlign: 'center' }}>
        "Your support helps us continue these life-changing projects."
      </Typography>
    </Box>
  );
}
