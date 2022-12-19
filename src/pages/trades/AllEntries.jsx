import { Box } from '@mui/material';
import { Header } from '../../components/header';
import { useJournalContext } from '../../context/JournalContext';

export const AllEntries = () => {
  const { journal } = useJournalContext();
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={`All Entries for ${journal.name}`} />
      </Box>
    </Box>
  );
};
