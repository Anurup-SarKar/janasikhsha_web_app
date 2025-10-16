import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  Tabs,
  Tab,
  Paper
} from '@mui/material';

// Import actual Urban and Rural images
import { urbanImages } from '../assets/images/Urban/index.js';
import { ruralImages } from '../assets/images/Rural/index.js';

// Function to get Urban images
const getUrbanImages = () => {
  return urbanImages;
};

// Function to get Rural images  
const getRuralImages = () => {
  return ruralImages;
};

export default function Gallery() {
  const [urbanImages, setUrbanImages] = useState([]);
  const [ruralImages, setRuralImages] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = () => {
      try {
        setUrbanImages(getUrbanImages());
        setRuralImages(getRuralImages());
      } catch (error) {
        console.error('Error loading images:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadImages();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 4, md: 8 },
          textAlign: 'center'
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
            }}
          >
            Photo Gallery
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 400,
              opacity: 0.9,
              mb: 4,
              fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' }
            }}
          >
            Capturing moments from our Urban and Rural initiatives
          </Typography>
          
          {/* Statistics */}
          <Grid container spacing={{ xs: 2, md: 4 }} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={4}>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 800,
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' }
                }}
              >
                {urbanImages.length + ruralImages.length}
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  opacity: 0.9,
                  fontSize: { xs: '0.875rem', md: '1rem' }
                }}
              >
                Total Photos
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 800,
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' }
                }}
              >
                {urbanImages.length}
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  opacity: 0.9,
                  fontSize: { xs: '0.875rem', md: '1rem' }
                }}
              >
                Urban Activities
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 800,
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' }
                }}
              >
                {ruralImages.length}
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  opacity: 0.9,
                  fontSize: { xs: '0.875rem', md: '1rem' }
                }}
              >
                Rural Programs
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Tabs Section */}
      <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 }, px: { xs: 1, md: 3 } }}>
        <Paper elevation={2} sx={{ mb: { xs: 2, md: 4 } }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            centered
            variant={window.innerWidth < 600 ? "fullWidth" : "standard"}
            sx={{ 
              '& .MuiTab-root': { 
                fontSize: { xs: '0.9rem', md: '1.1rem' }, 
                fontWeight: 600,
                textTransform: 'none',
                minWidth: { xs: 120, md: 200 }
              }
            }}
          >
            <Tab label="Urban Activities" />
            <Tab label="Rural Programs" />
          </Tabs>
        </Paper>

        {/* Urban Activities Tab */}
        {tabValue === 0 && (
          <Box>
            <Typography 
              variant="h4" 
              component="h2" 
              gutterBottom
              align="center"
              sx={{ 
                fontWeight: 700,
                mb: 2,
                color: 'text.primary'
              }}
            >
              Urban Activities
            </Typography>
            <Typography 
              variant="body1" 
              align="center"
              sx={{ 
                mb: 4,
                color: 'text.secondary',
                maxWidth: 600,
                mx: 'auto'
              }}
            >
              24 curated moments from our urban development programs and community initiatives
            </Typography>
            
            {urbanImages.length > 0 ? (
              <Grid container spacing={3}>
                {urbanImages.map((image, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <Card
                      sx={{
                        height: '100%',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: 6,
                        }
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="280"
                        image={image}
                        alt={`Urban activity ${index + 1}`}
                        loading="lazy"
                        sx={{ 
                          objectFit: 'cover',
                          cursor: 'pointer'
                        }}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/280x280?text=Image+Not+Available';
                        }}
                      />
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" color="text.secondary">
                  No urban images available
                </Typography>
              </Box>
            )}
          </Box>
        )}

        {/* Rural Programs Tab */}
        {tabValue === 1 && (
          <Box>
            <Typography 
              variant="h4" 
              component="h2" 
              gutterBottom
              align="center"
              sx={{ 
                fontWeight: 700,
                mb: 2,
                color: 'text.primary'
              }}
            >
              Rural Programs
            </Typography>
            <Typography 
              variant="body1" 
              align="center"
              sx={{ 
                mb: 4,
                color: 'text.secondary',
                maxWidth: 600,
                mx: 'auto'
              }}
            >
              24 beautiful moments celebrating festivals, sports events, health camps, and community programs in rural areas
            </Typography>
            
            {ruralImages.length > 0 ? (
              <Grid container spacing={3}>
                {ruralImages.map((image, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <Card
                      sx={{
                        height: '100%',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: 6,
                        }
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="280"
                        image={image}
                        alt={`Rural program ${index + 1}`}
                        loading="lazy"
                        sx={{ 
                          objectFit: 'cover',
                          cursor: 'pointer'
                        }}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/280x280?text=Image+Not+Available';
                        }}
                      />
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" color="text.secondary">
                  No rural images available
                </Typography>
              </Box>
            )}
          </Box>
        )}

        {/* Loading state */}
        {loading && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              Loading gallery images...
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};