import { Box } from '@mui/material';
import { Header } from '../../components/header';
import { useJournalContext } from '../../context/JournalContext';

export const Dashboard = () => {
  const { journal } = useJournalContext();
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title={`Dashboard ${journal.name}`}
          subtitle="Welcome To Trading Journal "
        />
      </Box>
    </Box>
  );
};
