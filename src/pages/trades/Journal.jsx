import { Box } from '@mui/material';
import { Header } from '../../components/header';
import { TradeJournal } from '../../containers/trade-journal/TradeJournal';
import { useJournalContext } from '../../context/JournalContext';

export const Journal = () => {
  const { journal } = useJournalContext();
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={journal.name} />
      </Box>
      <TradeJournal journal={journal} />
    </Box>
  );
};
