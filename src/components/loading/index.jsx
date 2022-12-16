import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert } from '../alert';

export const Loading = (Component) => {
  return function LoadingComponent({
    isLoading = false,
    error = undefined,
    ...props
  }) {
    if (error) {
      return (
        <Alert severity="error" show={true}>
          {error.message}
        </Alert>
      );
    }

    if (!isLoading) return <Component {...props} />;

    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  };
};
