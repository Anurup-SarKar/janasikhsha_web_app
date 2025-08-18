// OurTeam.jsx
// Our Team page
import React from 'react';
import { Box, Typography, Grid, Avatar } from '@mui/material';

const teamMembers = [
  { name: 'Mrs. Shukla Banerjee', role: 'President', img: null },
  { name: 'Mrs. Rina Banerjee', role: 'Vice President', img: null },
  { name: 'Mrs. Sarmila Basu', role: 'Secretary', img: null },
  { name: 'Mrs. Sarmila Basu', role: 'Superintendent', img: null },
  { name: 'Mrs. Sarmila Basu', role: 'Project Director', img: null },
  { name: 'Mrs. Sarmila Basu', role: 'Child Welfare Officer', img: null },
  { name: 'Mrs. Sarmila Basu', role: 'Probation Officer', img: null },
  { name: 'Mrs. Sarmila Basu', role: 'Counsellor', img: null },
  { name: 'Mrs. Sarmila Basu', role: 'House Mother', img: null },
  { name: 'Mrs. Sarmila Basu', role: 'House Father', img: null },
  { name: 'Mrs. Sarmila Basu', role: 'House Attendant', img: null },
  { name: 'Mrs. Sarmila Basu', role: 'Cook', img: null },
  { name: 'Mrs. Sarmila Basu', role: 'Sweeper', img: null },
  { name: 'Mrs. Sarmila Basu', role: 'Watchman', img: null },
];

export default function OurTeam() {
  return (
    <Box sx={{ bgcolor: (theme) => theme.palette.background.paper, borderRadius: 3, boxShadow: 2, p: { xs: 2, md: 5 }, mb: 3, border: (theme) => `2px solid ${theme.palette.secondary.main}`, maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h3" sx={{ color: (theme) => theme.palette.primary.main, fontFamily: 'Raleway, sans-serif', fontWeight: 700, mb: 2, textAlign: 'center', textShadow: '0 2px 8px rgba(0, 91, 150, 0.12)', fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' }, lineHeight: 1.15 }}>
        Our Team
      </Typography>
      <Typography variant="h5" sx={{ color: (theme) => theme.palette.text.primary, fontFamily: 'Raleway, sans-serif', fontWeight: 600, mb: 3, textAlign: 'center' }}>
        Meet the dedicated team behind Janasiksha Prochar Kendra
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {teamMembers.map((member, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: '#fff', borderRadius: 2, boxShadow: 1, p: 2, minHeight: 160 }}>
              <Avatar sx={{ width: 64, height: 64, mb: 1, bgcolor: (theme) => theme.palette.secondary.main, color: '#fff', fontFamily: 'Raleway, sans-serif', fontWeight: 700 }}>
                {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </Avatar>
              <Typography variant="subtitle1" sx={{ fontFamily: 'Raleway, sans-serif', color: (theme) => theme.palette.primary.main, fontWeight: 700, textAlign: 'center' }}>{member.name}</Typography>
              <Typography variant="body2" sx={{ fontFamily: 'Raleway, sans-serif', color: (theme) => theme.palette.text.primary, textAlign: 'center', opacity: 0.8 }}>{member.role}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Typography variant="body1" sx={{ fontFamily: 'Raleway, sans-serif', color: (theme) => theme.palette.primary.main, fontWeight: 600, mt: 4, textAlign: 'center' }}>
        "Together, we strive to create a safe and empowering environment for every girl and woman in our care."
      </Typography>
    </Box>
  );
}
