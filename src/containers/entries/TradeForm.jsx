import { Box, FormControl, Grid, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { Alert } from '../../components/alert';
import { FormButtons } from '../../components/button/FormButtons';
import { DateTime } from '../../components/date-time';
import { Direction } from '../../components/direction/Direction';
import { GraphSelect } from '../../components/graph-select';
import { Header } from '../../components/header';
import { NumberInput } from '../../components/number-input';
import { Symbol } from '../../components/symbol';
import { useSaveTrade } from '../../services/EntryQueries';
import { currencySymbol } from '../../utilities/currency';
import { isDateValid } from '../../utilities/dateTimeUtilities';
import { EntryDetails } from './EntryDetails';

const schema = yup.object().shape({
  symbol: yup.string().nullable().required('Symbol is required'),
  date: yup
    .string()
    .nullable()
    .test('date', 'Taxes date is required', isDateValid),
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
  exitDate: null,
  exitPrice: undefined,
  graphType: undefined,
  graphMeasure: undefined,
  notes: undefined,
};

export const TradeForm = ({ trade, journal, onCancel, onSave }) => {
  const [tradeValues, setTradeValues] = useState(trade || initialValues);
  const mutation = useSaveTrade(journal.id);

  const handleFormSubmit = (values) => {
    setTradeValues(values);
    mutation.mutate(values);
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      if (onSave) {
        onSave(tradeValues);
      }
    }
  }, [mutation, tradeValues, onSave]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={trade ? 8 : 12}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
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
                  <Grid item xs={12} sm={6}>
                    <Symbol
                      fullWidth
                      required
                      label="Symbol"
                      onBlur={handleBlur}
                      onChange={(value) => setFieldValue('symbol', value, true)}
                      value={values.symbol}
                      name="symbol"
                      error={!!touched.symbol && !!errors.symbol}
                      helperText={touched.symbol && errors.symbol}
                      autoFocus
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
                      onChange={(value) => setFieldValue('price', value, true)}
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
                      label={`Commission (${currencySymbol(journal.currency)})`}
                      onBlur={handleBlur}
                      onChange={(value) => setFieldValue('costs', value, true)}
                      value={values.costs}
                      name="costs"
                      error={!!touched.costs && !!errors.costs}
                      helperText={touched.costs && errors.costs}
                      scale={2}
                      zeroIsNull
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Typography>Exit Trade</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DateTime
                      fullWidth
                      required
                      variant="filled"
                      type="text"
                      label="Exit trading date"
                      onBlur={handleBlur}
                      onChange={(value) =>
                        setFieldValue('exitDate', value, true)
                      }
                      value={values.exitDate}
                      name="exitDate"
                      error={!!touched.exitDate && !!errors.exitDate}
                      helperText={touched.exitDate && errors.exitDate}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <NumberInput
                      fullWidth
                      variant="filled"
                      type="text"
                      label={`Exit Price (${currencySymbol(journal.currency)})`}
                      onBlur={handleBlur}
                      onChange={(value) =>
                        setFieldValue('exitPrice', value, true)
                      }
                      value={values.exitPrice}
                      name="exitPrice"
                      error={!!touched.exitPrice && !!errors.exitPrice}
                      helperText={touched.exitPrice && errors.exitPrice}
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
                <Alert mutation={mutation} sx={{ mt: 3 }} />
                <Box display="flex" justifyContent="center" mt="20px">
                  <FormButtons
                    submit="Save Trade"
                    cancel="Cancel"
                    onCancel={onCancel}
                    loading={mutation.isLoading}
                  />
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Grid>
      {trade && (
        <Grid item xs={12} sm={4}>
          <Header subtitle="Details" />
          <EntryDetails entry={tradeValues} />
        </Grid>
      )}
    </Grid>
  );
};
