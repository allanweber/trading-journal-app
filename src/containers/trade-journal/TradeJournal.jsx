import { Grid } from '@mui/material';
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
    <Grid container spacing={2}>
      <Grid item xs={2} sm={2}>
        <TimeAggregation journal={journal} onChange={timeAggregationChange} />
      </Grid>
      <Grid item xs={2} sm={2}>
        {validPeriod() && (
          <TradeAggregation
            journal={journal}
            period={period}
            onChange={tradeAggregationChange}
          />
        )}
      </Grid>
      <Grid item xs={8} sm={8}>
        {trade && <Trade journal={journal} trade={trade} />}
      </Grid>
    </Grid>
  );
};
