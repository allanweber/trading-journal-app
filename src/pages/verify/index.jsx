import SecurityIcon from '@mui/icons-material/Security';
import { Link } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import {
  Link as RouterLink,
  Navigate,
  useSearchParams,
} from 'react-router-dom';
import { Alert } from '../../components/alert';
import { Button } from '../../components/button/Button';
import { ThemeChange } from '../../components/theme-change';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useVerify } from '../../services/AuthenticationQueries';
import { VerifyForm } from './VerifyForm';

export const VerifyEmail = () => {
  const isMobile = useIsMobile();
  const [searchParams] = useSearchParams();
  const hash = searchParams.get('hash');
  const [tryAgain, setTryAgain] = useState(false);

  const verifyMutation = useVerify();

  const verifyClick = () => {
    verifyMutation.mutate(hash);
  };

  if (!hash) return <Navigate to="/Login" />;

  if (tryAgain) {
    return <VerifyForm />;
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
