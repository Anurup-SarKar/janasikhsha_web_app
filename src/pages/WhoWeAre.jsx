// WhoWeAre.jsx
// Who We Are page - Updated with historical content from Brief History PDF
import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Chip } from '@mui/material';

export default function WhoWeAre() {
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: { xs: 2, md: 4 } }}>
      {/* Header Section */}
      <Box sx={{ bgcolor: (theme) => theme.palette.background.paper, borderRadius: 3, boxShadow: 2, p: { xs: 3, md: 5 }, mb: 4, border: (theme) => `2px solid ${theme.palette.secondary.main}` }}>
        <Typography variant="h3" sx={{ color: (theme) => theme.palette.primary.main, fontFamily: 'Raleway, sans-serif', fontWeight: 700, mb: 2, textAlign: 'center', textShadow: '0 2px 8px rgba(0, 91, 150, 0.12)' }}>
          Who We Are
        </Typography>
        <Typography variant="h5" sx={{ color: (theme) => theme.palette.text.primary, fontFamily: 'Raleway, sans-serif', fontWeight: 600, mb: 3, textAlign: 'center' }}>
          Janasiksha Prochar Kendra - A Legacy of Care and Empowerment
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Our Foundation */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', bgcolor: '#f8f9fa', border: '1px solid #e0e0e0' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ color: (theme) => theme.palette.primary.main, fontFamily: 'Raleway, sans-serif', fontWeight: 700, mb: 2 }}>
                Our Foundation
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: 'Raleway, sans-serif', color: (theme) => theme.palette.text.primary, fontSize: '1.1rem', mb: 2, textAlign: 'justify', lineHeight: 1.7 }}>
                <strong>Janasiksha Prochar Kendra</strong> was established through the vision and dedication of the Bengal Presidency Council of Women and the All Bengal Women's Conference, who recognized the urgent need for an independent organization dedicated to the suppression of immoral traffic and the protection of vulnerable women and children.
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: 'Raleway, sans-serif', color: (theme) => theme.palette.text.primary, fontSize: '1.1rem', textAlign: 'justify', lineHeight: 1.7 }}>
                From its inception, our organization has been committed to creating a safe haven for those who have faced exploitation, abuse, and abandonment, providing them with not just shelter, but hope for a dignified future.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Our Mission */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', bgcolor: '#f0f7ff', border: '1px solid #e3f2fd' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ color: (theme) => theme.palette.primary.main, fontFamily: 'Raleway, sans-serif', fontWeight: 700, mb: 2 }}>
                Our Mission
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: 'Raleway, sans-serif', color: (theme) => theme.palette.text.primary, fontSize: '1.1rem', mb: 2, textAlign: 'justify', lineHeight: 1.7 }}>
                We are dedicated to the <strong>right to survive and thrive</strong>. Our mission encompasses the comprehensive care, education, and empowerment of underprivileged girls and women who have faced various forms of social, economic, and physical vulnerabilities.
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: 'Raleway, sans-serif', color: (theme) => theme.palette.text.primary, fontSize: '1.1rem', textAlign: 'justify', lineHeight: 1.7 }}>
                We stand firmly for children's rights, ensuring that every girl in our care receives the support, education, and opportunities necessary to build an independent and fulfilling life.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* What We Do */}
        <Grid item xs={12}>
          <Card sx={{ bgcolor: 'white', boxShadow: 2 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ color: (theme) => theme.palette.primary.main, fontFamily: 'Raleway, sans-serif', fontWeight: 700, mb: 3, textAlign: 'center' }}>
                Our Core Services
              </Typography>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                  <Chip label="Residential Care" variant="outlined" sx={{ width: '100%', p: 1, fontSize: '1rem' }} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Chip label="Education & Training" variant="outlined" sx={{ width: '100%', p: 1, fontSize: '1rem' }} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Chip label="Rehabilitation Support" variant="outlined" sx={{ width: '100%', p: 1, fontSize: '1rem' }} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Chip label="Legal Aid" variant="outlined" sx={{ width: '100%', p: 1, fontSize: '1rem' }} />
                </Grid>
              </Grid>
              <Typography variant="body1" sx={{ fontFamily: 'Raleway, sans-serif', color: (theme) => theme.palette.text.primary, fontSize: '1.1rem', textAlign: 'justify', lineHeight: 1.7, mb: 2 }}>
                Our comprehensive approach ensures that every individual who comes to us receives holistic support. We provide safe residential facilities, quality education, vocational training, psychological counseling, and legal assistance to help survivors rebuild their lives with dignity and independence.
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: 'Raleway, sans-serif', color: (theme) => theme.palette.text.primary, fontSize: '1.1rem', textAlign: 'justify', lineHeight: 1.7 }}>
                Through our various programs, we have created a nurturing environment where healing begins, education flourishes, and new opportunities emerge for those who have faced life's most challenging circumstances.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Our Impact */}
        <Grid item xs={12}>
          <Box sx={{ bgcolor: (theme) => theme.palette.secondary.main, color: 'white', borderRadius: 2, p: 4, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, mb: 3 }}>
              Our Commitment
            </Typography>
            <Typography variant="h6" sx={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600, fontStyle: 'italic', mb: 2 }}>
              "Right To Survive & Thrive. Let's Stand For Children's Right."
            </Typography>
            <Typography variant="body1" sx={{ fontFamily: 'Raleway, sans-serif', fontSize: '1.1rem', opacity: 0.95 }}>
              Your contribution will provide underprivileged children and girls with a chance to learn, aspire, and achieve their dreams. 
              Together, we can continue this legacy of hope and transformation.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
