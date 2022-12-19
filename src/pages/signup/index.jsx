import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Avatar, Box, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Feedback } from '../../components/feedback';
import { useIsMobile } from '../../hooks/useIsMobile';
import { ThemeChange } from '../global/theme-change';
import { SignUpForm } from './SignUpForm';

export const SignUp = () => {
  const isMobile = useIsMobile();
  const [registerStatus, setRegisterStatus] = useState(undefined);
  const [status, setStatus] = useState(undefined);

  const onChange = (status) => {
    setRegisterStatus(status);
  };

  useEffect(() => {
    setStatus(registerStatus);
  }, [registerStatus]);

  if (status === 'success') {
    return (
      <Feedback
        icon={<ThumbUpIcon />}
        header="Thank you for creating your account"
        to="/login"
        toLabel="Your user was successfully created, go to login"
      ></Feedback>
    );
  }

  if (status === 'pending') {
    return (
      <Feedback
        icon={<ThumbUpIcon />}
        header="Almost there, check your email to activate your account"
        subtitle="You can close this window or"
        to="/login"
        toLabel="Go back to login"
      ></Feedback>
    );
  }

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
        <Typography variant="h3">Trading Journal Registration</Typography>
        <Box sx={{ mt: 3 }} maxWidth={600}>
          <SignUpForm onChange={onChange} />
        </Box>
        <Box display="flex" justifyContent="end" sx={{ mt: 1 }}>
          <Box display="flex">
            <Link component={RouterLink} to="/login" fontSize={14}>
              Already have an account? Sign in
            </Link>
          </Box>
        </Box>
      </Box>
    </div>
  );
};
