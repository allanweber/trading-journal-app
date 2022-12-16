import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Header } from '../../components/header';
import { Loading } from '../../components/loading';
import { useGetBalance, useGetJournal } from '../../services/JournalQueries';
import { AddEntryAction } from '../entries/AddEntryAction';
import { EntriesTable } from '../entries/EntriesTable';
import { JournalBalance } from './JournalBalance';

export const Journal = () => {
  const params = useParams();
  const journalId = params.journalId;
  const {
    data: journal,
    error: journalError,
    isLoading: journalIsLoading,
  } = useGetJournal(journalId);
  const {
    data: balance,
    error: balanceError,
    isLoading: balanceIsLoading,
  } = useGetBalance(journalId);

  const JournalHeader = Loading(Header);
  const Balance = Loading(JournalBalance);

  if (!journal) {
    return <div></div>;
  }

  return (
    <div>
      <Box m="10px">
        <Box display="flex" justifyContent="space-between">
          <JournalHeader
            isLoading={journalIsLoading}
            error={journalError}
            title={journal.name}
            subtitle="Add Trades and Transactions"
          />
          <Box>
            <AddEntryAction journal={journal} />
          </Box>
        </Box>
        <Balance
          isLoading={balanceIsLoading}
          error={balanceError}
          balance={balance}
        />
        <EntriesTable journal={journal} />
      </Box>
    </div>
  );
};
