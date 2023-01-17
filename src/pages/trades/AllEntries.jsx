import { Badge, Box } from '@mui/material';
import { useContext } from 'react';
import { Header } from '../../components/header';
import { AddEntryAction } from '../../containers/entries/AddEntryAction';
import { Entries } from '../../containers/entries/Entries';
import { JournalContext } from '../../context/JournalContext';
import { useGetOpenTradesCount } from '../../services/TradeQueries';

export const AllEntries = () => {
  const { journal } = useContext(JournalContext);
  const { data: count, isSuccess } = useGetOpenTradesCount(journal.id);
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title={
            <Badge
              badgeContent={isSuccess && count.trades}
              max={99}
              color="success"
            >
              {`${journal.name} Trades`}
            </Badge>
          }
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
