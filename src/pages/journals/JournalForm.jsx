import { Box, Grid, TextField } from '@mui/material';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { Alert } from '../../components/alert';
import { FormButtons } from '../../components/button/FormButtons';
import { CurrencySelect } from '../../components/currency-select';
import { DateTime } from '../../components/date-time';
import { NumberInput } from '../../components/number-input';
import { useSaveJournal } from '../../services/JournalQueries';
import { currencySymbol } from '../../utilities/currency';
import { isDateValid } from '../../utilities/dateTimeUtilities';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  startJournal: yup
    .string()
    .nullable()
    .test('date', 'Start Journal is required', isDateValid),
  startBalance: yup
    .number()
    .min(0, 'Start Balance must be zero or positive')
    .required('Start Balance is required'),
  currency: yup.string().required('Currency is required'),
});

const initialValues = {
  name: '',
  startJournal: new Date(),
  startBalance: 0,
  currency: 'DOLLAR',
};

export const JournalForm = ({ journal, onCancel }) => {
  const [editDisabled, setEditDisabled] = useState(false);
  const mutation = useSaveJournal();

  const handleFormSubmit = (values) => {
    mutation.mutate(values);
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      onCancel();
    }
  }, [mutation, onCancel]);

  useEffect(() => {
    if (journal) {
      setEditDisabled(true);
    }
  }, [journal]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      maxWidth={350}
    >
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={journal || initialValues}
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
                <TextField
                  fullWidth
                  variant="filled"
                  label="Journal Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <DateTime
                  dateOnly
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Start Journal at"
                  onBlur={handleBlur}
                  onChange={(value) =>
                    setFieldValue('startJournal', value, true)
                  }
                  value={values.startJournal}
                  name="startJournal"
                  error={!!touched.startJournal && !!errors.startJournal}
                  helperText={touched.startJournal && errors.startJournal}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <NumberInput
                  fullWidth
                  variant="filled"
                  type="text"
                  label={`Start Balance (${currencySymbol(values.currency)})`}
                  onBlur={handleBlur}
                  onChange={(value) =>
                    setFieldValue('startBalance', value, true)
                  }
                  value={values.startBalance}
                  name="startBalance"
                  error={!!touched.startBalance && !!errors.startBalance}
                  helperText={touched.startBalance && errors.startBalance}
                  scale={2}
                  disabled={editDisabled}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <CurrencySelect
                  fullWidth
                  label="Currency"
                  onBlur={handleBlur}
                  onChange={(value) => setFieldValue('currency', value, true)}
                  value={values.currency}
                  name="currency"
                  error={!!touched.currency && !!errors.currency}
                  helperText={touched.currency && errors.currency}
                  items={[
                    { value: 'DOLLAR', label: 'DOLLAR' },
                    { value: 'EURO', label: 'EURO' },
                  ]}
                />
              </Grid>
            </Grid>
            <Alert mutation={mutation} sx={{ mt: 3 }} />
            <Box display="flex" justifyContent="center" mt="20px">
              <FormButtons
                submit="Save Journal"
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
