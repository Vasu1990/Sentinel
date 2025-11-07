import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import { useAppStore } from '../store/useAppStore';

const LoadingBackdrop: React.FC = () => {
  const isLoading = useAppStore((state) => state.isLoading);

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingBackdrop;
