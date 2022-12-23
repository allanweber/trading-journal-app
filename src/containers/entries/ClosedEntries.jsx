import { Box } from '@mui/material';
import { useState } from 'react';
import { EntrySelect } from '../../components/entry-select';
import { Search } from '../../components/search';
import { TimeSelect } from '../../components/time-select';
import { EntriesTable } from './EntriesTable';

export const ClosedEntries = ({ journal }) => {
  const [tableProps, setTableProps] = useState({ journal, status: 'CLOSED' });

  const timeChanged = (time) => {
    setTableProps({ ...tableProps, from: time });
  };

  const onSearch = (value) => {
    setTableProps({ ...tableProps, symbol: value });
  };

  const changeType = (value) => {
    setTableProps({ ...tableProps, type: value });
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
      <EntriesTable args={tableProps} />
    </Box>
  );
};
