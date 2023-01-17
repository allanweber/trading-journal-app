import React from 'react';

import { Box, Grid } from '@mui/material';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { Alert } from '../../components/alert';
import { FormButtons } from '../../components/button/FormButtons';
import { DateTime } from '../../components/date-time';
import { NumberInput } from '../../components/number-input';
import { useCloseTrade } from '../../services/TradeQueries';
import { currencySymbol } from '../../utilities/currency';
import { isDateValid } from '../../utilities/dateTimeUtilities';

const schema = yup.object().shape({
  exitDate: yup
    .string()
    .nullable()
    .test('date', 'Exit date is required', isDateValid),
  exitPrice: yup.string().required('Exit price is required'),
});

const initialValues = {
  exitDate: new Date(),
  exitPrice: 0,
};

export const CloseTrade = ({ trade, journal, onSave, onCancel }) => {
  const [tradeValues, setTradeValues] = useState(trade || initialValues);
  const mutation = useCloseTrade(journal.id, trade.id);

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

  const cancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

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
                <Grid item xs={12} sm={6}>
                  <DateTime
                    fullWidth
                    required
                    variant="filled"
                    type="text"
                    label="Exit trading date"
                    onBlur={handleBlur}
                    onChange={(value) => setFieldValue('exitDate', value, true)}
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
              </Grid>
              <Alert mutation={mutation} sx={{ mt: 3 }} />
              <Box display="flex" justifyContent="center" mt="20px">
                <FormButtons
                  submit="Close Trade"
                  cancel="Back"
                  onCancel={cancel}
                  loading={mutation.isLoading}
                />
              </Box>
            </form>
          )}
        </Formik>
      )}
    </Box>
  );
};
