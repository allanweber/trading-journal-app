import { Box } from '@mui/material';
import { Header } from '../../components/header';

export const Dashboard = () => {
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Dashboard" subtitle="Welcome To Trading Journal " />
      </Box>
    </Box>
  );
};
