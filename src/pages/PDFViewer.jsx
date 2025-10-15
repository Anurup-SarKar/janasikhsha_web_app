// PDFViewer.jsx
// Generic PDF viewer page for displaying any PDF document
// Opens the PDF in an embedded viewer within the browser

import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DownloadIcon from '@mui/icons-material/Download';
import { getDocumentById } from '../assets/documents/documentsPaths';

/**
 * PDFViewer component
 * Generic PDF viewer that can display any PDF document based on URL parameters or location state
 * @returns {JSX.Element} The rendered PDF viewer page
 */
export default function PDFViewer() {
  const navigate = useNavigate();
  const { documentId } = useParams();
  const location = useLocation();
  
  // Get document info from URL params, location state, or default to memorandum
  const docId = documentId || location.state?.documentId || 'memorandumDocument';
  const document = getDocumentById(docId);
  
  // Fallback if document not found
  if (!document) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 }, textAlign: 'center' }}>
        <Typography variant="h4" color="error" mb={2}>Document Not Found</Typography>
        <Button onClick={() => navigate(-1)} variant="contained">Go Back</Button>
      </Container>
    );
  }

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = document.path;
    link.download = `${document.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
      {/* Header with navigation */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Button 
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ 
            color: 'primary.main',
            fontFamily: 'Raleway, sans-serif',
            fontWeight: 500
          }}
        >
          Back
        </Button>
        
        <Typography 
          variant="h4" 
          sx={{ 
            color: 'primary.main', 
            fontFamily: 'Raleway, sans-serif', 
            fontWeight: 700,
            textAlign: 'center',
            flex: 1
          }}
        >
          {document.title}
        </Typography>

        <Button 
          startIcon={<DownloadIcon />}
          onClick={handleDownload}
          variant="outlined"
          sx={{ 
            color: 'secondary.main',
            borderColor: 'secondary.main',
            fontFamily: 'Raleway, sans-serif',
            fontWeight: 500,
            '&:hover': {
              backgroundColor: 'secondary.main',
              color: 'white'
            }
          }}
        >
          Download
        </Button>
      </Box>

      {/* PDF Viewer */}
      <Box 
        sx={{ 
          width: '100%', 
          height: 'calc(100vh - 200px)', 
          border: '1px solid #e0e0e0',
          borderRadius: 2,
          overflow: 'hidden',
          backgroundColor: '#f5f5f5'
        }}
      >
        <iframe
          src={document.path}
          width="100%"
          height="100%"
          style={{ border: 'none' }}
          title={document.title}
          onError={() => {
            console.error(`Failed to load PDF: ${document.path}`);
          }}
        />
      </Box>

      {/* Alternative message for browsers that don't support PDF viewing */}
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          If the document doesn't display properly, please{' '}
          <Button 
            variant="text" 
            onClick={handleDownload}
            sx={{ 
              textTransform: 'none',
              fontWeight: 600,
              p: 0,
              minWidth: 'auto'
            }}
          >
            download the PDF
          </Button>{' '}
          to view it in your default PDF viewer.
        </Typography>
      </Box>
    </Container>
  );
}