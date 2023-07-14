import PasswordOutlined from '@mui/icons-material/PasswordOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Box, Grid, TextField } from '@mui/material';
import Link from '@mui/material/Link';
import { Formik } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import * as yup from 'yup';
import { Alert } from '../../components/alert';
import { Button } from '../../components/button/Button';
import { Feedback } from '../../components/feedback';
import { Portal } from '../../containers/portal';
import { useRequestChangePassword } from '../../services/AuthenticationQueries';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
});

const initialValues = {
  email: '',
};

export const RequestPassword = () => {
  const requestMutation = useRequestChangePassword();

  const handleFormSubmit = (values) => {
    requestMutation.mutate(values.email);
  };

  return (
    <Portal icon={<PasswordOutlined />} title="Request a password change">
      <Box sx={{ mt: 3 }} maxWidth={600}>
        {!requestMutation.isSuccess && (
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
                  <Box display="flex" alignItems="center" mt="20px">
                    <Button fullWidth loading={requestMutation.isLoading}>
                      Request change
                    </Button>
                  </Box>
                  <Box mt="20px">
                    <Alert mutation={requestMutation} />
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        )}
        {requestMutation.isSuccess && (
          <Feedback
            icon={<ThumbUpIcon />}
            header="Check you email, with instruction to change your password"
            subtitle="You can close this windows"
          ></Feedback>
        )}
      </Box>
      <Box display="flex" justifyContent="space-evenly" sx={{ mt: 1 }}>
        <Box display="flex">
          <Link component={RouterLink} to="/login" fontSize={14}>
            Never mind, go back to Sign in
          </Link>
        </Box>
      </Box>
    </Portal>
  );
};
