import PasswordOutlined from '@mui/icons-material/PasswordOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Grid, Link, TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Formik } from 'formik';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import * as yup from 'yup';
import { Alert } from '../../components/alert';
import { Button } from '../../components/button/Button';
import { Feedback } from '../../components/feedback';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useChangePassword } from '../../services/AuthenticationQueries';
import { ThemeChange } from '../global/theme-change';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
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
  email: '',
  password: '',
  confirmPassword: '',
};

export const ChangePassword = () => {
  const isMobile = useIsMobile();
  const [searchParams] = useSearchParams();
  const hash = searchParams.get('hash');
  const changeMutation = useChangePassword();

  const handleFormSubmit = (values) => {
    changeMutation.mutate({ ...values, hash: hash });
  };

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
          <PasswordOutlined />
        </Avatar>
        <Typography variant="h3">Change password</Typography>
        <Box sx={{ mt: 3 }} maxWidth={600}>
          {!changeMutation.isSuccess && (
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
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          fullWidth
                          variant="filled"
                          type="password"
                          label="Password Confirmation"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.confirmPassword}
                          name="confirmPassword"
                          error={
                            !!touched.confirmPassword &&
                            !!errors.confirmPassword
                          }
                          helperText={
                            touched.confirmPassword && errors.confirmPassword
                          }
                        />
                      </Grid>
                    </Grid>
                    <Box display="flex" alignItems="center" mt="20px">
                      <Button fullWidth loading={changeMutation.isLoading}>
                        Change password
                      </Button>
                    </Box>
                    <Box mt="20px">
                      <Alert mutation={changeMutation} />
                    </Box>
                  </form>
                )}
              </Formik>
            </Box>
          )}
          {changeMutation.isSuccess && (
            <Feedback
              icon={<ThumbUpIcon />}
              header="Your password was successfully change"
              subtitle="You can close this windows"
            ></Feedback>
          )}
        </Box>
        <Box display="flex" justifyContent="space-evenly" sx={{ mt: 1 }}>
          <Box display="flex">
            <Link component={RouterLink} to="/login" fontSize={14}>
              Go back to Sign in
            </Link>
          </Box>
        </Box>
      </Box>
    </div>
  );
};
