import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadIcon from '@mui/icons-material/Download';
import { getDocumentById } from '../assets/documents/documentsPaths';

export default function WhatWeDo() {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState('');
  const [showPDF, setShowPDF] = useState(false);

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
    setShowPDF(false); // Hide PDF when year changes
  };

  const handleViewPDF = () => {
    if (selectedReport) {
      setShowPDF(true); // Show PDF viewer
    }
  };

  const handleDownload = () => {
    if (selectedReport) {
      const reportDocument = getDocumentById(selectedReport.id);
      if (reportDocument) {
        const link = document.createElement('a');
        link.href = reportDocument.path;
        link.download = `${reportDocument.title}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 }, px: { xs: 2, md: 3 } }}>
      {/* Page Header */}
      <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
        <Typography 
          variant="h2" 
          component="h1" 
          color="primary.main" 
          sx={{ 
            mb: 3, 
            fontWeight: 800,
            fontSize: { xs: '2.5rem', md: '3.5rem' }
          }}
        >
          What We Do
        </Typography>
        <Typography 
          variant="h5" 
          color="text.secondary"
          sx={{ 
            mb: 4,
            fontWeight: 600,
          }}
        >
          Explore our annual reports to understand our programs and impact
        </Typography>
      </Box>

      {/* Centered Dropdown and Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 4 }}>
        <FormControl sx={{ minWidth: 300 }}>
          <InputLabel>Select Annual Report Year</InputLabel>
          <Select
            value={selectedYear}
            label="Select Annual Report Year"
            onChange={handleYearChange}
          >
            <MenuItem value="">
              <em>Choose a year</em>
            </MenuItem>
            {reports.map((report) => (
              <MenuItem key={report.id} value={report.id}>
                {report.year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <Button
          variant="contained"
          onClick={handleViewPDF}
          startIcon={<PictureAsPdfIcon />}
          disabled={!selectedYear}
          sx={{ 
            fontWeight: 600,
            height: 56 // Match the Select height
          }}
        >
          View PDF
        </Button>
      </Box>

      {/* Report Details (only shown when year is selected) */}
      {selectedReport && (
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
            {selectedReport.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {selectedReport.description}
          </Typography>
          
          <Button
            variant="outlined"
            onClick={handleDownload}
            startIcon={<DownloadIcon />}
            sx={{ fontWeight: 600 }}
          >
            Download PDF
          </Button>
        </Box>
      )}

      {/* PDF Viewer (only shown when showPDF is true) */}
      {showPDF && selectedReport && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', fontWeight: 600 }}>
            {selectedReport.title}
          </Typography>
          <Box 
            sx={{ 
              width: '100%', 
              height: 'calc(100vh - 400px)', 
              minHeight: '600px',
              border: '2px solid', 
              borderColor: 'primary.main',
              borderRadius: 2,
              overflow: 'hidden'
            }}
          >
            <iframe
              src={getDocumentById(selectedReport.id)?.path + '#toolbar=1'}
              width="100%"
              height="100%"
              style={{ border: 'none' }}
              title={selectedReport.title}
            />
          </Box>
        </Box>
      )}
    </Container>
  );
}
