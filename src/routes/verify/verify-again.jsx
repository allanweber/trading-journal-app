import SecurityIcon from '@mui/icons-material/Security';
import { Link } from '@mui/material';
import Box from '@mui/material/Box';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Alert } from '../../components/alert';
import { Button } from '../../components/button/Button';

import { Grid, TextField } from '@mui/material';
import { Formik } from 'formik';
import { useEffect } from 'react';
import * as yup from 'yup';
import { Portal } from '../../containers/portal';
import { useSendVerification } from '../../services/AuthenticationQueries';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
});

const initialValues = {
  email: '',
};

export const VerifyAgain = () => {
  const navigate = useNavigate();
  const sendAgainMutation = useSendVerification();
  const handleFormSubmit = (values) => {
    sendAgainMutation.mutate(values.email);
  };

  useEffect(() => {
    if (sendAgainMutation.isSuccess) {
      navigate('/register/success');
    }
  }, [sendAgainMutation, navigate]);

  return (
    <Portal icon={<SecurityIcon />} title="Send Verification code again">
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
    </Portal>
  );
};
