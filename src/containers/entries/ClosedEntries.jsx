import { Box, Grid } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Accordion } from '../../components/accordion';
import { Direction } from '../../components/direction/Direction';
import { EntrySelect } from '../../components/entry-select';
import { Search } from '../../components/search';
import { StrategySelect } from '../../components/strategy-select';
import { TimeSelect } from '../../components/time-select';
import { WinLose } from '../../components/win-lose';
import { useIsMobile } from '../../hooks/useIsMobile';
import { apiFormat } from '../../utilities/dateTimeUtilities';
import { EntriesTable } from './EntriesTable';

export const ClosedEntries = ({ journal }) => {
  const isMobile = useIsMobile();
  const [filters, setFilters] = useState({
    journal,
    status: 'CLOSED',
    type: 'TRADE',
    from: apiFormat(dayjs().startOf('date')),
  });

  const timeChanged = (time) => {
    setFilters({ ...filters, from: time });
  };

  const onSearch = (value) => {
    setFilters({ ...filters, symbol: value });
  };

  const changeType = (value) => {
    setFilters({ ...filters, type: value });
  };

  const changeDirection = (value) => {
    setFilters({ ...filters, direction: value });
  };

  const changeResult = (value) => {
    setFilters({ ...filters, result: value });
  };

  const showFilters = () => {
    return filters.type === 'TRADE' || filters.type === undefined;
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
          <Box padding={1}>
            <Search placeholder="Symbol" onSearch={onSearch} />
          </Box>
          <Box padding={1}>
            <EntrySelect onChange={changeType} />
          </Box>
          {showFilters() && (
            <Box padding={1}>
              <Direction
                showEmpty={true}
                onChange={changeDirection}
                size="small"
              />
            </Box>
          )}
          {showFilters() && (
            <Box padding={1}>
              <WinLose onChange={changeResult} />
            </Box>
          )}
          {showFilters() && (
            <Box padding={1}>
              <StrategySelect small />
            </Box>
          )}
          <Box sx={{ ml: isMobile ? 0 : 'auto' }} padding={1}>
            <TimeSelect onChange={timeChanged} />
          </Box>
        </Grid>
      </Accordion>
      <EntriesTable args={filters} />
    </Box>
  );
};
