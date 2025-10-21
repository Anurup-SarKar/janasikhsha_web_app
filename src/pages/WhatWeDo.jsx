import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Card,
  CardContent,
  Grid,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

export default function WhatWeDo() {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState('');

  const reports = [
    {
      id: 'annualReport2022_23',
      year: '2022-2023',
      title: 'Annual Report 2022-2023',
      description: 'Annual report covering activities, achievements, and financial overview for 2022-2023'
    },
    {
      id: 'annualReport2023_24', 
      year: '2023-2024',
      title: 'Annual Report 2023-2024',
      description: 'Annual report covering activities, achievements, and financial overview for 2023-2024'
    }
  ];

  const selectedReport = reports.find(report => report.id === selectedYear);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleViewPDF = () => {
    if (selectedReport) {
      navigate(`/pdf/${selectedReport.id}`);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 }, px: { xs: 2, md: 3 } }}>
      <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
        <Typography 
          variant="h2" 
          color="primary.main" 
          sx={{ 
            mb: 2, 
            fontWeight: 700,
            fontSize: { xs: '2.5rem', md: '3.5rem' }
          }}
        >
          What We Do
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary" 
          sx={{ 
            mb: 2,
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
          }}
        >
          Explore our annual reports to understand our programs and impact
        </Typography>
        <Chip 
          label="Annual Reports & Activities" 
          color="secondary" 
          sx={{ 
            fontWeight: 600,
            fontSize: { xs: '0.75rem', md: '0.875rem' }
          }} 
        />
      </Box>

      <Grid container spacing={{ xs: 2, md: 4 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: { xs: 2, md: 3 } }}>
            <CardContent>
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 3, 
                  fontWeight: 600,
                  fontSize: { xs: '1.25rem', md: '1.5rem' }
                }}
              >
                Select Report Year
              </Typography>
              
              <FormControl 
                fullWidth 
                sx={{ 
                  mb: 3, 
                  minWidth: { xs: 'auto', sm: 300 }
                }}
              >
                <InputLabel>Choose Annual Report Year</InputLabel>
                <Select
                  value={selectedYear}
                  label="Choose Annual Report Year"
                  onChange={handleYearChange}
                  sx={{ 
                    minWidth: { xs: 'auto', sm: 300 },
                    '& .MuiSelect-select': {
                      paddingRight: '32px !important',
                      minWidth: { xs: 'auto', sm: '250px' }
                    }
                  }}
                >
                  <MenuItem value="">
                    <em>Select a year</em>
                  </MenuItem>
                  {reports.map((report) => (
                    <MenuItem key={report.id} value={report.id}>
                      {report.year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {selectedReport && (
                <Box>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                    {selectedReport.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    {selectedReport.description}
                  </Typography>
                  
                  <Button
                    variant="contained"
                    onClick={handleViewPDF}
                    startIcon={<PictureAsPdfIcon />}
                    sx={{ fontWeight: 600 }}
                  >
                    View PDF
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ 
            p: { xs: 2, md: 3 }, 
            textAlign: 'center', 
            minHeight: { xs: 200, md: 300 }, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            {selectedReport ? (
              <Box>
                <PictureAsPdfIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {selectedReport.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Click "View PDF" to open this report
                </Typography>
              </Box>
            ) : (
              <Box>
                <Typography variant="h6" color="text.secondary">
                  Select a year to preview the report
                </Typography>
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
