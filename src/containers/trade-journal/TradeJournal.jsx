import { Box, Grid } from '@mui/material';
import React from 'react';
import { TimeAggregation } from './TimeAggregation';

export const TradeJournal = ({ journal }) => {
  const timeAggregationChange = (time) => {
    console.log(time);
  };

  return (
    <Grid container direction="row" justifyContent="start">
      <Box padding={1} minWidth="250px">
        <TimeAggregation journal={journal} onChange={timeAggregationChange} />
      </Box>
      <Box padding={1} paddingLeft={2} minWidth="250px">
        <label>a</label>
      </Box>
      <Box padding={1} paddingLeft={2} flexGrow="1">
        <label>a</label>
      </Box>
    </Grid>
  );
};
