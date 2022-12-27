import { Box } from '@mui/material';
import { useState } from 'react';
import { Direction } from '../../components/direction/Direction';
import { Search } from '../../components/search';
import { EntriesTable } from './EntriesTable';

export const OpenEntries = ({ journal }) => {
  const [tableProps, setTableProps] = useState({
    journal,
    status: 'OPEN',
  });

  const onSearch = (value) => {
    setTableProps({ ...tableProps, symbol: value });
  };

  const changeDirection = (value) => {
    setTableProps({ ...tableProps, direction: value });
  };

  return (
    <Box>
      <Box display="flex" alignItems="center">
        <Box>
          <Search placeholder="Symbol" onSearch={onSearch} />
        </Box>
        <Box>
          <Direction showEmpty={true} onChange={changeDirection} />
        </Box>
      </Box>
      <EntriesTable args={tableProps} />
    </Box>
  );
};
