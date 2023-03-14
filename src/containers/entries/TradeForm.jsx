import { Box, FormControl, Grid, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { Alert } from '../../components/alert';
import { Button } from '../../components/button/Button';
import { DateTime } from '../../components/date-time';
import { Direction } from '../../components/direction/Direction';
import { GraphSelect } from '../../components/graph-select';
import { NumberInput } from '../../components/number-input';
import { useSaveTrade } from '../../services/TradeQueries';
import { currencySymbol } from '../../utilities/currency';
import { isDateValid } from '../../utilities/dateTimeUtilities';
import { CloseTradeAction } from './CloseTradeAction';
import { EntryImages } from './EntryImages';

const schema = yup.object().shape({
  symbol: yup.string().required('Symbol is required'),
  date: yup
    .string()
    .nullable()
    .test('date', 'Trade date is required', isDateValid),
  price: yup.string().required('Price is required'),
});

const initialValues = {
  symbol: '',
  date: new Date(),
  price: 0,
  size: 0,
  direction: 'LONG',
  profitPrice: undefined,
  lossPrice: undefined,
  costs: undefined,
  graphType: undefined,
  graphMeasure: undefined,
  notes: undefined,
};

export const TradeForm = ({ trade, journal, onCancel, onSave }) => {
  const [tradeValues, setTradeValues] = useState(trade || initialValues);
  const [showMore, setShowMore] = useState(false);
  const mutation = useSaveTrade(journal.id);

  const handleFormSubmit = (values) => {
    setTradeValues(values);
    mutation.mutate(values);
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      setTradeValues(mutation.data);
      if (onSave) {
        onSave(tradeValues);
      }
    }
  }, [mutation, tradeValues, onSave]);

  useEffect(() => {
    if (tradeValues.id) {
      setShowMore(true);
    }
  }, [tradeValues]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {tradeValues && (
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={tradeValues}
          validationSchema={schema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            setFieldValue,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={showMore ? 8 : 12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        required
                        rows={2}
                        variant="filled"
                        label="Symbol"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.symbol}
                        error={!!touched.symbol && !!errors.symbol}
                        helperText={touched.symbol && errors.symbol}
                        name="symbol"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <DateTime
                        fullWidth
                        required
                        variant="filled"
                        type="text"
                        label="Start trading date"
                        onBlur={handleBlur}
                        onChange={(value) => setFieldValue('date', value, true)}
                        value={values.date}
                        name="date"
                        error={!!touched.date && !!errors.date}
                        helperText={touched.date && errors.date}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{ mt: '10px' }}>
                      <FormControl fullWidth>
                        <Direction
                          size="small"
                          onChange={(value) =>
                            setFieldValue('direction', value, true)
                          }
                          value={values.direction}
                          name="direction"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <NumberInput
                        fullWidth
                        required
                        variant="filled"
                        type="text"
                        label="Quantity"
                        onBlur={handleBlur}
                        onChange={(value) => setFieldValue('size', value, true)}
                        value={values.size}
                        name="size"
                        error={!!touched.size && !!errors.size}
                        helperText={touched.size && errors.size}
                        scale={2}
                        zeroIsInvalid
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <NumberInput
                        fullWidth
                        required
                        variant="filled"
                        type="text"
                        label={`Entry Price (${currencySymbol(
                          journal.currency
                        )})`}
                        onBlur={handleBlur}
                        onChange={(value) =>
                          setFieldValue('price', value, true)
                        }
                        value={values.price}
                        name="price"
                        error={!!touched.price && !!errors.price}
                        helperText={touched.price && errors.price}
                        scale={2}
                        zeroIsInvalid
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Typography>Trade Management</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <NumberInput
                        fullWidth
                        variant="filled"
                        type="text"
                        label={`Take Profit Price (${currencySymbol(
                          journal.currency
                        )})`}
                        onBlur={handleBlur}
                        onChange={(value) =>
                          setFieldValue('profitPrice', value, true)
                        }
                        value={values.profitPrice}
                        name="profitPrice"
                        error={!!touched.profitPrice && !!errors.profitPrice}
                        helperText={touched.profitPrice && errors.profitPrice}
                        scale={2}
                        zeroIsNull
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <NumberInput
                        fullWidth
                        variant="filled"
                        type="text"
                        label={`Stop Loss Price (${currencySymbol(
                          journal.currency
                        )})`}
                        onBlur={handleBlur}
                        onChange={(value) =>
                          setFieldValue('lossPrice', value, true)
                        }
                        value={values.lossPrice}
                        name="lossPrice"
                        error={!!touched.lossPrice && !!errors.lossPrice}
                        helperText={touched.lossPrice && errors.lossPrice}
                        scale={2}
                        zeroIsNull
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <NumberInput
                        fullWidth
                        variant="filled"
                        type="text"
                        label={`Commission (${currencySymbol(
                          journal.currency
                        )})`}
                        onBlur={handleBlur}
                        onChange={(value) =>
                          setFieldValue('costs', value, true)
                        }
                        value={values.costs}
                        name="costs"
                        error={!!touched.costs && !!errors.costs}
                        helperText={touched.costs && errors.costs}
                        scale={2}
                        zeroIsNull
                      />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <Typography>Details</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <GraphSelect
                        fullWidth
                        label="Graph Type"
                        onBlur={handleBlur}
                        onChange={(value) =>
                          setFieldValue('graphType', value, true)
                        }
                        value={values.graphType}
                        name="graphType"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        variant="filled"
                        label="Graph Measure"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.graphMeasure}
                        name="graphMeasure"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={2}
                        variant="filled"
                        label="Notes"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.notes}
                        name="notes"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                {showMore && (
                  <Grid item xs={12} sm={4}>
                    <EntryImages entry={tradeValues} journal={journal} />
                  </Grid>
                )}
              </Grid>
              <Alert mutation={mutation} sx={{ mt: 3 }} />
              <Box display="flex" justifyContent="center" mt="20px">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={showMore ? 4 : 6}>
                    <Button
                      fullWidth
                      onClick={onCancel}
                      secondary
                      type="button"
                    >
                      Back
                    </Button>
                  </Grid>
                  {showMore && (
                    <Grid item xs={12} sm={4}>
                      <CloseTradeAction
                        trade={tradeValues}
                        journal={journal}
                        onChange={onCancel}
                      ></CloseTradeAction>
                    </Grid>
                  )}
                  <Grid item xs={12} sm={showMore ? 4 : 6}>
                    <Button fullWidth loading={mutation.isLoading}>
                      Save Trade
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </form>
          )}
        </Formik>
      )}
    </Box>
  );
};
