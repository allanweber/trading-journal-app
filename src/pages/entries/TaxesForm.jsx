import { Box, Grid } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Alert } from '../../components/alert';
import { FormButtons } from '../../components/button/FormButtons';
import { DateTime } from '../../components/date-time';
import { NumberInput } from '../../components/number-input';
import { useSaveTaxes } from '../../services/EntryQueries';
import { currencySymbol } from '../../utilities/currency';
import { isDateValid } from '../../utilities/dateTimeUtilities';

const schema = yup.object().shape({
  date: yup
    .string()
    .nullable()
    .test('date', 'Taxes date is required', isDateValid),
  price: yup.string().required('Price is required'),
});

const initialValues = {
  date: new Date(),
  price: 0,
};

export const TaxesForm = ({ journal, onCancel, onSave }) => {
  const mutation = useSaveTaxes(journal.id);

  const handleFormSubmit = (values) => {
    mutation.mutate(values);
    onSave();
  };

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
        initialValues={initialValues}
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
                submit="Create Taxes"
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
