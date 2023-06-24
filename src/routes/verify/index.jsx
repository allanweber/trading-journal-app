import SecurityIcon from '@mui/icons-material/Security';
import { Link } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  Navigate,
  Link as RouterLink,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { Alert } from '../../components/alert';
import { Button } from '../../components/button/Button';
import { useVerify } from '../../services/AuthenticationQueries';

import { Portal } from '../../containers/portal';

export const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const hash = searchParams.get('hash');
  const verifyMutation = useVerify();

  const verifyClick = () => {
    verifyMutation.mutate(hash);
  };

  if (!hash) return <Navigate to="/Login" />;

  return (
    <Portal icon={<SecurityIcon />} title="Verify your registration">
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
          <Alert show={true} severity="error">
            {verifyMutation.error.message === 401 ||
            verifyMutation.error.message === '401'
              ? 'Verification code is invalid, please try again.'
              : verifyMutation.error.message}
          </Alert>
          <Box
            sx={{ mt: 3 }}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <div>
              <Button
                type="button"
                fullWidth
                onClick={() => navigate('/email-verified/again')}
              >
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
    </Portal>
  );
};
