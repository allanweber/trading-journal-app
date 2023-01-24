import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import {
  Box,
  Divider,
  Grid,
  TablePagination,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Alert } from '../../components/alert';
import { ColorfulCurrency } from '../../components/colorful-currency';
import { LoadingPage } from '../../components/loading-page';
import { TimeGroup } from '../../components/time-group';
import { useColors } from '../../hooks/useColors';
import { useAggregateTime } from '../../services/TradeQueries';
import { ShortDisplay } from './ShortDisplay';

export const TimeAggregation = ({ journal, onChange }) => {
  const colors = useColors();
  const theme = useTheme();
  const [aggregation, setAggregation] = useState('DAY');
  const [selected, setSelected] = useState(undefined);
  const [page, setPage] = useState(0);

  const {
    data: periodGroups,
    isFetching,
    error,
  } = useAggregateTime(journal.id, aggregation, page, 10);

  const changeGroup = (agg) => {
    setAggregation(agg);
    setSelected(undefined);
  };

  useEffect(() => {
    return () => {
      setPage(0);
    };
  }, []);

  useEffect(() => {
    if (periodGroups && periodGroups.items) {
      const [firstPeriod] = periodGroups.items;
      if (firstPeriod) {
        const [firstItem] = firstPeriod.items;
        if (firstItem) {
          const select = { time: firstItem.group, aggregation };
          setSelected(select);
        }
      }
    }
  }, [periodGroups, aggregation]);

  useEffect(() => {
    setPage(0);
  }, [aggregation]);

  const selectTime = (item) => {
    const select = { time: item.group, aggregation };
    setSelected(select);
  };

  useEffect(() => {
    if (onChange) {
      onChange(selected);
    }
  }, [selected, onChange]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
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

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '80vh',
          overflow: 'hidden',
          overflowY: 'scroll',
        }}
      >
        {periodGroups &&
          periodGroups.items.map((time) => (
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
                  className={
                    selected && item.group === selected.time ? 'selected' : null
                  }
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

        {periodGroups && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              '& .MuiTablePagination-toolbar': {
                pr: 0,
                pl: 0,
              },
            }}
          >
            <TablePagination
              component="div"
              count={periodGroups.total}
              page={page}
              rowsPerPage={10}
              labelRowsPerPage=""
              rowsPerPageOptions={[10]}
              showFirstButton={true}
              showLastButton={true}
              onPageChange={handleChangePage}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
