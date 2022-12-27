import { Box } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Direction } from '../../components/direction/Direction';
import { EntrySelect } from '../../components/entry-select';
import { Search } from '../../components/search';
import { TimeSelect } from '../../components/time-select';
import { WinLose } from '../../components/win-lose';
import { useIsMobile } from '../../hooks/useIsMobile';
import { apiFormat } from '../../utilities/dateTimeUtilities';
import { EntriesTable } from './EntriesTable';

export const ClosedEntries = ({ journal }) => {
  const isMobile = useIsMobile();
  const [tableProps, setTableProps] = useState({
    journal,
    status: 'CLOSED',
    type: 'TRADE',
    from: apiFormat(dayjs().startOf('date')),
  });

  const timeChanged = (time) => {
    setTableProps({ ...tableProps, from: time });
  };

  const onSearch = (value) => {
    setTableProps({ ...tableProps, symbol: value });
  };

  const changeType = (value) => {
    setTableProps({ ...tableProps, type: value });
  };

  const changeDirection = (value) => {
    setTableProps({ ...tableProps, direction: value });
  };

  const changeResult = (value) => {
    setTableProps({ ...tableProps, result: value });
  };

  const showFilters = () => {
    return tableProps.type === 'TRADE' || tableProps.type === undefined;
  };

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        flexDirection={isMobile ? 'column' : 'row'}
      >
        <Box>
          <Search placeholder="Symbol" onSearch={onSearch} />
        </Box>
        <Box>
          <EntrySelect onChange={changeType} />
        </Box>
        {showFilters() && (
          <Box>
            <Direction showEmpty={true} onChange={changeDirection} />
          </Box>
        )}
        {showFilters() && (
          <Box>
            <WinLose onChange={changeResult} />
          </Box>
        )}
        <Box sx={{ ml: 'auto' }}>
          <TimeSelect onChange={timeChanged} />
        </Box>
      </Box>
      <EntriesTable args={tableProps} />
    </Box>
  );
};
