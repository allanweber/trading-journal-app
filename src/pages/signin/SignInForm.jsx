import { Box, Grid, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Button } from '../../components/button/Button';
import {
  doLogin,
  useAuthDispatch,
  useAuthState,
} from '../../context/UserContext';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const initialValues = {
  email: '',
  password: '',
};

export const SignInForm = () => {
  const { status } = useAuthState();
  const dispatch = useAuthDispatch();

  const handleFormSubmit = (values) => {
    doLogin(dispatch, values.email, values.password);
  };

  return (
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
  );
};
