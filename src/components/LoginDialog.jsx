// LoginDialog.jsx
// Shows the LoginForm in a modal dialog

import React from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Box, Typography, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LoginForm from './LoginForm';
import { alpha } from '@mui/material/styles';

export default function LoginDialog({ open, onClose, onLogin }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      keepMounted
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: 'saturate(160%) blur(6px)',
            backgroundColor: 'rgba(0,0,0,0.25)'
          }
        }
      }}
      PaperProps={{
        elevation: 8,
        sx: {
          borderRadius: 4,
          overflow: 'hidden',
          border: (theme) => `1px solid ${theme.palette.divider}`,
        }
      }}
    >
      <Box sx={{ position: 'relative', p: 2.5, bgcolor: 'secondary.main' }}>
        <DialogTitle sx={{ p: 0, m: 0, color: 'secondary.contrastText' }}>
          <Typography variant="h5" sx={{ fontWeight: 800, lineHeight: 1.2, color: 'inherit' }}>User Login</Typography>
          <Typography variant="body2" sx={{ mt: 0.5, color: 'inherit', opacity: 0.9 }}>Access your account to continue</Typography>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'secondary.contrastText',
            bgcolor: alpha('#FFFFFF', 0.9),
            border: (theme) => `1px solid ${alpha(theme.palette.common.black, 0.12)}`,
            '&:hover': { bgcolor: alpha('#FFFFFF', 1) }
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <DialogContent sx={{ p: 3 }}>
        <LoginForm onLogin={onLogin} onBack={onClose} hideBackButton embedded loginColor="secondary" />
      </DialogContent>
    </Dialog>
  );
}
