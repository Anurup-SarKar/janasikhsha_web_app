import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';

const InfoCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  border: `2px solid ${theme.palette.primary.main}`,
  borderRadius: '16px',
  transition: 'all 0.3s ease-in-out',
  width: '100%',
  maxWidth: '100%',
  minWidth: '100%',
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 24px rgba(0, 91, 150, 0.15)',
    border: `2px solid ${theme.palette.secondary.main}`,
  },
}));

const SectionChip = styled(Chip)(({ theme }) => ({
  fontSize: '0.9rem',
  fontWeight: 'bold',
  height: '32px',
  backgroundColor: theme.palette.secondary.main,
  color: 'white',
  '& .MuiChip-label': {
    paddingX: '12px',
  },
}));

const organizationInfo = [
  {
    title: "Mission of the Organization",
    icon: "🎯",
    category: "Mission",
    description: "Janasiksha Prochar Kendra (JPK) was conceived and incepted to extend developmental service to the people in difficult circumstances with focus on women and children."
  },
  {
    title: "Registration",
    icon: "📋",
    category: "Legal",
    description: "The Organization is registered under the West Bengal Societies Registration Act No. XXVI (1961)",
    details: [
      "Registration No: S/12026 dt. 09.08.72",
      "FCRA No: 147120188 dt. 19.04.85 issued by the Ministry of Home Affairs, Government of India"
    ]
  },
  {
    title: "The Organization",
    icon: "🏛️",
    category: "History",
    description: "Janasiksha Prochar Kendra started its journey four decades ago with the avowed objective of eradication of illiteracy from amongst the rural poor in addition to rendering other developmental services to the under-privileged sections of the society with focus on women and children in difficulty. During these years, with support from Central and State Government, Welfare Boards, and International Donor Agencies, the organization has expanded its activities manifold, supplementing governmental activities in social welfare both in rural and urban areas, including red light areas."
  },
  {
    title: "Management",
    icon: "👥",
    category: "Structure",
    description: "At the head of the organization there is an Executive Committee headed by the President, the members of which are elected every year in an annual general meeting. The committee sits every three months or earlier — depending on exigency — within the ambit of rules and by–laws of the organization. The day-to-day administration is looked after by the Secretary, ably assisted by a team of dedicated and experienced workers, and sub–committees for each project under the superintendence, direction, and control of the Executive Committee. Fund management is also very transparent, each project having a separate bank account being operated under dual signatory system. Commercial double entry system is maintained and the accounts of each project and that of the organization as a whole are audited every year by a renowned audit firm of the city."
  },
  {
    title: "Areas of Work",
    icon: "🏢",
    category: "Services",
    description: "Our organization focuses on comprehensive development across multiple sectors:",
    workAreas: [
      "Education – both non-formal and formal",
      "Skill upgradation – vocational and non-formal technical training",
      "Development of child labour",
      "Supplementary nutrition",
      "Health care",
      "Cultural development",
      "Shelter Homes for destitute elderly persons, women, and girls in difficult circumstances for empowerment and rehabilitation",
      "Cross-cutting Issues – HIV/AIDS, child marriage, dowry menace, population stabilization, drug addiction and alcoholism, trafficking, etc."
    ]
  }
];

const getCategoryColor = (category) => {
  const colors = {
    'Mission': '#e91e63',
    'Legal': '#2196f3',
    'History': '#ff9800',
    'Structure': '#9c27b0',
    'Services': '#4caf50'
  };
  return colors[category] || '#757575';
};

export default function WhoWeAre() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Page Header */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{ 
            mb: 3, 
            fontFamily: 'Raleway, sans-serif', 
            fontWeight: 800, 
            color: (theme) => theme.palette.primary.main,
            fontSize: { xs: '2.5rem', md: '3.5rem' }
          }}
        >
          Who We Are
        </Typography>
        <Typography 
          variant="h5" 
          sx={{ 
            color: (theme) => theme.palette.text.secondary, 
            fontFamily: 'Raleway, sans-serif', 
            fontWeight: 400, 
            mb: 4,
            maxWidth: 800,
            mx: 'auto',
            lineHeight: 1.6
          }}
        >
          Understanding Our Mission, History, and Organizational Structure
        </Typography>
        <Box sx={{ width: 100, height: 4, bgcolor: 'secondary.main', mx: 'auto', borderRadius: 2 }} />
      </Box>

      {/* Organization Info Grid */}
      <Grid container spacing={4}>
        {organizationInfo.map((info, index) => (
          <Grid 
            item 
            xs={12} 
            md={6} 
            key={index}
            sx={{
              display: 'flex',
              width: '100%',
              maxWidth: '100%',
            }}
          >
            <InfoCard>
              <CardContent sx={{ 
                p: 2.5, 
                display: 'flex', 
                flexDirection: 'column', 
                width: '100%',
                maxWidth: '100%',
                overflow: 'hidden',
                boxSizing: 'border-box'
              }}>
                {/* Icon, Title and Category */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                  <Typography variant="h3" sx={{ fontSize: '2.5rem' }}>
                    {info.icon}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, flex: 1 }}>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        color: (theme) => theme.palette.primary.main, 
                        fontFamily: 'Raleway, sans-serif', 
                        fontWeight: 700, 
                        fontSize: { xs: '1.3rem', md: '1.5rem' }
                      }}
                    >
                      {info.title}
                    </Typography>
                    <SectionChip 
                      label={info.category}
                      size="medium"
                    />
                  </Box>
                </Box>

                {/* Description */}
                <Box 
                  sx={{ 
                    width: '100%',
                    maxWidth: '100%',
                    overflow: 'hidden',
                    pr: 2,
                    boxSizing: 'border-box'
                  }}
                >
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontFamily: 'Raleway, sans-serif', 
                      color: (theme) => theme.palette.text.primary, 
                      fontSize: '0.9rem', 
                      textAlign: 'justify', 
                      lineHeight: 1.4,
                      mb: 2,
                      width: '100%',
                      maxWidth: '100%',
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word',
                      ...(index < 3 && {
                        maxHeight: '5.6em', // Approximately 4 lines
                        overflow: 'hidden',
                        position: 'relative',
                      })
                    }}
                  >
                    {info.description}
                  </Typography>
                </Box>

                {/* Additional Details for Registration */}
                {info.details && (
                  <Box sx={{ 
                    mt: 2, 
                    p: 2, 
                    bgcolor: (theme) => theme.palette.primary.light + '20', 
                    borderRadius: 2,
                    border: (theme) => `1px solid ${theme.palette.primary.light}`
                  }}>
                    {info.details.map((detail, idx) => (
                      <Typography 
                        key={idx}
                        variant="body2" 
                        sx={{ 
                          fontFamily: 'Raleway, sans-serif', 
                          color: (theme) => theme.palette.primary.dark, 
                          fontWeight: 600,
                          mb: idx < info.details.length - 1 ? 1 : 0
                        }}
                      >
                        <strong>{detail.split(':')[0]}:</strong> {detail.split(':')[1]}
                      </Typography>
                    ))}
                  </Box>
                )}

                {/* Work Areas List */}
                {info.workAreas && (
                  <Box sx={{ mt: 2 }}>
                    {info.workAreas.map((area, idx) => (
                      <Box 
                        key={idx}
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'flex-start', 
                          mb: 1.5,
                          p: 1,
                          borderRadius: 1,
                          '&:hover': {
                            bgcolor: 'rgba(0, 0, 0, 0.04)'
                          }
                        }}
                      >
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            mr: 1, 
                            fontWeight: 'bold', 
                            color: (theme) => theme.palette.secondary.main,
                            minWidth: '20px'
                          }}
                        >
                          ({idx + 1})
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontFamily: 'Raleway, sans-serif', 
                            color: (theme) => theme.palette.text.primary,
                            lineHeight: 1.5,
                            flex: 1
                          }}
                        >
                          {area}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}
              </CardContent>
            </InfoCard>
          </Grid>
        ))}
      </Grid>

      {/* Footer Message */}
      <Box sx={{ 
        textAlign: 'center', 
        mt: 6, 
        p: { xs: 4, md: 6 }, 
        background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 50%, #64b5f6 100%)',
        color: 'white', 
        borderRadius: 4,
        boxShadow: '0 8px 32px rgba(25, 118, 210, 0.3)',
        border: '2px solid',
        borderColor: 'secondary.main',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontFamily: 'Raleway, sans-serif', 
            fontWeight: 700, 
            mb: 3,
            fontSize: { xs: '1.8rem', md: '2.2rem' },
            textShadow: '0 2px 8px rgba(0,0,0,0.2)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          🌟 Continuing Our Legacy of Service 🌟
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            fontFamily: 'Raleway, sans-serif', 
            fontSize: { xs: '1.2rem', md: '1.4rem' },
            fontWeight: 500,
            maxWidth: 900,
            mx: 'auto',
            opacity: 0.95,
            lineHeight: 1.6,
            position: 'relative',
            zIndex: 1,
            textShadow: '0 1px 4px rgba(0,0,0,0.1)',
          }}
        >
          For over four decades, we have been dedicated to serving the most vulnerable members of our society. 
          Our commitment to transparency, community development, and social welfare continues to drive our mission forward.
        </Typography>
      </Box>
    </Container>
  );
}