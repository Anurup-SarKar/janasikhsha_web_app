// History.jsx
// Organization History page for the Janasiksha Prochar Kendra website.
// Showcases the organization's history, achievements, and journey with detailed descriptions.
// Follows accessible, modern, and empathetic design.

import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Container,
  Divider,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import HistoryIcon from '@mui/icons-material/History';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import StarIcon from '@mui/icons-material/Star';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

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
 * Showcases the organization's history, achievements, and journey with detailed descriptions
 * @returns {JSX.Element} The rendered History page
 */
export default function History() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
        <Typography 
          variant="h2" 
          sx={{ 
            color: 'primary.main', 
            fontFamily: 'Raleway, sans-serif', 
            fontWeight: 800,
            mb: { xs: 2, md: 3 },
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
            lineHeight: { xs: 1.1, md: 1.2 }
          }}
        >
         History of Organization
        </Typography>
        <Typography 
          variant="h5" 
          sx={{ 
            color: 'text.secondary', 
            fontFamily: 'Raleway, sans-serif',
            maxWidth: 800,
            mx: 'auto',
            lineHeight: 1.6,
            fontWeight: 600,
            mb: { xs: 3, md: 4 },
            fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
            display: { xs: 'none', sm: 'block' }
          }}
        >
          A Journey of Compassion: Discover the remarkable story of Janasiksha Prochar Kendra's 
          evolution from humble beginnings to a comprehensive care organization.
        </Typography>
        <Box sx={{
          display: 'inline-flex',
          alignItems: 'center',
          px: { xs: 2, md: 3 },
          py: { xs: 0.5, md: 1 },
          bgcolor: 'secondary.main',
          color: 'white',
          borderRadius: 25,
          fontWeight: 600,
          fontSize: { xs: '0.9rem', md: '1rem' },
          boxShadow: '0 4px 12px rgba(156, 39, 176, 0.3)'
        }}>
          <StarIcon sx={{ mr: 1, fontSize: { xs: 18, md: 20 } }} />
          Established 2012
        </Box>
        <Divider sx={{ mt: { xs: 2, md: 3 }, mb: { xs: 2, md: 4 }, width: { xs: 80, md: 100 }, mx: 'auto', height: 3, bgcolor: 'secondary.main' }} />
      </Box>

      {/* Mission Statement */}
      <Box sx={{ 
        p: { xs: 4, md: 6 }, 
        mb: 6, 
        background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 50%, #64b5f6 100%)',
        color: 'white', 
        borderRadius: 4,
        boxShadow: '0 8px 32px rgba(25, 118, 210, 0.3)',
        border: '2px solid',
        borderColor: 'secondary.main',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
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
          🎯 Our Mission 🎯
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            fontFamily: 'Raleway, sans-serif',
            fontStyle: 'italic',
            opacity: 0.95,
            maxWidth: 800,
            mx: 'auto',
            fontSize: { xs: '1.1rem', md: '1.25rem' },
            textShadow: '0 1px 4px rgba(0,0,0,0.1)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          "To provide comprehensive care, protection, and empowerment to vulnerable communities 
          through innovative programs, government partnerships, and community-centered approaches."
        </Typography>
      </Box>

      {/* Detailed Organization History */}
      <Paper sx={{ p: 4, mb: 6, borderRadius: 3, bgcolor: 'background.paper', border: '2px solid', borderColor: 'secondary.light' }}>
        <Typography 
          variant="h4" 
          sx={{ 
            color: 'primary.main', 
            fontFamily: 'Raleway, sans-serif',
            fontWeight: 700,
            textAlign: 'center',
            mb: 4
          }}
        >
          Our Journey Through the Years
        </Typography>
        
        {/* Foundation Story */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              color: 'secondary.main', 
              fontFamily: 'Raleway, sans-serif',
              fontWeight: 700,
              mb: 2,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <StarIcon sx={{ mr: 1, color: 'secondary.main' }} />
            The Foundation (2012)
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              fontFamily: 'Raleway, sans-serif',
              color: 'text.primary',
              lineHeight: 1.8,
              mb: 2,
              textAlign: 'justify'
            }}
          >
            Janasiksha Prochar Kendra was established in 2012 with a noble vision to serve the most vulnerable sections of society. Born out of compassion and a deep commitment to social justice, our organization began as a humble initiative to address the pressing needs of children, women, and elderly individuals who required protection, care, and empowerment.
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              fontFamily: 'Raleway, sans-serif',
              color: 'text.primary',
              lineHeight: 1.8,
              textAlign: 'justify'
            }}
          >
            The founding members recognized that sustainable social change could only be achieved through systematic, rights-based interventions that address root causes while providing immediate relief to those in need. This philosophy became the cornerstone of our organizational approach.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Early Years */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              color: 'secondary.main', 
              fontFamily: 'Raleway, sans-serif',
              fontWeight: 700,
              mb: 2,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <GroupIcon sx={{ mr: 1, color: 'secondary.main' }} />
            Building Foundations (2013-2015)
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              fontFamily: 'Raleway, sans-serif',
              color: 'text.primary',
              lineHeight: 1.8,
              mb: 2,
              textAlign: 'justify'
            }}
          >
            The initial years were dedicated to establishing robust child protection services and women empowerment programs. Through strategic partnerships with government agencies, we began operating Children in Need of Care and Protection (CNCP) homes, providing safe shelter, education, and rehabilitation services to vulnerable children.
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              fontFamily: 'Raleway, sans-serif',
              color: 'text.primary',
              lineHeight: 1.8,
              textAlign: 'justify'
            }}
          >
            Our women's empowerment initiatives focused on rescuing and rehabilitating women in distress through our Shakti Sadan facility, offering them counseling, skill development, and reintegration support. These early programs laid the foundation for our holistic approach to social work.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Expansion Phase */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              color: 'secondary.main', 
              fontFamily: 'Raleway, sans-serif',
              fontWeight: 700,
              mb: 2,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <HomeIcon sx={{ mr: 1, color: 'secondary.main' }} />
            Expanding Horizons (2016-2018)
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              fontFamily: 'Raleway, sans-serif',
              color: 'text.primary',
              lineHeight: 1.8,
              mb: 2,
              textAlign: 'justify'
            }}
          >
            Recognizing the growing needs of our communities, we expanded our services to include elderly care through specialized senior citizens' homes. Our elderly care programs provide comprehensive support including healthcare, recreational activities, and dignified living arrangements for senior citizens who require institutional care.
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              fontFamily: 'Raleway, sans-serif',
              color: 'text.primary',
              lineHeight: 1.8,
              textAlign: 'justify'
            }}
          >
            This period also marked the introduction of vocational training programs, empowering beneficiaries with marketable skills and enabling them to achieve economic independence. Our training initiatives covered various trades and professional skills, adapted to local market demands.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Modern Era */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              color: 'secondary.main', 
              fontFamily: 'Raleway, sans-serif',
              fontWeight: 700,
              mb: 2,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <HealthAndSafetyIcon sx={{ mr: 1, color: 'secondary.main' }} />
            Comprehensive Care (2019-Present)
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              fontFamily: 'Raleway, sans-serif',
              color: 'text.primary',
              lineHeight: 1.8,
              mb: 2,
              textAlign: 'justify'
            }}
          >
            Today, Janasiksha Prochar Kendra operates as a comprehensive care organization with nine major programs serving over 500 beneficiaries. Our services now include specialized healthcare facilities, Integrated Child Development Services (ICDS), community library programs, and after-care support for former residents.
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              fontFamily: 'Raleway, sans-serif',
              color: 'text.primary',
              lineHeight: 1.8,
              mb: 2,
              textAlign: 'justify'
            }}
          >
            Our organization has evolved into a model of excellence in social work, maintaining the highest standards of care while adapting to changing social needs. We continue to strengthen our partnerships with government schemes like Mission Vatsalya and Mission Shakti, ensuring sustainable and impactful service delivery.
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              fontFamily: 'Raleway, sans-serif',
              color: 'text.primary',
              lineHeight: 1.8,
              textAlign: 'justify'
            }}
          >
            As we move forward, Janasiksha Prochar Kendra remains committed to its founding principles of compassion, transparency, and empowerment, continuously evolving to meet the emerging challenges of our society while staying true to our mission of serving the most vulnerable.
          </Typography>
        </Box>
      </Paper>

      {/* Awards and Accolades */}
      <Paper sx={{ p: 4, mb: 6, borderRadius: 3, bgcolor: 'background.paper', border: '2px solid', borderColor: 'secondary.light' }}>
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
          🏆 Awards and Accolades 🏆
        </Typography>
        
        <Typography 
          variant="body1" 
          sx={{ 
            fontFamily: 'Raleway, sans-serif',
            color: 'text.primary',
            lineHeight: 1.8,
            textAlign: 'center',
            mb: 4,
            fontStyle: 'italic',
            fontSize: '1.1rem'
          }}
        >
          In recognition of its missionary service, the organization has won the following prestigious awards.
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          gap: 3, 
          justifyContent: 'center', 
          alignItems: 'stretch',
          px: 2
        }}>
          {/* 1994 Award */}
          <Box sx={{ 
            flex: { xs: '1', md: '1' },
            maxWidth: { xs: '100%', md: '300px' },
            p: 3, 
            borderRadius: 2, 
            border: '2px solid',
            borderColor: 'primary.light',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center'
          }}>
            <Typography 
              variant="h4" 
              sx={{ 
                fontFamily: 'Raleway, sans-serif',
                fontWeight: 700,
                mb: 2,
                color: 'primary.main'
              }}
            >
              1994
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                fontFamily: 'Raleway, sans-serif',
                fontWeight: 600,
                mb: 2,
                color: 'secondary.main'
              }}
            >
              National Award for Excellence
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                fontFamily: 'Raleway, sans-serif',
                lineHeight: 1.6,
                color: 'text.primary',
                flex: 1
              }}
            >
              Received National Award for Excellence in working in the city's Red Light Area from the President of India at Rashtrapati Bhavan.
            </Typography>
          </Box>

          {/* 1998 Award */}
          <Box sx={{ 
            flex: { xs: '1', md: '1' },
            maxWidth: { xs: '100%', md: '300px' },
            p: 3, 
            borderRadius: 2, 
            border: '2px solid',
            borderColor: 'secondary.light',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center'
          }}>
            <Typography 
              variant="h4" 
              sx={{ 
                fontFamily: 'Raleway, sans-serif',
                fontWeight: 700,
                mb: 2,
                color: 'primary.main'
              }}
            >
              1998
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                fontFamily: 'Raleway, sans-serif',
                fontWeight: 600,
                mb: 2,
                color: 'secondary.main'
              }}
            >
              State Level Award - Education Excellence
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                fontFamily: 'Raleway, sans-serif',
                lineHeight: 1.6,
                color: 'text.primary',
                flex: 1
              }}
            >
              Received State Level Award from Nehru Children Museum from the Governor of West Bengal at G.D. Birla Sabhaghar, Ballygunge for implementing Adult Education Centre for eradication of illiteracy from amongst the rural poor and publication of books and other educational materials.
            </Typography>
          </Box>

          {/* 2002 Award */}
          <Box sx={{ 
            flex: { xs: '1', md: '1' },
            maxWidth: { xs: '100%', md: '300px' },
            p: 3, 
            borderRadius: 2, 
            border: '2px solid',
            borderColor: 'primary.light',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center'
          }}>
            <Typography 
              variant="h4" 
              sx={{ 
                fontFamily: 'Raleway, sans-serif',
                fontWeight: 700,
                mb: 2,
                color: 'primary.main'
              }}
            >
              2002
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                fontFamily: 'Raleway, sans-serif',
                fontWeight: 600,
                mb: 2,
                color: 'secondary.main'
              }}
            >
              State Level Award - Rural Development Excellence
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                fontFamily: 'Raleway, sans-serif',
                lineHeight: 1.6,
                color: 'text.primary',
                flex: 1
              }}
            >
              Received a State Level Award from the Governor of West Bengal at Raj Bhavan, Kolkata, for Excellence of work in Rural Development.
            </Typography>
          </Box>
        </Box>

        {/* Forward Looking Note */}
        <Box sx={{ 
          mt: 4, 
          p: 3, 
          borderRadius: 2, 
          bgcolor: 'grey.100',
          textAlign: 'center'
        }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontFamily: 'Raleway, sans-serif',
              fontWeight: 700,
              color: 'primary.main',
              mb: 1
            }}
          >
            🚀 FORWARD LOOKING
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              fontFamily: 'Raleway, sans-serif',
              color: 'text.primary',
              lineHeight: 1.6,
              fontStyle: 'italic'
            }}
          >
            From the experience we gained during the last forty years working amongst the 
marginalized sections of the society, we learnt that these people need mainly three things for 
empowerment --- education, livelihood development, and a decent family life. Of these three, 
livelihood development occupies prime consideration in as much as empowerment of this part 
enables a man to earn meaningfully to support himself and his family ensuring also the normal 
development of the future generation. 
So, the NGO contemplates to undertake a project assisting the vulnerable sections of the 
society, both in urban and rural area, in whatever livelihood initiative they are engaged --- 
agriculture, artisan, small trade, hawking, small transport, poultry keeping, animal husbandry and 
the like in the way of awareness education, skill up gradation training, arrangement of seed money. 
Once they become self reliant in their respective livelihood initiative, they will be able to take care 
of everything in a better way including education and empowerment of the children. Perpetual 
poverty, a curse having no parallel, will be a thing of the past from the lives of these vulnerable 
people.
          </Typography>
        </Box>
      </Paper>

      {/* Key Achievements */}
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
          Key Achievements
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {achievements.map((achievement, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
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
      </Box>

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

      {/* Legacy and Impact */}
      <Box sx={{ 
        p: { xs: 4, md: 6 }, 
        background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 50%, #64b5f6 100%)',
        color: 'white', 
        borderRadius: 4,
        boxShadow: '0 8px 32px rgba(25, 118, 210, 0.3)',
        border: '2px solid',
        borderColor: 'secondary.main',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
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
        <VolunteerActivismIcon sx={{ 
          fontSize: 60, 
          mb: 2, 
          opacity: 0.9,
          position: 'relative',
          zIndex: 1,
          filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.2))'
        }} />
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
          🌟 Our Legacy of Service 🌟
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            fontFamily: 'Raleway, sans-serif',
            mb: 3,
            opacity: 0.95,
            maxWidth: 800,
            mx: 'auto',
            lineHeight: 1.7,
            fontSize: { xs: '1rem', md: '1.1rem' },
            textShadow: '0 1px 4px rgba(0,0,0,0.1)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          Over more than a decade of dedicated service, Janasiksha Prochar Kendra has transformed from a small initiative into a beacon of hope for countless individuals. Our journey reflects the power of compassionate action, strategic partnerships, and unwavering commitment to social justice.
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            fontFamily: 'Raleway, sans-serif',
            opacity: 0.9,
            maxWidth: 700,
            mx: 'auto',
            fontStyle: 'italic',
            lineHeight: 1.6,
            fontSize: { xs: '1rem', md: '1.1rem' },
            textShadow: '0 1px 4px rgba(0,0,0,0.1)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          "Every life we touch, every story we help rewrite, and every dream we help realize contributes to building a more equitable and compassionate society."
        </Typography>
      </Box>
    </Container>
  );
}