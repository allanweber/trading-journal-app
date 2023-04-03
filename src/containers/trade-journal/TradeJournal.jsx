import { Box, Grid } from '@mui/material';
import React, { useState } from 'react';
import { TimeAggregation } from './TimeAggregation';
import { Trade } from './Trade';
import { TradeAggregation } from './TradeAggregation';

export const TradeJournal = ({ journal }) => {
  const [period, setPeriod] = useState();
  const [trade, setTrade] = useState();

  const timeAggregationChange = (time) => {
    setPeriod(time);
  };

  const tradeAggregationChange = (trade) => {
    setTrade(trade);
  };

  const validPeriod = () => {
    return period && period.aggregation && period.from && period.until;
  };

  return (
    <Grid container direction="row" justifyContent="start">
      <Box padding={1} minWidth="250px">
        <TimeAggregation journal={journal} onChange={timeAggregationChange} />
      </Box>
      <Box padding={1} paddingLeft={2} minWidth="250px">
        {validPeriod() && (
          <TradeAggregation
            journal={journal}
            period={period}
            onChange={tradeAggregationChange}
          />
        )}
      </Box>
      <Box padding={1} paddingLeft={2}>
        {trade && <Trade journal={journal} trade={trade} />}
      </Box>
    </Grid>
  );
};
