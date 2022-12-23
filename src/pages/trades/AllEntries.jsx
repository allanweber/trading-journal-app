import { Box } from '@mui/material';
import { Header } from '../../components/header';
import { AddEntryAction } from '../../containers/entries/AddEntryAction';
import { Entries } from '../../containers/entries/Entries';
import { useJournalContext } from '../../context/JournalContext';

export const AllEntries = () => {
  const { journal } = useJournalContext();
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title={`${journal.name} Trades`}
          subtitle={`all ${journal.name} entries`}
        />
        <Box>
          <AddEntryAction journal={journal} />
        </Box>
      </Box>
      <Entries journal={journal} />
    </Box>
  );
};
