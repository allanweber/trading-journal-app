import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';

export const LoadingPage = ({ loading }) => {
  return (
    <Backdrop
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
