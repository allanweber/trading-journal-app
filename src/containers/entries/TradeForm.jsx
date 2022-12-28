import { Box, Grid } from '@mui/material';
import { Formik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import { Alert } from '../../components/alert';
import { FormButtons } from '../../components/button/FormButtons';
import { DateTime } from '../../components/date-time';
import { NumberInput } from '../../components/number-input';
import { Symbol } from '../../components/symbol';
import { useSaveTrade } from '../../services/EntryQueries';
import { currencySymbol } from '../../utilities/currency';
import { isDateValid } from '../../utilities/dateTimeUtilities';

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
};

export const TradeForm = ({ trade, journal, onCancel, onSave }) => {
  const [tradeValues, setTradeValues] = useState(trade || initialValues);
  const mutation = useSaveTrade(journal.id);

  const handleFormSubmit = (values) => {
    setTradeValues(values);
    console.log(values);
    // mutation.mutate(values);
  };

  if (mutation.isSuccess) {
    if (onSave) {
      onSave(tradeValues);
    }
  }

  return (
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
              <Grid item xs={12} sm={12}>
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
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <DateTime
                  dateOnly
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Taxes at"
                  onBlur={handleBlur}
                  onChange={(value) => setFieldValue('date', value, true)}
                  value={values.date}
                  name="date"
                  error={!!touched.date && !!errors.date}
                  helperText={touched.date && errors.date}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <NumberInput
                  fullWidth
                  variant="filled"
                  type="text"
                  label={`Taxes Value (${currencySymbol(journal.currency)})`}
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
  );
};
