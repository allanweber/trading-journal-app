import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Grid, TextField, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { Formik } from 'formik';
import { Navigate, Link as RouterLink } from 'react-router-dom';
import * as yup from 'yup';
import { Alert } from '../../components/alert';
import { Button } from '../../components/button/Button';
import { ThemeChange } from '../../components/theme-change';
import {
  doLogin,
  useAuthDispatch,
  useAuthState,
} from '../../context/UserContext';
import { useIsMobile } from '../../hooks/useIsMobile';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const initialValues = {
  email: '',
  password: '',
};

export const SignIn = () => {
  const isMobile = useIsMobile();
  const { user, error, status } = useAuthState();

  const dispatch = useAuthDispatch();

  const handleFormSubmit = (values) => {
    doLogin(dispatch, values.email, values.password);
  };

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
                      autoComplete="username"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="password"
                      label="Password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      name="password"
                      error={!!touched.password && !!errors.password}
                      helperText={touched.password && errors.password}
                      autoComplete="current-password"
                    />
                  </Grid>
                </Grid>
                <Box display="flex" justifyContent="center" mt="20px">
                  <Button fullWidth loading={status === 'pending'}>
                    Login
                  </Button>
                </Box>
              </form>
            )}
          </Formik>

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