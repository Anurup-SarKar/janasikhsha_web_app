// LatestProjects.jsx
// Latest Projects page for the NGO showcasing all current initiatives and programs.
import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Container,
  Chip,
  Divider 
} from '@mui/material';
import { styled } from '@mui/material/styles';

const ProjectCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease-in-out',
  borderRadius: 12,
  boxShadow: '0 4px 12px rgba(0, 91, 150, 0.1)',
  border: `1px solid ${theme.palette.primary.light}20`,
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 25px rgba(0, 91, 150, 0.15)',
  },
}));

const ProjectTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  fontWeight: 700,
  color: theme.palette.primary.main,
  fontFamily: 'Raleway, sans-serif',
  marginBottom: theme.spacing(1.5),
  lineHeight: 1.4,
  textAlign: 'left',
  display: 'block',
}));

const ProjectDescription = styled(Typography)(({ theme }) => ({
  fontSize: '0.95rem',
  color: theme.palette.text.secondary,
  fontFamily: 'Raleway, sans-serif',
  fontStyle: 'italic',
  lineHeight: 1.5,
  textAlign: 'left',
  display: 'block',
}));

const projects = [
  {
    id: 1,
    title: "Home Under J.J.Act: (CNCP Home for girls)",
    description: "under Mission Vatsalya, under Govt. of India",
    category: "Child Protection"
  },
  {
    id: 2,
    title: "Cottage Home",
    description: "under Directorate of Child Rights and Trafficking, West Bengal Government",
    category: "Child Welfare"
  },
  {
    id: 3,
    title: "Shakti Sadan (Unit-I & II)",
    description: "under Mission Shakti, Govt. of India",
    category: "Women Empowerment"
  },
  {
    id: 4,
    title: "Senior Citizens' Home",
    description: "under Atal Vayo Abhudhaya Yojana under National Action Plan for Senior Citizen under The Ministry of Social Justice & Empowerment Govt. of India",
    category: "Elderly Care"
  },
  {
    id: 5,
    title: "Open Shelter for Girls",
    description: "under Mission Vatsalya Govt. of India",
    category: "Child Protection"
  },
  {
    id: 6,
    title: "ICDS (Integrated Child Development Scheme)",
    description: "in Red Light Areas under Govt. of West Bengal",
    category: "Community Development"
  },
  {
    id: 7,
    title: "Health Services",
    description: "Comprehensive healthcare and medical support programs",
    category: "Healthcare"
  },
  {
    id: 8,
    title: "Vocational Training cum Production Centre",
    description: "Skill development and livelihood generation programs",
    category: "Skill Development"
  },
  {
    id: 9,
    title: "Library",
    description: "Educational resources and literacy promotion initiatives",
    category: "Education"
  }
];

const categoryColors = {
  "Child Protection": "#FF6B35",
  "Child Welfare": "#4ECDC4",
  "Women Empowerment": "#E91E63",
  "Elderly Care": "#9C27B0",
  "Community Development": "#2196F3",
  "Healthcare": "#4CAF50",
  "Skill Development": "#FF9800",
  "Education": "#795548"
};

export default function LatestProjects() {
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
          Latest Projects
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            color: 'text.secondary', 
            fontFamily: 'Raleway, sans-serif',
            maxWidth: 600,
            mx: 'auto',
            lineHeight: 1.6,
            fontWeight: 400
          }}
        >
          Our comprehensive initiatives spanning child protection, women empowerment, elderly care, 
          and community development programs supported by various government schemes.
        </Typography>
        <Divider sx={{ mt: 3, mb: 4, width: 100, mx: 'auto', height: 3, bgcolor: 'secondary.main' }} />
      </Box>

      {/* Projects Grid */}
      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <ProjectCard>
              <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                {/* Category Chip */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                  <Chip 
                    label={project.category}
                    size="small"
                    sx={{
                      backgroundColor: categoryColors[project.category] + '20',
                      color: categoryColors[project.category],
                      fontWeight: 600,
                      fontSize: '0.75rem'
                    }}
                  />
                </Box>
                
                {/* Project Content */}
                <Box sx={{ flexGrow: 1, textAlign: 'left' }}>
                  <ProjectTitle>
                    {project.title}
                  </ProjectTitle>
                  <ProjectDescription>
                    {project.description}
                  </ProjectDescription>
                </Box>
              </CardContent>
            </ProjectCard>
          </Grid>
        ))}
      </Grid>

      {/* Footer Note */}
      <Box sx={{ mt: 6, p: 3, bgcolor: 'primary.main', borderRadius: 2, textAlign: 'center' }}>
        <Typography 
          variant="body1" 
          sx={{ 
            color: 'white', 
            fontFamily: 'Raleway, sans-serif',
            fontWeight: 500,
            mb: 1
          }}
        >
          Transforming Lives Through Dedicated Service
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'rgba(255,255,255,0.8)', 
            fontFamily: 'Raleway, sans-serif'
          }}
        >
          All our projects are implemented in partnership with Government of India and West Bengal Government initiatives
        </Typography>
      </Box>
    </Container>
  );
}
