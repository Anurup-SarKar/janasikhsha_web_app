// OurAchievements.jsx
// Our Achievements page showcasing awards and recognitions
import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Chip, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const AwardCard = styled(Card)(({ theme }) => ({
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

const YearChip = styled(Chip)(({ theme }) => ({
  fontSize: '1.1rem',
  fontWeight: 'bold',
  height: '36px',
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  '& .MuiChip-label': {
    paddingX: '16px',
  },
}));

const achievements = [
  {
    year: 1994,
    title: "National Award",
    subtitle: "Excellence in Red Light Area Work",
    description: "Received National Award for Excellence in working in the city's Red Light Area from the President of India at Rashtrapati Bhavan",
    awardedBy: "President of India",
    venue: "Rashtrapati Bhavan",
    category: "national",
    icon: "🏆"
  },
  {
    year: 1998,
    title: "Nehru Children's Award",
    subtitle: "Adult Education & Rural Development",
    description: "Received State Level Award from the Governor of West Bengal at G. D. Birla Sabhaghar, Ballygunge for implementing Adult education of illiteracy from amongst the Rural poor & publication of books & other Educational materials.",
    awardedBy: "Governor of West Bengal",
    venue: "G. D. Birla Sabhaghar, Ballygunge",
    category: "state",
    icon: "📚"
  },
  {
    year: 2002,
    title: "Rusi B. Gimi Award",
    subtitle: "Excellence in Rural Development",
    description: "Received a State Level Award from the Governor of West Bengal at Raj Bhavan, Kolkata, for Excellence of Work in Rural Development",
    awardedBy: "Governor of West Bengal",
    venue: "Raj Bhavan, Kolkata",
    category: "state",
    icon: "🌾"
  },
  {
    year: 2006,
    title: "Certificate of Honour",
    subtitle: "Service to Rural India",
    description: "Certificate of Honour of service of Rural India from Confederation of NGO's of Rural India",
    awardedBy: "Confederation of NGO's of Rural India",
    venue: "",
    category: "recognition",
    icon: "🎖️"
  }
];

const getCategoryColor = (category) => {
  switch (category) {
    case 'national': return '#d4af37'; // Gold
    case 'state': return '#c0392b'; // Red
    case 'recognition': return '#27ae60'; // Green
    default: return '#3498db'; // Blue
  }
};

export default function OurAchievements() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography 
          variant="h3" 
          sx={{ 
            color: (theme) => theme.palette.primary.main, 
            fontFamily: 'Raleway, sans-serif', 
            fontWeight: 700, 
            mb: 2,
            textShadow: '0 2px 8px rgba(0, 91, 150, 0.12)' 
          }}
        >
          Our Achievements
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
          Recognition of Our Commitment to Social Service and Community Development
        </Typography>
        <Box sx={{ width: 100, height: 4, bgcolor: 'secondary.main', mx: 'auto', borderRadius: 2 }} />
      </Box>

      {/* Achievements Grid */}
      <Grid container spacing={4}>
        {achievements.map((achievement, index) => (
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
            <AwardCard>
              <CardContent sx={{ 
                p: 2.5, 
                display: 'flex', 
                flexDirection: 'column', 
                width: '100%',
                maxWidth: '100%',
                overflow: 'hidden',
                boxSizing: 'border-box'
              }}>
                {/* Icon, Title and Year */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                  <Typography variant="h3" sx={{ fontSize: '2.5rem' }}>
                    {achievement.icon}
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
                      {achievement.title}
                    </Typography>
                    <Chip 
                      label={achievement.year}
                      size="medium"
                      sx={{ 
                        backgroundColor: (theme) => theme.palette.secondary.main,
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        height: '28px'
                      }}
                    />
                  </Box>
                </Box>

                {/* Subtitle */}
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: (theme) => theme.palette.secondary.main, 
                    fontFamily: 'Raleway, sans-serif', 
                    fontWeight: 600, 
                    mb: 2,
                    fontSize: '1.1rem'
                  }}
                >
                  {achievement.subtitle}
                </Typography>

                {/* Category Badge */}
                <Chip 
                  label={achievement.category.toUpperCase()} 
                  size="small"
                  sx={{ 
                    alignSelf: 'flex-start',
                    mb: 2,
                    backgroundColor: getCategoryColor(achievement.category),
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                />

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
                      mb: 1,
                      width: '100%',
                      maxWidth: '100%',
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word',
                      flex: 1
                    }}
                  >
                    {achievement.description}
                  </Typography>
                </Box>

                {/* Award Details */}
                <Box sx={{ mt: 0, mb: 2 }}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontFamily: 'Raleway, sans-serif', 
                      color: (theme) => theme.palette.text.secondary, 
                      fontWeight: 600,
                      mb: achievement.venue ? 1 : 0
                    }}
                  >
                    <strong>Awarded by:</strong> {achievement.awardedBy}
                  </Typography>
                  {achievement.venue && (
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontFamily: 'Raleway, sans-serif', 
                        color: (theme) => theme.palette.text.secondary, 
                        fontWeight: 600
                      }}
                    >
                      <strong>Venue:</strong> {achievement.venue}
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </AwardCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}