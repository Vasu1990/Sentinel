import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useAppStore } from '../store/useAppStore';

const SnackbarProvider: React.FC = () => {
  const { snackbar, hideSnackbar } = useAppStore();

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    hideSnackbar();
  };

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: '100%' }}>
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarProvider;
