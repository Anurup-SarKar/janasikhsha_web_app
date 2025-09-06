import React from 'react';
import { Box, Container, Chip, Typography } from '@mui/material';

export default function AdminLayout({ children }) {
    return (
        <Box sx={{ width: '100%', bgcolor: (theme) => theme.palette.background.default, pb: 6 }}>
            <Box sx={{ position: 'sticky', top: 0, zIndex: 10, bgcolor: 'primary.main', color: 'primary.contrastText', boxShadow: '0 2px 10px rgba(0,0,0,0.15)' }}>
                <Container maxWidth="lg">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2 }}>
                        <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: 0.5 }}>Admin Panel</Typography>
                        <Chip label="Internal" color="secondary" size="small" sx={{ fontWeight: 700 }} />
                    </Box>
                </Container>
            </Box>
            {children}
        </Box>
    );
}
