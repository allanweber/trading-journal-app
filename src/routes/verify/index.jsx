import SecurityIcon from '@mui/icons-material/Security';
import { Link } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import {
  Navigate,
  Link as RouterLink,
  useSearchParams,
} from 'react-router-dom';
import { Alert } from '../../components/alert';
import { Button } from '../../components/button/Button';
import { ThemeChange } from '../../components/theme-change';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useVerify } from '../../services/AuthenticationQueries';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Grid, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Feedback } from '../../components/feedback';
import { useSendVerification } from '../../services/AuthenticationQueries';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
});

const initialValues = {
  email: '',
};

export const VerifyEmail = () => {
  const isMobile = useIsMobile();
  const [searchParams] = useSearchParams();
  const hash = searchParams.get('hash');
  const [tryAgain, setTryAgain] = useState(false);
  const sendAgainMutation = useSendVerification();

  const handleFormSubmit = (values) => {
    sendAgainMutation.mutate(values.email);
  };

  const verifyMutation = useVerify();

  const verifyClick = () => {
    verifyMutation.mutate(hash);
  };

  if (!hash) return <Navigate to="/Login" />;

  if (tryAgain) {
    return (
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
          <SecurityIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Send Verification code again
        </Typography>
        <Box width={300} marginTop={2}>
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={schema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                </Grid>
                <Box display="flex" justifyContent="center" mt="20px">
                  <Button fullWidth loading={sendAgainMutation.isLoading}>
                    Send verification again
                  </Button>
                  <Alert mutation={sendAgainMutation} />
                </Box>
              </form>
            )}
          </Formik>
          <Box sx={{ mt: 3 }} width={300}>
            <Box
              sx={{ mt: 3 }}
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Box marginTop={1}>
                <Link component={RouterLink} to="/login">
                  Go back to login and start trading
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  if (sendAgainMutation.isSuccess) {
    return (
      <Feedback
        icon={<ThumbUpIcon />}
        header="Almost there, check your email to activate your account"
        subtitle="You can close this window or"
        to="/login"
        toLabel="Go back to login and start trading"
      ></Feedback>
    );
  }

  return (
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
        <SecurityIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Verify your registration
      </Typography>

      {verifyMutation.isIdle && (
        <Box display="flex" sx={{ mt: 3 }} width={300}>
          <Button
            type="button"
            fullWidth
            loading={verifyMutation.isLoading}
            onClick={verifyClick}
          >
            Verify your email
          </Button>
        </Box>
      )}
      {verifyMutation.isSuccess && (
        <div>
          <Typography component="h1" variant="h3" marginTop={5}>
            Email Successfully Verified
          </Typography>
          <Box sx={{ mt: 2 }} display="flex" justifyContent="center">
            <Link component={RouterLink} to="/login" fontSize={18}>
              Go back to login and start trading
            </Link>
          </Box>
        </div>
      )}
      {verifyMutation.isError && (
        <Box sx={{ mt: 3 }} width={300}>
          <Alert mutation={verifyMutation} />
          <Box
            sx={{ mt: 3 }}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <div>
              <Button type="button" fullWidth onClick={() => setTryAgain(true)}>
                Problems? Send the the code again
              </Button>
            </div>
            <Box marginTop={5}>
              <Link component={RouterLink} to="/login">
                Go back to login and start trading
              </Link>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};
