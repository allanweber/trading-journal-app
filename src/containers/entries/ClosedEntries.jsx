import { Box, Grid } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Accordion } from '../../components/accordion';
import { Direction } from '../../components/direction/Direction';
import { EntrySelect } from '../../components/entry-select';
import { Search } from '../../components/search';
import { StrategySelect } from '../../components/strategy-select';
import { TimeSelect } from '../../components/time-select';
import { WinLose } from '../../components/win-lose';
import { useJournalContext } from '../../context/JournalContext';
import { useIsMobile } from '../../hooks/useIsMobile';
import { apiFormat } from '../../utilities/dateTimeUtilities';
import { EntriesTable } from './EntriesTable';

export const ClosedEntries = () => {
  const { journal } = useJournalContext();
  const isMobile = useIsMobile();
  const [filters, setFilters] = useState({
    journal,
    status: 'CLOSED',
    type: 'TRADE',
    from: apiFormat(dayjs().startOf('date')),
  });

  useEffect(() => {
    setFilters({
      journal,
      status: 'CLOSED',
      type: 'TRADE',
      from: apiFormat(dayjs().startOf('date')),
    });
  }, [journal]);

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

  const changeStrategies = (values) => {
    const ids = values && values.map((strategy) => strategy.id);
    setFilters({ ...filters, strategies: ids });
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
          <Search placeholder="Symbol" onSearch={onSearch} />
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
              <StrategySelect
                onChanged={changeStrategies}
                // initialValues={strategies}
                small
              />
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
