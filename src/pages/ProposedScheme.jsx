// ProposedScheme.jsx
// Proposed Scheme page for the NGO showcasing future initiatives and planned programs.
import React from 'react';
import { 
  Box, 
  Typography, 
  Container,
  List,
  ListItem,
  ListItemText,
  Divider 
} from '@mui/material';

export default function ProposedScheme() {
  const proposedSchemes = [
    "Computer Training Centre",
    "Ambulance Service", 
    "Rural Development in various aspect",
    "Health & Hygiene Programme"
  ];

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
          Proposed Schemes
        </Typography>
        <Divider sx={{ mt: 3, mb: 4, width: 100, mx: 'auto', height: 3, bgcolor: 'secondary.main' }} />
      </Box>

      {/* Schemes List */}
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        <List>
          {proposedSchemes.map((scheme, index) => (
            <ListItem 
              key={index}
              sx={{ 
                py: 2,
                px: 0,
                borderBottom: index < proposedSchemes.length - 1 ? '1px solid rgba(0, 91, 150, 0.1)' : 'none'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Typography 
                  variant="h6"
                  sx={{ 
                    color: 'secondary.main', 
                    fontFamily: 'Raleway, sans-serif',
                    fontWeight: 700,
                    fontSize: '1.5rem',
                    mr: 3,
                    minWidth: '3rem'
                  }}
                >
                  {index + 1}.
                </Typography>
                <ListItemText 
                  primary={scheme}
                  primaryTypographyProps={{
                    sx: {
                      color: 'primary.main',
                      fontFamily: 'Raleway, sans-serif',
                      fontWeight: 600,
                      fontSize: '1.2rem',
                      lineHeight: 1.4
                    }
                  }}
                />
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}