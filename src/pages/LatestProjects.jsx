// LatestProjects.jsx
// Latest Projects page for the NGO showcasing all current initiatives and programs.
import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Container,
  Chip,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import projectImages, { placeholderImage } from '../assets/images/projectImages';

const ProjectCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease-in-out',
  borderRadius: 16,
  boxShadow: '0 6px 20px rgba(0, 91, 150, 0.08)',
  border: `1px solid ${theme.palette.primary.light}15`,
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: '0 12px 35px rgba(0, 91, 150, 0.18)',
  },
}));

const ProjectTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem',
  fontWeight: 700,
  color: theme.palette.primary.main,
  fontFamily: 'Raleway, sans-serif',
  marginBottom: theme.spacing(1.5),
  lineHeight: 1.3,
  textAlign: 'left',
  minHeight: '60px',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
}));

const ProjectDescription = styled(Typography)(({ theme }) => ({
  fontSize: '0.98rem',
  color: theme.palette.text.secondary,
  fontFamily: 'Raleway, sans-serif',
  lineHeight: 1.6,
  textAlign: 'left',
  display: 'block',
  flexGrow: 1,
}));

const projects = [
  {
    id: 1,
    title: "Home Under J.J.Act: (CNCP Home for girls)",
    description: `Under the Government of West Bengal, Department of Social Welfare Notification No. 2118/1(200) SW dt. 22.05.1998, we established a Home accommodating 25 girls with red light antecedents for protection, care and rehabilitation through normal channels of development like education, counselling, health care, skill upgradation, games and recreation. Out of 22 girls residing as on 31.03.2012, all were admitted in government-aided schools and it is expected that in course of time they will be mainstreamed to enjoy a peaceful family life with dignity.
We have already applied for enhancement of the inmates from 25 to 50, which has been recommended by the District Magistrate, Hooghly to the Director of Social Welfare, Government of West Bengal. It is expected that the sanction of the competent authority will soon be received.`,
    category: "Child Protection"
  },
  {
    id: 2,
    title: "Cottage Home",
    description: `The Government of West Bengal has since sanctioned a Destitute Home (Cottage) sheltering
25 girls. At present 6 inmates out of 11 recommended by the Government are staying in the cottage
for care, protection, and empowerment through natural course of development like school education,
coaching, counselling, health care, and cultural development.`,
    category: "Child Welfare"
  },
  {
    id: 3,
    title: "Shakti Sadan (Unit-I & II)",
    description: `Mainly due to population explosion, a sizable section of our society still lives below poverty
despite economic growth at reasonable rate after Independence.
On account of reasons ranging from economic instability of the
family, breakdown of joint family system and to social bias, many
a time our families fail to extend emotional and physical support
to the extended members of the family, especially for women in
difficult circumstances like widows, poor and deserted women,
women ex-prisoners, victims of sexual abuse and crime including
those trafficked and rescued from brothels, women rendered
homeless due to natural calamity, etc. These marginalized women
are compelled to lead a life of sub-human existence ending up as
beggars or prostitutes for their own survival and sometimes for their dependent children also.
To mitigate the suffering of these unfortunate women, the NGO has established Swadhar
Home, funded by the Ministry of Women and Child Development, Government of India in 2005 –
2006. The capacity of the Home is 50 with 45 women living as on 31.03.2012. Till date 32 women
have been rehabilitated. For the inmates of this Home they being women in most difficult
circumstances, and having no trace of family connection, rehabilitation is rather difficult.
The scheme has gone a long way to rehabilitate women in difficult circumstances --- socially
and economically --- through normal channels of development like counseling, skill up gradation,
need-based education, personality development through behavioral training. They are regaining here
what they have lost elsewhere and will have a fresh lease of life.`,
    category: "Women Empowerment"
  },
  {
    id: 4,
    title: "Senior Citizens' Home",
    description: `Due to rapid social changes in our society, nuclear families of today are
increasingly becoming reluctant in taking care of the elderly members of the
family. For care and nursing which these people need most at the fag end of life,
we have been running the Old Age Home since 1998 to provide shelter to 25
elderly persons --- male and female. The Project is financed by the Ministry of
Social Justice & Empowerment, Government of India. During the year under
review, two elderly persons expired and their last rites were performed by the
organization. With new admissions, the number of inmates as on 31st March 2012 is 19. Our efforts
are to keep them happy and content.`,
    category: "Elderly Care"
  },
  {
    id: 5,
    title: "Open Shelter for Girls",
    description: `With effect from 1st April 2011, we have been running an Open Shelter under ICPS at
CK – 6, Sector II, Salt Lake City, Kolkata sheltering 25 girls in vulnerable life situation. We provide
them all promotional incentives like school education, coaching support, counseling, health care,
games and sports, and cultural development with a view to mainstream them in future. 21 children
were admitted in formal school during the year.`,
    category: "Child Protection"
  },
  {
    id: 6,
    title: "ICDS (Integrated Child Development Scheme)",
    description: `About 900 kids of red light area in the age group of 3 to 5+ have been
admitted in all 28 Anganwadi centres opened at Seth Bagan, Sonagachi,
Rambagan, Jorabagan, and Bowbazar (all red light areas) with grant-in-aid
from the West Bengal Government. In these centres, special emphasis is given
on cleanliness, habit formation, and information about nature and
environment. Besides, they are provided with 6 services, viz., pre-education,
nutrition, immunization, health care, health check-up, and referral service.
Each centre is managed by one AWW, assisted by an AW Helper. In the last financial year, about
200 children were admitted into these centres. Supplementary nutrition is arranged for them along
with expectant mothers. Immunization programmes including pulse polio are attended. Efforts are
being made to open more centres in red light areas. 151children were formalized during the year.`,
    category: "Community Development"
  },
  {
    id: 7,
    title: "Health Services",
    description: `To maintain regular health check-up, two qualified medical practitioners ----
one male and one female --- are visiting once a week. In critical cases, patients are
taken to government hospitals for proper treatment. People from poor community
are also allowed free-of-cost health check-up by Home physicians.`,
    category: "Healthcare"
  },
  {
    id: 8,
    title: "Vocational Training cum Production Centre",
    description: `About 130 adolescent girls mainly of red light areas received training
in vocational trades like embroidery, tailoring, knitting, batique, bandhni,
beautician, etc., in seven (7) centres during the year under review. This
training will help them to stand on their feet in course of time.`,
    category: "Skill Development"
  },
  {
    id: 9,
    title: "Library",
    description: `The library of our rural infrastructure has a stock of about1600 books. The boarders have the
facility of reading books, magazines, newspapers, and periodicals in the Central Hall attached to the
library.`,
    category: "Education"
  }
];

const categoryColors = {
  "Child Protection": "#FF6B35",
  "Child Welfare": "#4ECDC4",
  "Child Development": "#00BCD4",
  "Women Empowerment": "#E91E63",
  "Women Protection": "#AD1457",
  "Elderly Care": "#9C27B0",
  "Community Development": "#2196F3",
  "Healthcare": "#4CAF50",
  "Skill Development": "#FF9800",
  "Education": "#795548"
};

export default function LatestProjects() {
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
          Running Scheme
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
          Our core initiatives spanning child protection, women empowerment, elderly care,
          and community development programs supported by various government schemes including
          Mission Vatsalya, Mission Shakti, and National Action Plans.
        </Typography>
        <Divider sx={{ mt: 3, mb: 4, width: 100, mx: 'auto', height: 3, bgcolor: 'secondary.main' }} />
      </Box>

      {/* Projects Grid */}
      <Grid container spacing={4}>
        {projects.map((project) => {
          return (
            <Grid item xs={12} key={project.id}>
              <ProjectCard>
                <CardContent sx={{
                  p: { xs: 2.5, sm: 3 },
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  {/* Title Section */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                    <ProjectTitle sx={{ flex: 1, mr: 2 }}>
                      {project.title}
                    </ProjectTitle>
                    <Chip
                      label={project.category}
                      size="small"
                      sx={{
                        backgroundColor: categoryColors[project.category] + '20',
                        color: categoryColors[project.category],
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        height: '28px',
                        flexShrink: 0
                      }}
                    />
                  </Box>

                  {/* Content Section - Image on Left with Text Wrap */}
                  <Box sx={{ position: 'relative' }}>
                    {projectImages[project.id] ? (
                      <>
                        {/* Image that floats left */}
                        <Box
                          sx={{
                            float: { xs: 'none', md: 'left' },
                            width: { xs: '100%', md: '450px' },
                            height: { xs: '150px', md: '225px' },
                            overflow: 'hidden',
                            borderRadius: '12px',
                            mr: { xs: 0, md: 3 },
                            mb: { xs: 2, md: 2 },
                            flexShrink: 0
                          }}
                        >
                          <CardMedia
                            component="img"
                            image={projectImages[project.id]}
                            alt={project.title}
                            sx={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              transition: 'transform 0.3s ease-in-out',
                              '&:hover': {
                                transform: 'scale(1.05)'
                              }
                            }}
                          />
                        </Box>

                        {/* Text that wraps around the image */}
                        <ProjectDescription sx={{
                          textAlign: 'justify',
                          lineHeight: 1.7,
                          overflow: 'hidden'
                        }}>
                          {project.description}
                        </ProjectDescription>

                        {/* Clear float */}
                        <Box sx={{ clear: 'both' }} />
                      </>
                    ) : (
                      <ProjectDescription sx={{
                        textAlign: 'justify',
                        lineHeight: 1.7
                      }}>
                        {project.description}
                      </ProjectDescription>
                    )}
                  </Box>
                </CardContent>
              </ProjectCard>
            </Grid>
          );
        })}
      </Grid>

      {/* Statistics Section */}
      <Box sx={{
        mt: 6,
        mb: 4,
        p: { xs: 3, md: 5 },
        bgcolor: 'white',
        borderRadius: 3,
        border: '3px solid',
        borderColor: 'primary.main',
        textAlign: 'center',
        boxShadow: '0 8px 24px rgba(0, 91, 150, 0.12)'
      }}>
        <Typography
          variant="h6"
          sx={{
            color: 'primary.main',
            fontFamily: 'Raleway, sans-serif',
            fontWeight: 800,
            mb: 5,
            fontSize: { xs: '1.75rem', md: '2.5rem' }
          }}
        >
          Our Impact at a Glance
        </Typography>
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
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
                9
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 600,
                  fontSize: { xs: '1.2rem', md: '1.5rem' }
                }}
              >
                Core Projects
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
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
                1000+
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 600,
                  fontSize: { xs: '1.2rem', md: '1.5rem' }
                }}
              >
                Lives Impacted
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
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
                30+
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 600,
                  fontSize: { xs: '1.2rem', md: '1.5rem' }
                }}
              >
                Years of Service
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
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
                5
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 600,
                  fontSize: { xs: '1.2rem', md: '1.5rem' }
                }}
              >
                Government Partners
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Footer Note */}
      <Box sx={{
        mt: 4,
        p: 3,
        bgcolor: 'white',
        borderRadius: 3,
        border: '3px solid',
        borderColor: 'primary.main',
        textAlign: 'center',
        boxShadow: '0 8px 24px rgba(0, 91, 150, 0.12)'
      }}>
        <Typography
          variant="body1"
          sx={{
            color: 'primary.main',
            fontFamily: 'Raleway, sans-serif',
            fontWeight: 600,
            mb: 1,
            fontSize: { xs: '1rem', md: '1.1rem' }
          }}
        >
          Transforming Lives Through Dedicated Service Since 1991
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontFamily: 'Raleway, sans-serif',
            fontSize: { xs: '0.9rem', md: '1rem' }
          }}
        >
          Operating across rural Hooghly and urban Kolkata areas in partnership with Government of India
          and West Bengal Government initiatives
        </Typography>
      </Box>
    </Container>
  );
}
