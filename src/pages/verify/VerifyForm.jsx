import SecurityIcon from '@mui/icons-material/Security';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Box, Grid, Link, TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Formik } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import * as yup from 'yup';
import { Alert } from '../../components/alert';
import { Button } from '../../components/button/Button';
import { Feedback } from '../../components/feedback';
import { ThemeChange } from '../../components/theme-change';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useSendVerification } from '../../services/AuthenticationQueries';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
});

const initialValues = {
  email: 'emailfortestsallan@gmail.com',
};

export const VerifyForm = () => {
  const isMobile = useIsMobile();
  const sendAgainMutation = useSendVerification();

  const handleFormSubmit = (values) => {
    sendAgainMutation.mutate(values.email);
  };

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
};
