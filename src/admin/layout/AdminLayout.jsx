import React from 'react';
import { Box, Container, Chip, Typography, Button, Stack } from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

export default function AdminLayout({ children, onLogout }) {
    return (
        <Box sx={{ width: '100%', bgcolor: (theme) => theme.palette.background.default, pb: 6 }}>
            <Box sx={{ position: 'sticky', top: 0, zIndex: 10, bgcolor: 'primary.main', color: 'primary.contrastText', boxShadow: '0 2px 10px rgba(0,0,0,0.15)' }}>
                <Container maxWidth="lg">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 2 }}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: 0.5 }}>Admin Panel</Typography>
                            <Chip label="Internal" color="secondary" size="small" sx={{ fontWeight: 700 }} />
                        </Stack>
                        {onLogout && (
                            <Button
                                variant="outlined"
                                color="inherit"
                                size="small"
                                startIcon={<LogoutRoundedIcon />}
                                onClick={onLogout}
                                sx={{
                                    color: 'inherit',
                                    borderColor: 'rgba(255,255,255,0.3)',
                                    '&:hover': {
                                        borderColor: 'rgba(255,255,255,0.6)',
                                        bgcolor: 'rgba(255,255,255,0.1)'
                                    }
                                }}
                            >
                                Logout
                            </Button>
                        )}
                    </Box>
                </Container>
            </Box>
            {children}
        </Box>
    );
}
