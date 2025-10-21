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
  Paper,
  Dialog,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ZoomInIcon from '@mui/icons-material/ZoomIn';

// Import actual Urban and Rural images
import { urbanImages as urbanImagesData } from '../assets/images/Urban/index.js';
import { ruralImages as ruralImagesData } from '../assets/images/Rural/index.js';

export default function Gallery() {
  const [urbanImages, setUrbanImages] = useState([]);
  const [ruralImages, setRuralImages] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [openCarousel, setOpenCarousel] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState([]);

  useEffect(() => {
    const loadImages = () => {
      try {
        setUrbanImages(urbanImagesData);
        setRuralImages(ruralImagesData);
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

  const handleImageClick = (index, images) => {
    setCurrentImageIndex(index);
    setCurrentImages(images);
    setOpenCarousel(true);
  };

  const handleCloseCarousel = () => {
    setOpenCarousel(false);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? currentImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === currentImages.length - 1 ? 0 : prev + 1));
  };

  const handleKeyPress = (event) => {
    if (event.key === 'ArrowLeft') {
      handlePrevImage();
    } else if (event.key === 'ArrowRight') {
      handleNextImage();
    } else if (event.key === 'Escape') {
      handleCloseCarousel();
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Container maxWidth="xl" sx={{ pt: { xs: 4, md: 6 }, px: { xs: 2, sm: 3, md: 4 } }}>
        <Box
          sx={{
            bgcolor: 'white',
            borderRadius: 3,
            border: '3px solid',
            borderColor: 'primary.main',
            textAlign: 'center',
            boxShadow: '0 8px 24px rgba(0, 91, 150, 0.12)',
            p: { xs: 1.5, md: 2 },
            mb: { xs: 3, md: 4 }
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              color: 'primary.main',
              fontFamily: 'Raleway, sans-serif',
              fontWeight: 800,
              mb: 2,
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            Photo Gallery
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              fontFamily: 'Raleway, sans-serif',
              fontWeight: 400,
              mb: 5,
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
              maxWidth: 800,
              mx: 'auto'
            }}
          >
            Capturing moments from our Urban and Rural initiatives
          </Typography>

          {/* Statistics */}
          <Grid container spacing={4} justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={4}>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
                p: { xs: 2, md: 3 },
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: 'rgba(0, 91, 150, 0.05)',
                  transform: 'translateY(-5px)'
                }
              }}>
                <Typography
                  variant="h2"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 900,
                    fontSize: { xs: '4rem', md: '5rem' },
                    lineHeight: 1
                  }}
                >
                  {urbanImages.length + ruralImages.length}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 600,
                    fontSize: { xs: '1.2rem', md: '1.5rem' }
                  }}
                >
                  Total Photos
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
                p: { xs: 2, md: 3 },
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: 'rgba(0, 91, 150, 0.05)',
                  transform: 'translateY(-5px)'
                }
              }}>
                <Typography
                  variant="h2"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 900,
                    fontSize: { xs: '4rem', md: '5rem' },
                    lineHeight: 1
                  }}
                >
                  {urbanImages.length}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 600,
                    fontSize: { xs: '1.2rem', md: '1.5rem' }
                  }}
                >
                  Urban Activities
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
                p: { xs: 2, md: 3 },
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: 'rgba(0, 91, 150, 0.05)',
                  transform: 'translateY(-5px)'
                }
              }}>
                <Typography
                  variant="h2"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 900,
                    fontSize: { xs: '4rem', md: '5rem' },
                    lineHeight: 1
                  }}
                >
                  {ruralImages.length}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 600,
                    fontSize: { xs: '1.2rem', md: '1.5rem' }
                  }}
                >
                  Rural Programs
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Tabs Section */}
      <Container maxWidth="xl" sx={{ px: { xs: 1, md: 3 } }}>
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
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {urbanImages.map((image, index) => (
                  <Card
                    key={index}
                    onClick={() => handleImageClick(index, urbanImages)}
                    sx={{
                      width: 'calc(25% - 12px)',
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 6,
                      },
                      '&:hover .zoom-icon': {
                        opacity: 1,
                      }
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={image}
                      alt={`Urban activity ${index + 1}`}
                      loading="lazy"
                      sx={{
                        width: '100%',
                        aspectRatio: '4/3',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
                      }}
                    />
                    <Box
                      className="zoom-icon"
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        opacity: 0,
                        transition: 'opacity 0.3s ease-in-out',
                        bgcolor: 'rgba(0, 0, 0, 0.6)',
                        borderRadius: '50%',
                        width: 60,
                        height: 60,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'none'
                      }}
                    >
                      <ZoomInIcon sx={{ color: 'white', fontSize: 36 }} />
                    </Box>
                  </Card>
                ))}
              </Box>
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
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {ruralImages.map((image, index) => (
                  <Card
                    key={index}
                    onClick={() => handleImageClick(index, ruralImages)}
                    sx={{
                      width: 'calc(25% - 12px)',
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 6,
                      },
                      '&:hover .zoom-icon': {
                        opacity: 1,
                      }
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={image}
                      alt={`Rural program ${index + 1}`}
                      loading="lazy"
                      sx={{
                        width: '100%',
                        aspectRatio: '4/3',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
                      }}
                    />
                    <Box
                      className="zoom-icon"
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        opacity: 0,
                        transition: 'opacity 0.3s ease-in-out',
                        bgcolor: 'rgba(0, 0, 0, 0.6)',
                        borderRadius: '50%',
                        width: 60,
                        height: 60,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'none'
                      }}
                    >
                      <ZoomInIcon sx={{ color: 'white', fontSize: 36 }} />
                    </Box>
                  </Card>
                ))}
              </Box>
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

      {/* Image Carousel Dialog */}
      <Dialog
        open={openCarousel}
        onClose={handleCloseCarousel}
        maxWidth={false}
        fullScreen
        onKeyDown={handleKeyPress}
        PaperProps={{
          sx: {
            bgcolor: 'rgba(0, 0, 0, 0.95)',
          }
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={handleCloseCarousel}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              color: 'white',
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.2)',
              },
              zIndex: 2,
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Previous Button */}
          <IconButton
            onClick={handlePrevImage}
            sx={{
              position: 'absolute',
              left: { xs: 8, md: 32 },
              color: 'white',
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.2)',
              },
              zIndex: 2,
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          {/* Image */}
          <Box
            component="img"
            src={currentImages[currentImageIndex]}
            alt={`Image ${currentImageIndex + 1}`}
            sx={{
              maxWidth: '90%',
              maxHeight: '90vh',
              objectFit: 'contain',
            }}
          />

          {/* Next Button */}
          <IconButton
            onClick={handleNextImage}
            sx={{
              position: 'absolute',
              right: { xs: 8, md: 32 },
              color: 'white',
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.2)',
              },
              zIndex: 2,
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>

          {/* Image Counter */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 16,
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'white',
              bgcolor: 'rgba(0, 0, 0, 0.6)',
              px: 2,
              py: 1,
              borderRadius: 2,
              fontWeight: 600,
            }}
          >
            {currentImageIndex + 1} / {currentImages.length}
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};