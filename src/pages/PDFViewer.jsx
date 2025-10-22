﻿import React from 'react';
import { Box, Typography, Button, Container, IconButton, useMediaQuery } from '@mui/material';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DownloadIcon from '@mui/icons-material/Download';
import { useTheme } from '@mui/material/styles';
import { getDocumentById } from '../assets/documents/documentsPaths';

export default function PDFViewer() {
  const navigate = useNavigate();
  const { documentId } = useParams();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const docId = documentId || location.state?.documentId || 'memorandumDocument';
  const document = getDocumentById(docId);
  
  if (!document) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h4" color="error" mb={2}>Document Not Found</Typography>
        <Button onClick={() => navigate(-1)} variant="contained">Go Back</Button>
      </Container>
    );
  }

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = encodeURI(document.path);
    link.download = document.title + '.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {isMobile ? (
        // Mobile layout: Back button on top, centered title below
        <Box sx={{ mb: 3 }}>
          <Box sx={{ mb: 2 }}>
            <Button 
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
              sx={{ color: 'primary.main' }}
            >
              Back
            </Button>
          </Box>
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontFamily: 'Raleway, sans-serif', 
              fontWeight: 800, 
              fontSize: '1.5rem',
              color: (theme) => theme.palette.primary.main, 
              textAlign: 'center'
            }}
          >
            {document.title}
          </Typography>
        </Box>
      ) : (
        // Desktop layout: Back button, centered title, download button in one row
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          mb: 3
        }}>
          <Button 
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ color: 'primary.main' }}
          >
            Back
          </Button>
          
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontFamily: 'Raleway, sans-serif', 
              fontWeight: 800, 
              fontSize: '3.5rem',
              color: (theme) => theme.palette.primary.main, 
              flex: 1, 
              textAlign: 'center'
            }}
          >
            {document.title}
          </Typography>

          <Button 
            startIcon={<DownloadIcon />}
            onClick={handleDownload}
            variant="outlined"
          >
            Download
          </Button>
        </Box>
      )}

      <Box sx={{ width: '100%', height: 'calc(100vh - 200px)', border: '1px solid #ccc', borderRadius: 2 }}>
        <iframe
          src={document.path + '#toolbar=1'}
          width="100%"
          height="100%"
          style={{ border: 'none' }}
          title={document.title}
        />
      </Box>
    </Container>
  );
}