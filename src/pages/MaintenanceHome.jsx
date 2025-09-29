import React from 'react';
import { Box, Container, Typography, Stack, Button, useTheme, alpha } from '@mui/material';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import QueryBuilderRoundedIcon from '@mui/icons-material/QueryBuilderRounded';

/**
 * Temporary maintenance / under construction landing page.
 * To restore original home page, switch the route in App.jsx back to <Home />.
 */
export default function MaintenanceHome() {
    const theme = useTheme();
    return (
        <Box
            sx={{
                minHeight: 'calc(100vh - 64px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.95)} 0%, ${alpha(theme.palette.primary.dark, 0.85)} 70%)`,
                color: '#fff',
                py: { xs: 8, md: 12 },
            }}
        >
            {/* Decorative blurred blobs */}
            <Box sx={{ position: 'absolute', width: 420, height: 420, top: -100, left: -120, background: `radial-gradient(circle at 30% 30%, ${alpha(theme.palette.secondary.light, 0.55)}, transparent 70%)`, filter: 'blur(40px)', opacity: 0.7 }} />
            <Box sx={{ position: 'absolute', width: 500, height: 500, bottom: -160, right: -140, background: `radial-gradient(circle at 70% 70%, ${alpha(theme.palette.secondary.main, 0.45)}, transparent 70%)`, filter: 'blur(55px)', opacity: 0.65 }} />

            {/* Animated rings */}
            <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                {Array.from({ length: 3 }).map((_, i) => (
                    <Box key={i} sx={{
                        position: 'absolute',
                        top: '50%', left: '50%',
                        width: 300 + i * 180,
                        height: 300 + i * 180,
                        border: `1.5px dashed ${alpha('#fff', 0.15)}`,
                        borderRadius: '50%',
                        transform: 'translate(-50%, -50%)',
                        animation: `spinSlow ${40 - i * 5}s linear infinite`,
                    }} />
                ))}
            </Box>

            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
                <Stack spacing={4} textAlign="center" alignItems="center">
                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ position: 'relative' }}>
                        <Box sx={{
                            width: 68,
                            height: 68,
                            borderRadius: '24px',
                            background: `linear-gradient(145deg, ${theme.palette.secondary.main}, ${theme.palette.primary.dark})`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: `0 10px 30px ${alpha(theme.palette.primary.dark, 0.35)}`,
                            animation: 'floatY 5s ease-in-out infinite',
                        }}>
                            <ConstructionRoundedIcon sx={{ fontSize: 40 }} />
                        </Box>
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 800,
                                fontSize: { xs: '2.1rem', sm: '2.6rem', md: '3.1rem' },
                                letterSpacing: 1,
                                textShadow: '0 4px 20px rgba(0,0,0,0.35)',
                            }}
                        >
                            Janasiksha Prochar Kendra
                        </Typography>
                    </Stack>

                    <Typography variant="h5" sx={{ fontWeight: 600, fontSize: { xs: '1.15rem', md: '1.55rem' }, maxWidth: 780, mx: 'auto', lineHeight: 1.35 }}>
                        Our main site content is currently undergoing improvements.
                    </Typography>

                    <Typography sx={{ fontSize: { xs: '0.95rem', md: '1.05rem' }, opacity: 0.9, maxWidth: 640 }}>
                        Thank you for your patience while we prepare an enhanced experience. Please check back soon. You can still reach us using the contact links below.
                    </Typography>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ pt: 2 }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            startIcon={<QueryBuilderRoundedIcon />}
                            sx={{
                                px: 4,
                                fontWeight: 700,
                                borderRadius: 3,
                                textTransform: 'none',
                                boxShadow: `0 8px 22px ${alpha(theme.palette.secondary.dark, 0.45)}`,
                                backdropFilter: 'blur(4px)',
                            }}
                            disabled
                        >
                            Under Maintenance
                        </Button>
                        <Button
                            variant="outlined"
                            color="inherit"
                            size="large"
                            sx={{
                                px: 4,
                                fontWeight: 700,
                                borderRadius: 3,
                                textTransform: 'none',
                                background: alpha('#fff', 0.07),
                                backdropFilter: 'blur(4px)',
                                '&:hover': { background: alpha('#fff', 0.15) }
                            }}
                            href="mailto:jpk.kolkata@gmail.com"
                        >
                            Contact Us
                        </Button>
                    </Stack>

                    <Typography sx={{ fontSize: '0.85rem', letterSpacing: 1, opacity: 0.7, fontWeight: 600 }}>© {new Date().getFullYear()} Janasiksha Prochar Kendra</Typography>
                </Stack>
            </Container>

            {/* Keyframe styles */}
            <style>{`
        @keyframes spinSlow { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
        @keyframes floatY { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
      `}</style>
        </Box>
    );
}
