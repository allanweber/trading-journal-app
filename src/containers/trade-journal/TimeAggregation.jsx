import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import { Box, Divider, Grid, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Alert } from '../../components/alert';
import { ColorfulCurrency } from '../../components/colorful-currency';
import { LoadingPage } from '../../components/loading-page';
import { TimeGroup } from '../../components/time-group';
import { useColors } from '../../hooks/useColors';
import { useAggregateTime } from '../../services/TradeQueries';
import { ShortDisplay } from './ShortDisplay';

export const TimeAggregation = ({ journal }) => {
  const colors = useColors();
  const theme = useTheme();
  const [aggregation, setAggregation] = useState('DAY');
  const [timesMap, setTimesMap] = useState(new Map());
  const [selected, setSelected] = useState('');

  const {
    data: times,
    isFetching,
    error,
  } = useAggregateTime(journal.id, aggregation);

  const changeGroup = (agg) => {
    setAggregation(agg);
  };

  useEffect(() => {
    setTimesMap(new Map());
    setSelected(undefined);
  }, [aggregation]);

  useEffect(() => {
    if (times) {
      times.forEach((time) => {
        if (timesMap.has(time.group)) {
          time.items.forEach((item) => {
            //IMPLEMENT WHEN PAGING IS SET
          });
        } else {
          timesMap.set(time.group, time.items);
        }
      });
    }
  }, [times, timesMap]);

  const selectTime = (item) => {
    setSelected(item.group);
  };

  return (
    <Box>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="start"
      >
        <Box>
          <Typography>Group by</Typography>
        </Box>
        <Box sx={{ ml: 'auto' }}>
          <TimeGroup onChange={changeGroup} />
        </Box>
      </Grid>
      <LoadingPage loading={isFetching} />
      <Alert severity="error" show={error}>
        {error && error.message}
      </Alert>

      {times &&
        times.map((time) => (
          <Box
            key={`group-${time.group}`}
            marginTop={2}
            sx={{
              '& .selected': {
                backgroundColor: `${
                  theme.palette.mode === 'dark'
                    ? colors.primary[400]
                    : colors.primary[400]
                }`,
              },
            }}
          >
            <Divider textAlign="left">
              <Typography fontSize="1rem" fontWeight={600}>
                <ShortDisplay
                  date={time.group}
                  type={aggregation === 'MONTH' ? 'YEAR' : 'MONTH_YEAR'}
                />
              </Typography>
            </Divider>

            {time.items.map((item) => (
              <Box
                onClick={() => selectTime(item)}
                key={`item-${item.group}`}
                display="flex"
                direction="row"
                justifyContent="start"
                className={item.group === selected ? 'selected' : null}
                p={2}
                marginTop={1}
                sx={{
                  '&:hover': {
                    cursor: 'pointer',
                    backgroundColor: `${
                      theme.palette.mode === 'dark'
                        ? colors.primary[400]
                        : colors.primary[400]
                    }`,
                  },
                }}
              >
                <Box>
                  <Box>
                    <Typography variant="h5" fontWeight="bold">
                      <ShortDisplay date={item.group} type={aggregation} />
                    </Typography>
                  </Box>
                  <ColorfulCurrency
                    value={item.result}
                    currency={journal.currency}
                  />
                </Box>
                <Box sx={{ ml: 'auto' }} marginTop="5px">
                  <ChevronRightOutlinedIcon fontSize="large" />
                </Box>
              </Box>
            ))}
          </Box>
        ))}
    </Box>
  );
};
