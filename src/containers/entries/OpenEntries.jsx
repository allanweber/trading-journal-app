import { Box, Grid } from '@mui/material';
import { useState } from 'react';
import { Accordion } from '../../components/accordion';
import { Direction } from '../../components/direction/Direction';
import { Search } from '../../components/search';
import { useIsMobile } from '../../hooks/useIsMobile';
import { EntriesTable } from './EntriesTable';

export const OpenEntries = ({ journal }) => {
  const isMobile = useIsMobile();

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
            <Direction
              showEmpty={true}
              onChange={changeDirection}
              size="small"
            />
          </Box>
        </Grid>
      </Accordion>

      <EntriesTable args={tableProps} />
    </Box>
  );
};
