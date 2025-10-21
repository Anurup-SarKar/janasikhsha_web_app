// StaffList.jsx
// Staff List page for the Janasiksha Prochar Kendra website.
// Displays information about all staff members organized by project.

import React from 'react';
import { Box, Typography, Grid, Paper, Divider } from '@mui/material';

// Project-wise staff data
const projectStaff = [
  {
    projectName: "Open Shelter for Girls",
    staff: [
      { id: 1, name: "Meghna Patra", designation: "Project Coordinator cum Counsellor" },
      { id: 2, name: "Soma Poddar", designation: "Social Worker" },
      { id: 3, name: "Priyanka Ghosh Bag", designation: "Care Giver" },
      { id: 4, name: "Ruma Sarkar", designation: "Care Giver" },
      { id: 5, name: "Mala Roy", designation: "Out Reach Worker" },
      { id: 6, name: "Dalia Shee", designation: "Out Reach Worker" },
      { id: 7, name: "Tapasi Hembram", designation: "Helper for Cleaning & Cooking" }
    ]
  },
  {
    projectName: "Senior Citizens Home",
    staff: [
      { id: 1, name: "Annapurna Baskey", designation: "Superintendent" },
      { id: 2, name: "Rabindra Nath Ger", designation: "Counsellor cum Social Worker" },
      { id: 3, name: "Sujit Kundu", designation: "Yoga Therapist" },
      { id: 4, name: "Sanaka Roy", designation: "Cook" },
      { id: 5, name: "Lakshmimani Kisku", designation: "Multi-Tasking Staff" },
      { id: 6, name: "Soma Poramanik", designation: "Multi-Tasking Staff" },
      { id: 7, name: "Sanaka Mandi", designation: "Multi-Tasking Staff" },
      { id: 8, name: "Dr. S.K Das", designation: "Medical Doctor" },
      { id: 9, name: "Rita Roy", designation: "Accountant Cum Clerk" }
    ]
  },
  {
    projectName: "Cottage Home",
    staff: [
      { id: 1, name: "Annapurna Baskey", designation: "Superintendent" }
    ]
  },
  {
    projectName: "J. J. Act Home",
    staff: [
      { id: 1, name: "Aparna Saren", designation: "Superintendent" },
      { id: 2, name: "Sudeshna Gupta", designation: "Counsellor" },
      { id: 3, name: "Susmita Ash", designation: "Case Worker" },
      { id: 4, name: "Adarmani Murmu", designation: "House Mother" },
      { id: 5, name: "Tanushri Murmu", designation: "House Mother" },
      { id: 6, name: "Mira Pal", designation: "Para Medical Staff" },
      { id: 7, name: "Sutapa Roy", designation: "Para Medical Staff" },
      { id: 8, name: "Subrata Mukherjee", designation: "Store Keeper Cum Accountant" },
      { id: 9, name: "Jayasri Singh", designation: "Educator" },
      { id: 10, name: "Prosenjit Dey", designation: "Music Teacher" },
      { id: 11, name: "Silpa Patra", designation: "Art & Craft" },
      { id: 12, name: "Sujit Kundu", designation: "P.T. Instructor Cum Yoga Trainer" },
      { id: 13, name: "Namita Roy", designation: "Cook" },
      { id: 14, name: "Reba Paramanik", designation: "Cook" },
      { id: 15, name: "Sukumar Paul", designation: "Helper Cum Watchman" },
      { id: 16, name: "Dilip Kumar Dey", designation: "Helper Cum Watchman" },
      { id: 17, name: "Shrabanti Malik", designation: "House Keeper" }
    ]
  },
  {
    projectName: "Shakti Sadan (Unit-I)",
    staff: [
      { id: 1, name: "Sayani Roy Chowdhury", designation: "Residential Superintendent" },
      { id: 2, name: "Kuntal Bagui", designation: "Office Assistant" },
      { id: 3, name: "Sharmila Hansda", designation: "Multipurpose Staff" },
      { id: 4, name: "Mousumi Malik", designation: "Multipurpose Staff" }
    ]
  },
  {
    projectName: "Shakti Sadan (Unit-II)",
    staff: [
      { id: 1, name: "Mitali Garai", designation: "Residential Superintendent" },
      { id: 2, name: "Rita Roy Saha", designation: "Office Assistant" },
      { id: 3, name: "Shibani Saren", designation: "Multipurpose Staff" },
      { id: 4, name: "Sulekha Maity", designation: "Security Guard/ Night" }
    ]
  }
];

export default function StaffList() {
  return (
    <Box sx={{ 
      bgcolor: (theme) => theme.palette.background.paper, 
      borderRadius: 3, 
      boxShadow: 2, 
      p: { xs: 2, md: 4 }, 
      mb: 3, 
      border: (theme) => `2px solid ${theme.palette.secondary.main}`, 
      maxWidth: 1200, 
      mx: 'auto' 
    }}>
      {/* Page Header */}
      <Typography 
        variant="h2" 
        component="h1" 
        sx={{ 
          fontSize: { xs: '2.5rem', md: '3.5rem' }, 
          color: (theme) => theme.palette.primary.main, 
          fontFamily: 'Raleway, sans-serif', 
          fontWeight: 800, 
          mb: 3, 
          textAlign: 'center', 
          textShadow: '0 2px 8px rgba(0, 91, 150, 0.12)' 
        }}
      >
        Staff Structure
      </Typography>
      
      <Typography 
        variant="h5" 
        sx={{ 
          color: (theme) => theme.palette.text.secondary, 
          fontFamily: 'Raleway, sans-serif', 
          fontWeight: 600, 
          mb: 4, 
          textAlign: 'center',
          fontSize: { xs: '1.1rem', md: '1.3rem' }
        }}
      >
        Our dedicated staff members working across various projects
      </Typography>

      {/* Project-wise Staff Display */}
      {projectStaff.map((project, projectIndex) => (
        <Box key={projectIndex} sx={{ mb: 5 }}>
          {/* Project Title */}
          <Typography
            variant="h4"
            sx={{
              fontFamily: 'Raleway, sans-serif',
              color: (theme) => theme.palette.primary.main,
              fontWeight: 700,
              mb: 3,
              textAlign: 'center',
              fontSize: { xs: '1.8rem', md: '2.2rem' },
              borderBottom: '2px solid',
              borderColor: 'secondary.main',
              pb: 1
            }}
          >
            {project.projectName}
          </Typography>

          {/* Staff Grid for this project */}
          <Grid container spacing={3} justifyContent="center">
            {project.staff.map((staff) => (
              <Grid item xs={12} sm={4} md={4} key={`${projectIndex}-${staff.id}`}>
                <Paper
                  elevation={1}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 2.5,
                    height: 200,
                    width: 200,
                    mx: 'auto',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'secondary.light',
                    backgroundColor: '#fff',
                    '&:hover': {
                      boxShadow: 3,
                      transform: 'translateY(-2px)',
                      transition: 'all 0.3s ease'
                    }
                  }}
                >
                  {/* Staff Number Badge */}
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: 'secondary.main',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 1.5,
                      fontFamily: 'Raleway, sans-serif',
                      fontWeight: 700,
                      fontSize: '1rem'
                    }}
                  >
                    {staff.id}
                  </Box>

                  {/* Staff Name */}
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontFamily: 'Raleway, sans-serif',
                      color: (theme) => theme.palette.primary.main,
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      textAlign: 'center',
                      mb: 1,
                      height: '2.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      lineHeight: 1.2
                    }}
                  >
                    {staff.name}
                  </Typography>

                  {/* Staff Designation */}
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: 'Raleway, sans-serif',
                      color: (theme) => theme.palette.text.primary,
                      textAlign: 'center',
                      fontWeight: 600,
                      fontSize: '0.8rem',
                      lineHeight: 1.3,
                      height: 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {staff.designation}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Add spacing between projects except for the last one */}
          {projectIndex < projectStaff.length - 1 && (
            <Divider sx={{ mt: 4, mb: 2, backgroundColor: 'primary.main', height: 2 }} />
          )}
        </Box>
      ))}

      {/* Footer Message */}
      <Box sx={{ mt: 4, textAlign: 'center', p: 3, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
        <Typography
          variant="body1"
          sx={{
            fontFamily: 'Raleway, sans-serif',
            color: (theme) => theme.palette.primary.main,
            fontWeight: 600,
            fontStyle: 'italic',
            fontSize: { xs: '1rem', md: '1.1rem' }
          }}
        >
          "Our dedicated staff members across all projects work with commitment and compassion 
          to serve the community and fulfill our organization's mission."
        </Typography>
      </Box>
    </Box>
  );
}