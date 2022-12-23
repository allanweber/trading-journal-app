import { Box } from '@mui/material';
import { useState } from 'react';
import { EntrySelect } from '../../components/entry-select';
import { Loading } from '../../components/loading';
import { Search } from '../../components/search';
import { TimeSelect } from '../../components/time-select';
import { useGetEntries } from '../../services/EntryQueries';
import { EntriesTable } from './EntriesTable';

export const ClosedEntries = ({ journal }) => {
  const EntriesTableLoading = Loading(EntriesTable);
  const [symbol, setSymbol] = useState(undefined);

  // private EntryType type;

  // private EntryStatus status;

  // private String from;

  const { data, error, isLoading } = useGetEntries(journal.id, symbol);

  const timeChanged = (time) => {
    console.log(time);
  };

  const onSearch = (value) => {
    setSymbol(value);
  };

  const changeType = (value) => {
    console.log(value);
  };

  return (
    <Box>
      <Box display="flex" alignItems="center">
        <Box>
          <Search placeholder="Symbol" onSearch={onSearch} />
        </Box>
        <Box>
          <EntrySelect filterChanged={changeType} />
        </Box>
        <Box sx={{ ml: 'auto' }}>
          <TimeSelect onChange={timeChanged} />
        </Box>
      </Box>
      <EntriesTableLoading isLoading={isLoading} error={error} rows={data} />
    </Box>
  );
};
