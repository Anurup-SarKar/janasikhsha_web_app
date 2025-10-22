// Home.jsx
// Home page for the Janasiksha Prochar Kendra website.
// Displays a hero image carousel and introductory content about the NGO's mission and impact.
// Follows accessible, modern, and empathetic design.

import React, { useState } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ImageCarousel from '../components/ImageCarousel';
import { ngoImages } from '../assets/CarouselImages';

/**
 * Home page component
 * Shows a hero image carousel and introductory information about the NGO.
 * @returns {JSX.Element} The rendered Home page
 */
export default function Home() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const handleDonateClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
      {/* First Segment: NGO Images Carousel */}
      <Box sx={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
        <ImageCarousel images={ngoImages} />
      </Box>
      
      {/* Second Segment: About Us */}
      <Box sx={{ bgcolor: '#fff', p: { xs: 2, md: 4 }, mb: 3, mx: { xs: 1, md: 0 } }}>
        <Typography variant="h4" mb={2} sx={{ color: 'primary.main', fontFamily: 'Raleway, sans-serif', fontWeight: 700 }}>
          About Us
        </Typography>
        <Typography sx={{ fontFamily: 'Raleway, sans-serif', lineHeight: 1.7, fontSize: { xs: '1rem', md: '1.1rem' } }}>
          Janasiksha Prochar Kendra since 1969 has been working for last 56 years for the development of Rural areas especially focused on Women in difficult circumstances, Child Rights, Abandoned and Hapless Senior Citizens. Our organization mainly focused on the education, nutrition, proper care and safe shelter and awarness campaigning on various critical issues of society like child marriage, AIDS and also provided health related services throughout all over West Bengal with the collaboration with many organizations.
          It's time to need extend helpful hand towards this society.
        </Typography>
      </Box>

      {/* Third Segment: Donation Section */}
      <Box
        sx={{
          bgcolor: '#f0f8ff',
          border: '2px solid',
          borderColor: 'primary.main',
          borderRadius: 3,
          color: 'primary.main',
          py: { xs: 4, md: 7 },
          px: { xs: 2, md: 4 },
          mx: { xs: 1, md: 0 },
          textAlign: 'center',
          boxShadow: 3,
          mb: 3,
          position: 'relative',
          overflow: 'hidden',
          width: { xs: 'calc(100% - 16px)', md: '100%' },
          maxWidth: '100%',
          boxSizing: 'border-box',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontFamily: 'Raleway, sans-serif',
            color: 'primary.main',
            fontWeight: 700,
            mb: 1,
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            textShadow: '0 2px 8px rgba(0, 91, 150, 0.12)',
            letterSpacing: 1,
          }}
        >
          Support Our Mission
        </Typography>
        
        <Typography
          variant="h5"
          sx={{
            fontFamily: 'Raleway, sans-serif',
            color: 'text.primary',
            mb: 3,
            fontWeight: 500,
            fontSize: { xs: '1.25rem', md: '1.5rem' },
            letterSpacing: 0.5,
          }}
        >
          Empowering Women & Protecting Children Since 1969
        </Typography>
        
        <Typography
          variant="body1"
          sx={{
            fontFamily: 'Raleway, sans-serif',
            color: 'text.primary',
            maxWidth: 700,
            mx: 'auto',
            mb: 4,
            fontSize: { xs: '1rem', md: '1.15rem' },
            lineHeight: 1.6,
          }}
        >
          It is our earnest request to all the people of India please Donate towards under privilege, hapless society of India for their betterment of future endeavours.
        </Typography>
        
        <Button
          variant="contained"
          size="large"
          onClick={handleDonateClick}
          sx={{
            fontFamily: 'Raleway, sans-serif',
            fontWeight: 700,
            fontSize: { xs: '1rem', md: '1.15rem' },
            px: { xs: 4, md: 5 },
            py: { xs: 1.2, md: 1.5 },
            borderRadius: 3,
            boxShadow: '0 2px 12px rgba(0, 91, 150, 0.2)',
            mb: 2,
            backgroundColor: 'secondary.main',
            color: '#fff',
            '&:hover': {
              backgroundColor: 'secondary.dark',
              boxShadow: '0 4px 16px rgba(0, 91, 150, 0.3)',
            },
          }}
        >
          Donate Now
        </Button>
        
        <Typography
          variant="body1"
          sx={{
            fontFamily: 'Raleway, sans-serif',
            color: 'primary.main',
            fontWeight: 600,
            mt: 2,
            fontSize: { xs: '0.95rem', md: '1rem' },
          }}
        >
          Your contribution will provide underprivileged children and girls with a chance to learn and aspire.
        </Typography>
      </Box>

      {/* Donation Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ 
          textAlign: 'center', 
          fontFamily: 'Raleway, sans-serif',
          fontWeight: 700,
          color: 'primary.main'
        }}>
          Donation Currently Unavailable
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', py: 3 }}>
          <Typography sx={{ 
            fontFamily: 'Raleway, sans-serif',
            fontSize: '1.1rem',
            color: 'text.primary',
            mb: 2
          }}>
            We appreciate your willingness to support our cause!
          </Typography>
          <Typography sx={{ 
            fontFamily: 'Raleway, sans-serif',
            color: 'text.secondary'
          }}>
            Our online donation system is currently under maintenance. Please contact us directly for donation information.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button 
            onClick={handleCloseDialog}
            variant="contained"
            sx={{
              fontFamily: 'Raleway, sans-serif',
              fontWeight: 600,
              backgroundColor: 'secondary.main',
              '&:hover': {
                backgroundColor: 'secondary.dark',
              }
            }}
          >
            Understood
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
