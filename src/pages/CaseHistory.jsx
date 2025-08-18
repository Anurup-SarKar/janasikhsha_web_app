// CaseHistory.jsx
// Case History page for the Janasiksha Prochar Kendra website.
// Displays case studies and stories of impact from the NGO's work.
// Follows accessible, modern, and empathetic design.

import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';

/**
 * CaseHistory page component
 * Shows case studies and stories of impact from the NGO's work.
 * @returns {JSX.Element} The rendered Case History page
 */

const cases = [
  {
    title: 'Case 1: Rekha',
    desc: 'Rekha, a minor girl, was rescued from a trafficking racket and brought to Janasiksha Prochar Kendra. With counseling, education, and vocational training, she has now completed her schooling and is pursuing a diploma in nursing.'
  },
  {
    title: 'Case 2: Sita',
    desc: 'Sita was abandoned by her family and found shelter at Janasiksha Prochar Kendra. She excelled in her studies and is now working as a teacher, inspiring other girls to follow their dreams.'
  },
  {
    title: 'Case 3: Maya',
    desc: 'Maya, a survivor of abuse, received psychological support and care at Janasiksha Prochar Kendra. She has been successfully reintegrated with her family and continues her education.'
  },
  {
    title: 'Case 4: Laxmi',
    desc: 'Laxmi was rescued from child labor and given a new life at Janasiksha Prochar Kendra. She is now a skilled tailor and supports herself independently.'
  },
];

export default function CaseHistory() {
  return (
    <Box sx={{ bgcolor: (theme) => theme.palette.background.paper, borderRadius: 3, boxShadow: 2, p: { xs: 2, md: 5 }, mb: 3, border: (theme) => `2px solid ${theme.palette.secondary.main}`, maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h3" sx={{ color: (theme) => theme.palette.primary.main, fontFamily: 'Raleway, sans-serif', fontWeight: 700, mb: 2, textAlign: 'center', textShadow: '0 2px 8px rgba(0, 91, 150, 0.12)', fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' }, lineHeight: 1.15 }}>
        Case History
      </Typography>
      <Typography variant="h5" sx={{ color: (theme) => theme.palette.text.primary, fontFamily: 'Raleway, sans-serif', fontWeight: 600, mb: 3, textAlign: 'center' }}>
        Stories of Change
      </Typography>
      <Grid container spacing={3}>
        {cases.map((c, idx) => (
          <Grid item xs={12} sm={6} key={idx}>
            <Card sx={{ bgcolor: '#fff', borderRadius: 2, boxShadow: 1, minHeight: 140 }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: (theme) => theme.palette.secondary.main, fontFamily: 'Raleway, sans-serif', fontWeight: 700, mb: 1 }}>{c.title}</Typography>
                <Typography variant="body2" sx={{ fontFamily: 'Raleway, sans-serif', color: (theme) => theme.palette.text.primary }}>{c.desc}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography variant="body1" sx={{ fontFamily: 'Raleway, sans-serif', color: (theme) => theme.palette.primary.main, fontWeight: 600, mt: 4, textAlign: 'center' }}>
        "Every story is a testament to hope, resilience, and the power of support."
      </Typography>
    </Box>
  );
}
