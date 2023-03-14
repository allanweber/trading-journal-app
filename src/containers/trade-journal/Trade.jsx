import { Box } from '@mui/material';
import { Alert } from '../../components/alert';
import { Header } from '../../components/header';
import { LoadingPage } from '../../components/loading-page';
import { useGetEntry } from '../../services/EntryQueries';
import { displayDateExtended } from '../../utilities/dateTimeUtilities';
import { EntryDetails } from '../entries/EntryDetails';

export const Trade = ({ journal, trade }) => {
  const {
    data: entry,
    isFetching,
    error,
  } = useGetEntry(journal.id, trade.tradeId);

  if (!entry) {
    return null;
  }

  return (
    <Box>
      <Header
        title={entry.symbol}
        subtitle={displayDateExtended(trade.date)}
      ></Header>
      <LoadingPage loading={isFetching} />
      <Alert severity="error" show={error}>
        {error && error.message}
      </Alert>
      <EntryDetails entry={entry} />
    </Box>
  );
};
