import { Box, FormControlLabel, Grid, Switch, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Alert } from '../../components/alert';
import { Button } from '../../components/button/Button';
import { useRegister } from '../../services/AuthenticationQueries';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  password: yup
    .string()
    .required('Password is required')
    .oneOf([yup.ref('confirmPassword'), null], 'Passwords must match'),
  confirmPassword: yup
    .string()
    .required('Password Confirmation is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const initialValues = {
  companyName: '',
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
  newsletter: true,
};

export const SignUpForm = ({ onChange }) => {
  const mutation = useRegister();
  const handleFormSubmit = (values) => {
    mutation.mutate(values);
  };

  if (mutation.isSuccess) {
    if (mutation.data.enabled) {
      onChange('success');
    } else {
      onChange('pending');
    }
  }

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
          <Grid container spacing={2} padding={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password Confirmation"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmPassword}
                name="confirmPassword"
                error={!!touched.confirmPassword && !!errors.confirmPassword}
                helperText={touched.confirmPassword && errors.confirmPassword}
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Company Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.companyName}
                name="companyName"
                error={!!touched.companyName && !!errors.companyName}
                helperText={touched.companyName && errors.companyName}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControlLabel
                control={
                  <Switch
                    color="secondary"
                    checked={values.newsletter}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.newsletter}
                    name="newsletter"
                  />
                }
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Alert mutation={mutation} />
          <Box display="flex" justifyContent="center" mt="5px" padding={2}>
            <Button fullWidth loading={mutation.isLoading}>
              Register
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};
