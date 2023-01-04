import { Box, Grid } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Accordion } from '../../components/accordion';
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
      <Accordion title="Filters" override={!isMobile}>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="start"
        >
          <Box item xs padding={1}>
            <Search placeholder="Symbol" onSearch={onSearch} />
          </Box>
          <Box item xs padding={1}>
            <EntrySelect onChange={changeType} />
          </Box>
          {showFilters() && (
            <Box item xs padding={1}>
              <Direction
                showEmpty={true}
                onChange={changeDirection}
                size="small"
              />
            </Box>
          )}
          {showFilters() && (
            <Box item xs padding={1}>
              <WinLose onChange={changeResult} />
            </Box>
          )}
          <Box sx={{ ml: isMobile ? 0 : 'auto' }} padding={1}>
            <TimeSelect onChange={timeChanged} />
          </Box>
        </Grid>
      </Accordion>
      <EntriesTable args={tableProps} />
    </Box>
  );
};
