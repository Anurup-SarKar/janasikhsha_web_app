// History.jsx
// Organization History page for the Janasiksha Prochar Kendra website.
// Showcases the organization's history, milestones, and journey based on the historical document.
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
  Chip,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import HistoryIcon from '@mui/icons-material/History';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import StarIcon from '@mui/icons-material/Star';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// Import PDF file
import HistoryPDF from '../assets/documents/JANASIKSHA PROCHAR KENDRA _Brief History_ CURRENTLY FINAl - 2012.pdf';

// PDF file path
const historyPDFPath = HistoryPDF;

const HistoryCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease-in-out',
  borderRadius: 16,
  boxShadow: '0 4px 20px rgba(0, 91, 150, 0.1)',
  border: `2px solid ${theme.palette.primary.light}20`,
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(0, 91, 150, 0.2)',
  },
}));

const TimelineCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 12,
  background: `linear-gradient(135deg, ${theme.palette.primary.main}05, ${theme.palette.secondary.main}05)`,
  border: `1px solid ${theme.palette.primary.light}30`,
}));

const milestones = [
  {
    year: '2012',
    title: 'Foundation Established',
    description: 'Janasiksha Prochar Kendra was established with a vision to serve vulnerable communities.',
    icon: <StarIcon sx={{ color: 'primary.main' }} />
  },
  {
    year: '2013-2015',
    title: 'Initial Programs Launch',
    description: 'Started child protection and women empowerment programs with government support.',
    icon: <GroupIcon sx={{ color: 'secondary.main' }} />
  },
  {
    year: '2016-2018',
    title: 'Expansion Phase',
    description: 'Expanded services to include elderly care and vocational training programs.',
    icon: <HomeIcon sx={{ color: 'primary.main' }} />
  },
  {
    year: '2019-2021',
    title: 'Enhanced Services',
    description: 'Added healthcare services, ICDS programs, and community library initiatives.',
    icon: <HealthAndSafetyIcon sx={{ color: 'secondary.main' }} />
  },
  {
    year: '2022-Present',
    title: 'Current Operations',
    description: 'Operating 9 major programs serving 500+ beneficiaries across multiple domains.',
    icon: <TrendingUpIcon sx={{ color: 'primary.main' }} />
  }
];

const achievements = [
  {
    icon: <GroupIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: "500+ Lives Transformed",
    description: "Children, women, and elderly supported through comprehensive programs"
  },
  {
    icon: <HomeIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
    title: "Multiple Care Facilities",
    description: "CNCP Homes, Shakti Sadan, Senior Citizens' Home, and more"
  },
  {
    icon: <VolunteerActivismIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: "Government Partnerships",
    description: "Collaborating with Mission Vatsalya, Mission Shakti, and other schemes"
  },
  {
    icon: <SchoolIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
    title: "Educational Impact",
    description: "ICDS programs, library services, and vocational training initiatives"
  }
];

const coreValues = [
  "Compassionate care for vulnerable populations",
  "Transparent and accountable operations",
  "Holistic development approach",
  "Community-centered service delivery",
  "Government partnership and collaboration",
  "Rights-based intervention strategies",
  "Sustainable rehabilitation programs",
  "Empowerment through education and skills"
];

/**
 * History page component
 * Showcases the organization's history, milestones, and journey
 * @returns {JSX.Element} The rendered History page
 */
export default function History() {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = historyPDFPath;
    link.download = 'Janasiksha Prochar Kendra - Brief History.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
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
          Our History
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            color: 'text.secondary', 
            fontFamily: 'Raleway, sans-serif',
            maxWidth: 700,
            mx: 'auto',
            lineHeight: 1.6,
            fontWeight: 400,
            mb: 2
          }}
        >
          A Journey of Compassion: Discover the remarkable story of Janasiksha Prochar Kendra's 
          evolution from humble beginnings to a comprehensive care organization.
        </Typography>
        <Chip 
          label="Established 2012" 
          sx={{
            bgcolor: 'secondary.main',
            color: 'white',
            fontWeight: 600,
            px: 2
          }}
        />
        <Divider sx={{ mt: 3, mb: 4, width: 100, mx: 'auto', height: 3, bgcolor: 'secondary.main' }} />
      </Box>

      {/* Mission Statement */}
      <Paper sx={{ p: 4, mb: 6, borderRadius: 3, bgcolor: 'primary.main', color: 'white', textAlign: 'center' }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontFamily: 'Raleway, sans-serif',
            fontWeight: 700,
            mb: 3
          }}
        >
          Our Mission
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            fontFamily: 'Raleway, sans-serif',
            fontStyle: 'italic',
            opacity: 0.95,
            maxWidth: 800,
            mx: 'auto'
          }}
        >
          "To provide comprehensive care, protection, and empowerment to vulnerable communities 
          through innovative programs, government partnerships, and community-centered approaches."
        </Typography>
      </Paper>

      {/* Historical Timeline */}
      <Box sx={{ mb: 6 }}>
        <Typography 
          variant="h3" 
          sx={{ 
            color: 'primary.main', 
            fontFamily: 'Raleway, sans-serif',
            fontWeight: 700,
            textAlign: 'center',
            mb: 4
          }}
        >
          Historical Milestones
        </Typography>
        
        <Grid container spacing={3}>
          {milestones.map((milestone, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <TimelineCard elevation={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontFamily: 'Raleway, sans-serif',
                      fontWeight: 700,
                      color: 'primary.main'
                    }}
                  >
                    {milestone.title}
                  </Typography>
                  <Chip 
                    label={milestone.year}
                    size="medium"
                    sx={{
                      bgcolor: index % 2 === 0 ? 'primary.main' : 'secondary.main',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '0.9rem'
                    }}
                  />
                </Box>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontFamily: 'Raleway, sans-serif',
                    color: 'text.secondary',
                    lineHeight: 1.6
                  }}
                >
                  {milestone.description}
                </Typography>
              </TimelineCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Key Achievements */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12}>
          <Typography 
            variant="h3" 
            sx={{ 
              color: 'primary.main', 
              fontFamily: 'Raleway, sans-serif',
              fontWeight: 700,
              textAlign: 'center',
              mb: 4
            }}
          >
            Key Achievements
          </Typography>
        </Grid>
        {achievements.map((achievement, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <HistoryCard>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Box sx={{ mb: 2 }}>
                  {achievement.icon}
                </Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontFamily: 'Raleway, sans-serif',
                    fontWeight: 700,
                    color: 'primary.main',
                    mb: 1
                  }}
                >
                  {achievement.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontFamily: 'Raleway, sans-serif',
                    color: 'text.secondary',
                    lineHeight: 1.5
                  }}
                >
                  {achievement.description}
                </Typography>
              </CardContent>
            </HistoryCard>
          </Grid>
        ))}
      </Grid>

      {/* Core Values */}
      <Paper sx={{ p: 4, mb: 6, borderRadius: 3, bgcolor: 'background.paper', border: '2px solid', borderColor: 'primary.light' }}>
        <Typography 
          variant="h4" 
          sx={{ 
            color: 'primary.main', 
            fontFamily: 'Raleway, sans-serif',
            fontWeight: 700,
            textAlign: 'center',
            mb: 3
          }}
        >
          Our Core Values
        </Typography>
        <Grid container spacing={2}>
          {coreValues.map((value, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                <HistoryIcon sx={{ color: 'secondary.main', mr: 2 }} />
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontFamily: 'Raleway, sans-serif',
                    color: 'text.primary',
                    fontWeight: 500
                  }}
                >
                  {value}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Historical Document Download */}
      <Paper sx={{ p: 4, borderRadius: 3, textAlign: 'center', bgcolor: 'secondary.main', color: 'white' }}>
        <PictureAsPdfIcon sx={{ fontSize: 60, mb: 2, opacity: 0.9 }} />
        <Typography 
          variant="h4" 
          sx={{ 
            fontFamily: 'Raleway, sans-serif',
            fontWeight: 700,
            mb: 2
          }}
        >
          Complete Historical Document
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            fontFamily: 'Raleway, sans-serif',
            mb: 3,
            opacity: 0.9,
            maxWidth: 600,
            mx: 'auto'
          }}
        >
          Download our comprehensive historical document for detailed information about 
          Janasiksha Prochar Kendra's journey, milestones, and impact since 2012.
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<DownloadIcon />}
          onClick={handleDownload}
          sx={{
            bgcolor: 'white',
            color: 'secondary.main',
            '&:hover': {
              bgcolor: 'grey.100'
            },
            fontFamily: 'Raleway, sans-serif',
            fontWeight: 600,
            px: 4,
            py: 1.5
          }}
        >
          Download Historical Document
        </Button>
      </Paper>
    </Container>
  );
}