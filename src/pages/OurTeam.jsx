// OurTeam.jsx
// Our Team page
import React from 'react';
import { Box, Typography, Grid, Avatar } from '@mui/material';

// Import member profile pictures
import Member1 from '../assets/images/Members/1.jpg';
import Member2 from '../assets/images/Members/2.jpg';
import Member3 from '../assets/images/Members/3.jpg';
import Member4 from '../assets/images/Members/4.jpg';
import Member5 from '../assets/images/Members/5.jpg';
import Member6 from '../assets/images/Members/6.jpg';
import Member7 from '../assets/images/Members/7.jpg';

const teamMembers = [
  { name: 'Mr. Amiyo Kumar Chakraborty', role: 'President', img: Member1 },
  { name: 'Mr. Prof.(Dr) Partha Basu', role: 'Vice President', img: Member2 },
  { name: 'Mr. Asim Mukherjee', role: 'Secretary', img: Member3 },
  { name: 'Mr. Pradip Das', role: 'Treasurer', img: Member4 },
  { name: 'Mrs. Aparna Roy', role: 'Member', img: Member5 },
  { name: 'Mrs. Rita Ray(Saha)', role: 'Accounts Officer', img: Member6 },
  { name: 'Mr. Avisekh Mukherjee', role: 'Executive Director', img: Member7 },
];

export default function OurTeam() {
  return (
    <Box sx={{ bgcolor: (theme) => theme.palette.background.paper, borderRadius: 3, boxShadow: 2, p: { xs: 2, md: 5 }, mb: 3, border: (theme) => `2px solid ${theme.palette.secondary.main}`, maxWidth: 900, mx: 'auto' }}>
      <Typography 
        variant="h2" 
        component="h1" 
        sx={{ 
          fontSize: { xs: '2.5rem', md: '3.5rem' }, 
          color: (theme) => theme.palette.primary.main, 
          fontFamily: 'Raleway, sans-serif', 
          fontWeight: 800, 
          mb: 3, 
          textAlign: 'center', 
          textShadow: '0 2px 8px rgba(0, 91, 150, 0.12)' 
        }}
      >
       Authority of Organization
      </Typography>
      <Typography variant="h5" sx={{ color: (theme) => theme.palette.text.secondary, fontFamily: 'Raleway, sans-serif', fontWeight: 600, mb: 4, textAlign: 'center' }}>
        Meet the dedicated team behind Janasiksha Prochar Kendra
      </Typography>

      {/* Row 1: First 3 Members */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3} justifyContent="center">
          {teamMembers.slice(0, 3).map((member, idx) => (
            <Grid item xs={12} sm={4} md={4} key={idx}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                bgcolor: '#fff', 
                borderRadius: 2, 
                boxShadow: 1, 
                p: 2.5, 
                height: 240,
                width: 200,
                mx: 'auto',
                border: '1px solid',
                borderColor: 'secondary.light',
                '&:hover': {
                  boxShadow: 3,
                  transform: 'translateY(-2px)',
                  transition: 'all 0.3s ease'
                }
              }}>
                <Avatar 
                  src={member.img}
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    mb: 1.5, 
                    bgcolor: (theme) => theme.palette.secondary.main, 
                    color: '#fff', 
                    fontFamily: 'Raleway, sans-serif', 
                    fontWeight: 700,
                    fontSize: '1.4rem'
                  }}
                >
                  {!member.img && member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </Avatar>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    fontFamily: 'Raleway, sans-serif', 
                    color: (theme) => theme.palette.primary.main, 
                    fontWeight: 700, 
                    textAlign: 'center',
                    mb: 1,
                    height: '2.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.9rem',
                    lineHeight: 1.2
                  }}
                >
                  {member.name}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontFamily: 'Raleway, sans-serif', 
                    color: (theme) => theme.palette.text.primary, 
                    textAlign: 'center', 
                    opacity: 0.8,
                    fontWeight: 600,
                    backgroundColor: (theme) => theme.palette.secondary.light,
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.8rem'
                  }}
                >
                  {member.role}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Row 2: Next 3 Members */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3} justifyContent="center">
          {teamMembers.slice(3, 6).map((member, idx) => (
            <Grid item xs={12} sm={4} md={4} key={idx + 3}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                bgcolor: '#fff', 
                borderRadius: 2, 
                boxShadow: 1, 
                p: 2.5, 
                height: 240,
                width: 200,
                mx: 'auto',
                border: '1px solid',
                borderColor: 'secondary.light',
                '&:hover': {
                  boxShadow: 3,
                  transform: 'translateY(-2px)',
                  transition: 'all 0.3s ease'
                }
              }}>
                <Avatar 
                  src={member.img}
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    mb: 1.5, 
                    bgcolor: (theme) => theme.palette.secondary.main, 
                    color: '#fff', 
                    fontFamily: 'Raleway, sans-serif', 
                    fontWeight: 700,
                    fontSize: '1.4rem'
                  }}
                >
                  {!member.img && member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </Avatar>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    fontFamily: 'Raleway, sans-serif', 
                    color: (theme) => theme.palette.primary.main, 
                    fontWeight: 700, 
                    textAlign: 'center',
                    mb: 1,
                    height: '2.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.9rem',
                    lineHeight: 1.2
                  }}
                >
                  {member.name}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontFamily: 'Raleway, sans-serif', 
                    color: (theme) => theme.palette.text.primary, 
                    textAlign: 'center', 
                    opacity: 0.8,
                    fontWeight: 600,
                    backgroundColor: (theme) => theme.palette.secondary.light,
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.8rem'
                  }}
                >
                  {member.role}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Row 3: Last Member (Centered) */}
      <Box>
        <Grid container spacing={3} justifyContent="center">
          {teamMembers.slice(6, 7).map((member, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx + 6}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                bgcolor: '#fff', 
                borderRadius: 2, 
                boxShadow: 1, 
                p: 2.5, 
                height: 240,
                width: 200,
                mx: 'auto',
                border: '1px solid',
                borderColor: 'secondary.light',
                '&:hover': {
                  boxShadow: 3,
                  transform: 'translateY(-2px)',
                  transition: 'all 0.3s ease'
                }
              }}>
                <Avatar 
                  src={member.img}
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    mb: 1.5, 
                    bgcolor: (theme) => theme.palette.secondary.main, 
                    color: '#fff', 
                    fontFamily: 'Raleway, sans-serif', 
                    fontWeight: 700,
                    fontSize: '1.4rem'
                  }}
                >
                  {!member.img && member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </Avatar>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    fontFamily: 'Raleway, sans-serif', 
                    color: (theme) => theme.palette.primary.main, 
                    fontWeight: 700, 
                    textAlign: 'center',
                    mb: 1,
                    height: '2.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.9rem',
                    lineHeight: 1.2
                  }}
                >
                  {member.name}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontFamily: 'Raleway, sans-serif', 
                    color: (theme) => theme.palette.text.primary, 
                    textAlign: 'center', 
                    opacity: 0.8,
                    fontWeight: 600,
                    backgroundColor: (theme) => theme.palette.secondary.light,
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.8rem'
                  }}
                >
                  {member.role}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Typography variant="body1" sx={{ fontFamily: 'Raleway, sans-serif', color: (theme) => theme.palette.primary.main, fontWeight: 600, mt: 4, textAlign: 'center' }}>
        "Together, we strive to create a safe and empowering environment for every girl and woman in our care."
      </Typography>
    </Box>
  );
}
