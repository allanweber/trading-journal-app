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
  const [type, setType] = useState(undefined);

  // private EntryStatus status;

  // private String from;
  const status = 'CLOSED';
  const { data, error, isLoading } = useGetEntries(
    journal.id,
    status,
    symbol,
    type
  );

  const timeChanged = (time) => {
    console.log(time);
  };

  const onSearch = (value) => {
    setSymbol(value);
  };

  const changeType = (value) => {
    setType(value);
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
