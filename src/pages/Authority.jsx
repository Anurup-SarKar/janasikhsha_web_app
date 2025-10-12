// Authority.jsx
// Authority & Registration page for the Janasiksha Prochar Kendra website.
// Displays official authority and registration information of the organization.
// Follows accessible, modern, and empathetic design.

import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Container,
  Button,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import VerifiedIcon from '@mui/icons-material/Verified';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import GavelIcon from '@mui/icons-material/Gavel';
import SecurityIcon from '@mui/icons-material/Security';
import BusinessIcon from '@mui/icons-material/Business';
import CertificateIcon from '@mui/icons-material/Assignment';

// Import Authority document
import AuthorityDocument from '../assets/documents/Authority.pdf';

const AuthorityCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease-in-out',
  borderRadius: 16,
  boxShadow: '0 4px 20px rgba(0, 91, 150, 0.1)',
  border: `2px solid ${theme.palette.primary.light}20`,
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 30px rgba(0, 91, 150, 0.15)',
  },
}));

const DocumentCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  borderRadius: 16,
  background: `linear-gradient(135deg, ${theme.palette.primary.main}08, ${theme.palette.secondary.main}08)`,
  border: `2px solid ${theme.palette.primary.light}30`,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(0, 91, 150, 0.12)',
  },
}));

const registrationDetails = [
  {
    icon: <AccountBalanceIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: "Legal Registration",
    description: "Registered under the Societies Registration Act and Income Tax Act"
  },
  {
    icon: <GavelIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
    title: "Government Recognition",
    description: "Recognized by Government of India and West Bengal Government"
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: "FCRA Compliance",
    description: "Foreign Contribution Regulation Act compliant organization"
  },
  {
    icon: <BusinessIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
    title: "NGO Status",
    description: "Certified Non-Governmental Organization with valid credentials"
  }
];

const authorizationAreas = [
  "Child Protection and Welfare Services",
  "Women Empowerment and Rehabilitation Programs",
  "Senior Citizens Care and Support Services",
  "Educational Development and Literacy Programs",
  "Healthcare and Medical Support Services",
  "Vocational Training and Skill Development",
  "Community Development and Awareness Programs",
  "Social Welfare and Rehabilitation Services"
];

/**
 * Authority page component
 * Displays authority and registration information of the organization
 * @returns {JSX.Element} The rendered Authority page
 */
export default function Authority() {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = AuthorityDocument;
    link.download = 'Authority_Document_Janasiksha_Prochar_Kendra.pdf';
    link.click();
  };

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, sm: 3, md: 4 } }}>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
        <Typography 
          variant="h2" 
          sx={{ 
            color: 'primary.main', 
            fontFamily: 'Raleway, sans-serif', 
            fontWeight: 900,
            mb: 2,
            fontSize: { xs: '2.5rem', md: '3.5rem' }
          }}
        >
          Authority & Registration
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            color: 'text.secondary', 
            fontFamily: 'Raleway, sans-serif',
            maxWidth: 800,
            mx: 'auto',
            lineHeight: 1.6,
            fontWeight: 400
          }}
        >
          Official authority and registration documents of Janasiksha Prochar Kendra, 
          establishing our legal status and authorization to operate as a non-governmental organization.
        </Typography>
        <Divider sx={{ mt: 3, mb: 4, width: 100, mx: 'auto', height: 3, bgcolor: 'secondary.main' }} />
      </Box>

      {/* Document Download Section */}
      <Box sx={{ mb: 6 }}>
        <DocumentCard elevation={0}>
          <PictureAsPdfIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography 
            variant="h4" 
            sx={{ 
              color: 'primary.main', 
              fontFamily: 'Raleway, sans-serif',
              fontWeight: 700,
              mb: 2
            }}
          >
            Authority Document
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'text.secondary',
              fontFamily: 'Raleway, sans-serif',
              mb: 3
            }}
          >
            Download the official authority and registration document containing 
            legal status, certifications, and authorization details.
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<DownloadIcon />}
            onClick={handleDownload}
            sx={{
              borderRadius: 3,
              py: 1.5,
              px: 4,
              fontSize: '1.1rem',
              fontWeight: 600,
              textTransform: 'none',
              fontFamily: 'Raleway, sans-serif'
            }}
          >
            Download Authority Document
          </Button>
        </DocumentCard>
      </Box>

      {/* Registration Details */}
      <Box sx={{ mb: 6 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            color: 'primary.main', 
            fontFamily: 'Raleway, sans-serif', 
            fontWeight: 700,
            mb: 4,
            textAlign: 'center',
            fontSize: { xs: '1.8rem', md: '2.2rem' }
          }}
        >
          Registration & Recognition
        </Typography>
        <Grid container spacing={4}>
          {registrationDetails.map((detail, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <AuthorityCard>
                <CardContent sx={{ 
                  p: 3, 
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: '100%'
                }}>
                  <Box sx={{ mb: 2 }}>
                    {detail.icon}
                  </Box>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: 'primary.main',
                      fontFamily: 'Raleway, sans-serif',
                      fontWeight: 700,
                      mb: 1.5,
                      textAlign: 'center'
                    }}
                  >
                    {detail.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'text.secondary',
                      fontFamily: 'Raleway, sans-serif',
                      lineHeight: 1.5,
                      textAlign: 'center'
                    }}
                  >
                    {detail.description}
                  </Typography>
                </CardContent>
              </AuthorityCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Authorization Areas */}
      <Box sx={{ mb: 6 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            color: 'primary.main', 
            fontFamily: 'Raleway, sans-serif', 
            fontWeight: 700,
            mb: 4,
            textAlign: 'center',
            fontSize: { xs: '1.8rem', md: '2.2rem' }
          }}
        >
          Areas of Authorization
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8} mx="auto">
            <AuthorityCard>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <VerifiedIcon sx={{ fontSize: 50, color: 'secondary.main', mb: 2 }} />
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      color: 'primary.main',
                      fontFamily: 'Raleway, sans-serif',
                      fontWeight: 700,
                      mb: 2
                    }}
                  >
                    Authorized Service Areas
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: 'text.secondary',
                      fontFamily: 'Raleway, sans-serif',
                      mb: 3
                    }}
                  >
                    Janasiksha Prochar Kendra is officially authorized to operate in the following areas:
                  </Typography>
                </Box>
                <List>
                  {authorizationAreas.map((area, index) => (
                    <ListItem key={index} sx={{ py: 0.5 }}>
                      <ListItemIcon>
                        <CertificateIcon sx={{ color: 'primary.main' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={area}
                        primaryTypographyProps={{
                          fontFamily: 'Raleway, sans-serif',
                          fontSize: '1rem',
                          color: 'text.primary'
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </AuthorityCard>
          </Grid>
        </Grid>
      </Box>

      {/* Footer Note */}
      <Box sx={{ mt: 6, p: 4, bgcolor: 'primary.main', borderRadius: 2, textAlign: 'center' }}>
        <Typography 
          variant="h5" 
          sx={{ 
            color: 'white', 
            fontFamily: 'Raleway, sans-serif',
            fontWeight: 700,
            mb: 2
          }}
        >
          Legally Authorized & Government Recognized
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: 'rgba(255,255,255,0.9)', 
            fontFamily: 'Raleway, sans-serif',
            mb: 1
          }}
        >
          Operating since 1991 with full legal compliance and government recognition
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'rgba(255,255,255,0.8)', 
            fontFamily: 'Raleway, sans-serif'
          }}
        >
          All programs are implemented in partnership with Government of India and West Bengal Government
        </Typography>
      </Box>
    </Container>
  );
}