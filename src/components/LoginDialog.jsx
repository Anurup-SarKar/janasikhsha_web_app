// LoginDialog.jsx
// Shows the LoginForm in a modal dialog

import React from 'react';
import { Dialog, DialogContent } from '@mui/material';
import LoginForm from './LoginForm';

export default function LoginDialog({ open, onClose, onLogin }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent>
        <LoginForm onLogin={onLogin} onBack={onClose} />
      </DialogContent>
    </Dialog>
  );
}
