import { Box, Grid } from '@mui/material';
import React, { useState } from 'react';
import { TimeAggregation } from './TimeAggregation';
import { TradeAggregation } from './TradeAggregation';

export const TradeJournal = ({ journal }) => {
  const [period, setPeriod] = useState();

  const timeAggregationChange = (time) => {
    setPeriod(time);
  };

  const tradeAggregationChange = (time) => {
    console.log(time);
  };

  return (
    <Grid container direction="row" justifyContent="start">
      <Box padding={1} minWidth="250px">
        <TimeAggregation journal={journal} onChange={timeAggregationChange} />
      </Box>
      <Box padding={1} paddingLeft={2} minWidth="250px">
        <TradeAggregation
          journal={journal}
          period={period}
          onChange={tradeAggregationChange}
        />
      </Box>
      <Box padding={1} paddingLeft={2} flexGrow="1">
        <label>a</label>
      </Box>
    </Grid>
  );
};
