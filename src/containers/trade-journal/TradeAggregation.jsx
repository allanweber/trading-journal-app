import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import { Box, Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Alert } from '../../components/alert';
import { ColorfulCurrency } from '../../components/colorful-currency';
import { LoadingPage } from '../../components/loading-page';
import { useColors, useIsDarkMode } from '../../hooks/useColors';
import { useAggregateTrades } from '../../services/TradeQueries';
import { ShortDisplay } from './ShortDisplay';

export const TradeAggregation = ({ journal, period, onChange }) => {
  const colors = useColors();
  const isDarkMode = useIsDarkMode();
  const [selected, setSelected] = useState(undefined);

  const {
    data: tradeGroups,
    isFetching,
    error,
  } = useAggregateTrades(
    journal.id,
    period.from,
    period.until,
    period.aggregation
  );

  const selectTrade = (trade) => {
    setSelected(trade);
  };

  const ResultOrOpen = ({ trade }) => {
    if (trade.netResult) {
      return (
        <ColorfulCurrency value={trade.netResult} currency={journal.currency} />
      );
    } else {
      return <Typography color={colors.greenAccent[400]}>OPEN</Typography>;
    }
  };

  useEffect(() => {
    if (onChange) {
      onChange(selected);
    }
  }, [selected, onChange]);

  return (
    <Box>
      <Box>
        <Typography>Trades</Typography>
      </Box>
      <LoadingPage loading={isFetching} />
      <Alert severity="error" show={error}>
        {error && error.message}
      </Alert>

      <Box
        paddingTop="10px"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '82vh',
          overflow: 'hidden',
          overflowY: 'auto',
        }}
      >
        {tradeGroups &&
          tradeGroups.map((group) => (
            <Box
              key={`group-${group.group}`}
              marginTop={2}
              sx={{
                '& .selected': {
                  backgroundColor: `${
                    isDarkMode ? colors.primary[400] : colors.primary[400]
                  }`,
                },
              }}
            >
              <Divider textAlign="left">
                <Typography fontSize="1rem" fontWeight={600}>
                  <ShortDisplay date={group.group} type={'DAY'} />
                </Typography>
              </Divider>

              {group.items.map((trade) => (
                <Box
                  onClick={() => selectTrade(trade)}
                  key={`item-${trade.symbol}-${trade.date}`}
                  display="flex"
                  direction="row"
                  justifyContent="start"
                  className={
                    selected && trade.tradeId === selected.tradeId
                      ? 'selected'
                      : null
                  }
                  p={2}
                  marginTop={1}
                  sx={{
                    '&:hover': {
                      cursor: 'pointer',
                      backgroundColor: `${
                        isDarkMode ? colors.primary[400] : colors.primary[400]
                      }`,
                    },
                  }}
                >
                  <Box>
                    <Box>
                      <Typography variant="h5" fontWeight="bold">
                        {trade.symbol}
                      </Typography>
                      <Typography variant="h6">
                        <ShortDisplay date={trade.date} type={'DATE_HOUR'} />
                      </Typography>
                    </Box>
                    <ResultOrOpen trade={trade} />
                  </Box>
                  <Box sx={{ ml: 'auto' }} marginTop="15px">
                    <ChevronRightOutlinedIcon fontSize="large" />
                  </Box>
                </Box>
              ))}
            </Box>
          ))}
      </Box>
    </Box>
  );
};
