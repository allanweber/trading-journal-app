import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { Navigate, Link as RouterLink } from 'react-router-dom';
import { Alert } from '../../components/alert';
import { useAuthState } from '../../context/UserContext';
import { useIsMobile } from '../../hooks/useIsMobile';
import { ThemeChange } from '../global/theme-change';
import { SignInForm } from './SignInForm';

export const SignIn = () => {
  const isMobile = useIsMobile();
  const { user, error, status } = useAuthState();

  if (user) return <Navigate to="/" />;

  return (
    <div>
      <Box
        sx={{
          marginTop: isMobile ? 2 : 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <ThemeChange />
        <Avatar sx={{ m: 2, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h3">Trading Journal Login</Typography>
        <Box sx={{ mt: 3 }}>
          <SignInForm />
          <Alert show={status === 'rejected'} severity="error" sx={{ mt: 1 }}>
            {error === 401 || error === '401'
              ? 'Invalid email or password'
              : error}
          </Alert>
        </Box>
        <Box display="flex" justifyContent="space-evenly" sx={{ mt: 3 }}>
          <Box display="flex">
            <Link component={RouterLink} to="/forgot-password" fontSize={18}>
              Forgot password?
            </Link>
          </Box>
          <Box display="flex" sx={{ ml: 10 }}>
            <Link component={RouterLink} to="/register" fontSize={18}>
              No account? Sign Up
            </Link>
          </Box>
        </Box>
      </Box>
    </div>
  );
};
