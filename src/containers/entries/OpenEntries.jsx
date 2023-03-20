import { Box, Grid } from '@mui/material';
import { useState } from 'react';
import { Accordion } from '../../components/accordion';
import { Direction } from '../../components/direction/Direction';
import { Search } from '../../components/search';
import { StrategySelect } from '../../components/strategy-select';
import { useIsMobile } from '../../hooks/useIsMobile';
import { EntriesTable } from './EntriesTable';

export const OpenEntries = ({ journal }) => {
  const isMobile = useIsMobile();

  const [filters, setFilters] = useState({
    journal,
    status: 'OPEN',
  });

  const onSearch = (value) => {
    setFilters({ ...filters, symbol: value });
  };

  const changeDirection = (value) => {
    setFilters({ ...filters, direction: value });
  };

  const changeStrategies = (values) => {
    const ids = values.map((strategy) => strategy.id);
    setFilters({ ...filters, strategies: ids });
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
            <Direction
              showEmpty={true}
              onChange={changeDirection}
              size="small"
            />
          </Box>
          <Box padding={1}>
            <StrategySelect onChanged={changeStrategies} small />
          </Box>
        </Grid>
      </Accordion>

      <EntriesTable args={filters} />
    </Box>
  );
};
