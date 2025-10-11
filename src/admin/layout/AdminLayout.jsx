import React from 'react';
import { Box, Container, Chip, Typography, Button, Stack, useMediaQuery, useTheme, IconButton, Tooltip } from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

export default function AdminLayout({ children, onLogout }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{ width: '100%', bgcolor: (theme) => theme.palette.background.default, pb: 6 }}>
            <Box sx={{ position: 'sticky', top: 0, zIndex: 10, bgcolor: 'primary.main', color: 'primary.contrastText', boxShadow: '0 2px 10px rgba(0,0,0,0.15)' }}>
                <Container maxWidth="lg">
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', py: { xs: 1.25, sm: 2 } }}>
                        <Stack direction="row" alignItems="center" spacing={2} sx={{ minWidth: 0 }}>
                            <Typography variant={isMobile ? 'h6' : 'h5'} sx={{ fontWeight: 900, letterSpacing: 0.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Admin Panel</Typography>
                            <Chip label="Internal" color="secondary" size="small" sx={{ fontWeight: 700, display: { xs: 'none', sm: 'inline-flex' } }} />
                        </Stack>
                        {onLogout && (
                            isMobile ? (
                                <Tooltip title="Logout">
                                    <IconButton color="inherit" onClick={onLogout} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}>
                                        <LogoutRoundedIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            ) : (
                                <Button
                                    variant="outlined"
                                    color="inherit"
                                    size="medium"
                                    startIcon={<LogoutRoundedIcon />}
                                    onClick={onLogout}
                                    sx={{
                                        color: 'inherit',
                                        borderColor: 'rgba(255,255,255,0.3)',
                                        '&:hover': { borderColor: 'rgba(255,255,255,0.6)', bgcolor: 'rgba(255,255,255,0.1)' }
                                    }}
                                >
                                    Logout
                                </Button>
                            )
                        )}
                    </Box>
                </Container>
            </Box>
            {children}
        </Box>
    );
}
