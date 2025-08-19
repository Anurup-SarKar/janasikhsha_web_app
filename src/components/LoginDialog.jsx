// LoginDialog.jsx
// Shows the LoginForm in a modal dialog

import React from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Box, Typography, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LoginForm from './LoginForm';
import { alpha } from '@mui/material/styles';

export default function LoginDialog({ open, onClose, onLogin }) {
  // Track which section is active (login or forgot password)
  const [showForgot, setShowForgot] = React.useState(false);
  // Bump a key each time dialog opens to reset form state
  const [resetKey, setResetKey] = React.useState(0);

  // Ensure dialog always opens on the Login view and resets internal form state
  React.useEffect(() => {
    if (open) {
      setShowForgot(false);
      setResetKey((k) => k + 1);
    }
  }, [open]);

  // Custom handler to pass to LoginForm for toggling sections
  const handleShowForgot = () => setShowForgot(true);
  const handleShowLogin = () => setShowForgot(false);

  // Wrap close to reset state then delegate
  const handleClose = () => {
    setShowForgot(false);
    onClose?.();
  };

  // Dialog header text and subtitle
  const headerText = showForgot ? 'Forgot Password' : 'User Login';
  const subtitleText = showForgot ? 'Enter your email to reset your password' : 'Access your account to continue';

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      // Removed keepMounted so content unmounts, clearing form state when closed
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
      <Box sx={{ position: 'relative', p: 2.5, bgcolor: 'primary.main' }}>
        <DialogTitle sx={{ p: 0, m: 0, color: 'primary.contrastText' }}>
          <Typography variant="h5" sx={{ fontWeight: 800, lineHeight: 1.2, color: 'inherit' }}>{headerText}</Typography>
          <Typography variant="body2" sx={{ mt: 0.5, color: 'inherit', opacity: 0.9 }}>{subtitleText}</Typography>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.primary.main,
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
        <LoginForm
          key={resetKey}
          onLogin={() => { onLogin?.(); handleClose(); }}
          onBack={handleClose}
          hideBackButton
          embedded
          loginColor="secondary"
          showForgot={showForgot}
          onShowForgot={handleShowForgot}
          onShowLogin={handleShowLogin}
        />
      </DialogContent>
    </Dialog>
  );
}