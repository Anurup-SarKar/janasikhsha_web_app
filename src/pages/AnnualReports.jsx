// AnnualReports.jsx
// Annual Reports page for the Janasiksha Prochar Kendra website.
// Showcases the organization's annual reports and achievements.
// Follows accessible, modern, and empathetic design.

import React, { useState } from 'react';
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
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

// Import PDF files
import Report2023_24 from '../assets/documents/ANNUAL REPORT FOR THE YEAR 2023 - 2024 _compressed.pdf';
import Report2022_23 from '../assets/documents/Annual Report for the year 22-23_compressed.pdf';

const ReportCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease-in-out',
  borderRadius: 16,
  boxShadow: '0 4px 20px rgba(0, 91, 150, 0.1)',
  border: `2px solid ${theme.palette.primary.light}20`,
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 40px rgba(0, 91, 150, 0.2)',
  },
}));

const StatsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  borderRadius: 12,
  background: `linear-gradient(135deg, ${theme.palette.primary.main}10, ${theme.palette.secondary.main}10)`,
  border: `1px solid ${theme.palette.primary.light}30`,
}));

const achievements = [
  {
    icon: <GroupIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: "500+ Lives Impacted",
    description: "Children and families supported through our programs"
  },
  {
    icon: <HomeIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
    title: "9 Active Programs",
    description: "Comprehensive services across multiple domains"
  },
  {
    icon: <SchoolIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: "Educational Support",
    description: "ICDS and library services in vulnerable areas"
  },
  {
    icon: <HealthAndSafetyIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
    title: "Healthcare Services",
    description: "Medical support and wellness programs"
  }
];

const keyPrograms = [
  "CNCP Home for Girls under Mission Vatsalya",
  "Cottage Home under Child Rights & Trafficking Directorate",
  "Shakti Sadan (Unit-I & II) under Mission Shakti",
  "Senior Citizens' Home under Atal Vayo Abhudhaya Yojana",
  "Open Shelter for Girls under Mission Vatsalya",
  "ICDS in Red Light Areas",
  "Comprehensive Health Services",
  "Vocational Training & Production Centre",
  "Community Library Services"
];

/**
 * AnnualReports page component
 * Showcases annual reports and organizational achievements
 * @returns {JSX.Element} The rendered Annual Reports page
 */
export default function AnnualReports() {
  const reports = [
    {
      year: '2023-24',
      title: 'Annual Report 2023-2024',
      description: 'Comprehensive overview of our programs, achievements, and impact during the fiscal year 2023-2024.',
      highlights: [
        'Expanded child protection services',
        'Enhanced women empowerment programs',
        'Improved senior citizen care facilities',
        'Strengthened community partnerships'
      ],
      file: Report2023_24,
      color: 'primary.main'
    },
    {
      year: '2022-23',
      title: 'Annual Report 2022-2023',
      description: 'Detailed report showcasing our organizational growth and community impact in the year 2022-2023.',
      highlights: [
        'Established new care facilities',
        'Launched vocational training programs',
        'Expanded health services',
        'Increased beneficiary support'
      ],
      file: Report2022_23,
      color: 'secondary.main'
    }
  ];

  const handleDownload = (file, filename) => {
    const link = document.createElement('a');
    link.href = file;
    link.download = filename;
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
          Annual Reports
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
          Transparency in Action: Discover our journey, impact, and commitment to serving 
          vulnerable communities through our comprehensive annual reports.
        </Typography>
        <Chip 
          label="Government Partnership Programs" 
          sx={{
            bgcolor: 'secondary.main',
            color: 'white',
            fontWeight: 600,
            px: 2
          }}
        />
        <Divider sx={{ mt: 3, mb: 4, width: 100, mx: 'auto', height: 3, bgcolor: 'secondary.main' }} />
      </Box>

      {/* Key Achievements Stats */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {achievements.map((achievement, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatsCard elevation={2}>
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
                  color: 'text.secondary'
                }}
              >
                {achievement.description}
              </Typography>
            </StatsCard>
          </Grid>
        ))}
      </Grid>

      {/* Annual Reports Section */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {reports.map((report) => (
          <Grid item xs={12} md={6} key={report.year}>
            <ReportCard>
              <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Report Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                  <Box>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontFamily: 'Raleway, sans-serif',
                        fontWeight: 700,
                        color: 'primary.main',
                        mb: 1
                      }}
                    >
                      {report.title}
                    </Typography>
                  </Box>
                  <PictureAsPdfIcon sx={{ fontSize: 40, color: 'error.main' }} />
                </Box>

                {/* Report Description */}
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontFamily: 'Raleway, sans-serif',
                    color: 'text.secondary',
                    mb: 3,
                    lineHeight: 1.6
                  }}
                >
                  {report.description}
                </Typography>

                {/* Highlights */}
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontFamily: 'Raleway, sans-serif',
                    fontWeight: 600,
                    color: 'primary.main',
                    mb: 2
                  }}
                >
                  Key Highlights:
                </Typography>
                <List dense sx={{ mb: 3 }}>
                  {report.highlights.map((highlight, index) => (
                    <ListItem key={index} sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <TrendingUpIcon sx={{ fontSize: 20, color: report.color }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={highlight}
                        primaryTypographyProps={{
                          sx: {
                            fontFamily: 'Raleway, sans-serif',
                            fontSize: '0.9rem',
                            color: 'text.primary'
                          }
                        }}
                      />
                    </ListItem>
                  ))}
                </List>

                {/* Download Button */}
                <Box sx={{ mt: 'auto' }}>
                  <Button
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    onClick={() => handleDownload(report.file, `${report.title}.pdf`)}
                    sx={{
                      width: '100%',
                      bgcolor: report.color,
                      '&:hover': {
                        bgcolor: report.color,
                        opacity: 0.9
                      },
                      fontFamily: 'Raleway, sans-serif',
                      fontWeight: 600,
                      py: 1.5
                    }}
                  >
                    Download Report
                  </Button>
                </Box>
              </CardContent>
            </ReportCard>
          </Grid>
        ))}
      </Grid>

      {/* Key Programs Overview */}
      <Paper sx={{ p: 4, borderRadius: 3, bgcolor: 'primary.main', color: 'white', textAlign: 'center' }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontFamily: 'Raleway, sans-serif',
            fontWeight: 700,
            mb: 3
          }}
        >
          Our Key Programs
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            fontFamily: 'Raleway, sans-serif',
            mb: 3,
            opacity: 0.9,
            maxWidth: 800,
            mx: 'auto'
          }}
        >
          Through strategic partnerships with Government of India and West Bengal Government, 
          we operate comprehensive programs spanning child protection, women empowerment, elderly care, 
          and community development.
        </Typography>
        
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {keyPrograms.map((program, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box sx={{ 
                p: 2, 
                bgcolor: 'rgba(255,255,255,0.1)', 
                borderRadius: 2,
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontFamily: 'Raleway, sans-serif',
                    fontWeight: 500,
                    textAlign: 'center'
                  }}
                >
                  {program}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
}