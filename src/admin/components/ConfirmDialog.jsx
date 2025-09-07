import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Slide, Stack, Typography, Button, Box } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmDialog({ open, title = 'Are you sure?', message, confirmText = 'Confirm', cancelText = 'Cancel', onCancel, onConfirm, loading }) {
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={onCancel}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: (t) => `0 12px 40px ${t.palette.mode === 'dark' ? 'rgba(0,0,0,.6)' : 'rgba(0,0,0,.2)'}`,
                },
            }}
        >
            <Box sx={{
                background: (t) => `linear-gradient(135deg, ${t.palette.primary.light} 0%, ${t.palette.primary.main} 100%)`,
                color: (t) => t.palette.getContrastText(t.palette.primary.main),
                px: 3, py: 2,
            }}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                    <InfoOutlinedIcon />
                    <DialogTitle sx={{ p: 0, fontWeight: 800 }}>{title}</DialogTitle>
                </Stack>
            </Box>
            <DialogContent sx={{ pt: 2 }}>
                <Typography color="text.secondary">{message}</Typography>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onCancel} disabled={loading} sx={{ mr: 1 }}>{cancelText}</Button>
                <Button variant="contained" color="error" onClick={onConfirm} disabled={loading}>
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
