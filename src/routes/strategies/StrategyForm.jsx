import { Box, Grid, Stack, TextField } from '@mui/material';
import { Formik } from 'formik';
import { useEffect } from 'react';
import * as yup from 'yup';
import { Alert } from '../../components/alert';
import { FormButtons } from '../../components/button/FormButtons';
import { ColorPicker } from '../../components/color-picker';
import { useSaveStrategy } from '../../services/StrategyQueries';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
});

const initialValues = {
  name: '',
  color: undefined,
};

export const StrategyForm = ({ strategy, onCancel, onSaved }) => {
  const mutation = useSaveStrategy();

  const handleFormSubmit = (values) => {
    mutation.mutate(values);
  };

  useEffect(() => {
    if (mutation.isSuccess && onSaved) {
      onSaved(mutation.data);
    }
  }, [mutation, onSaved]);

  return (
    <Box>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={strategy || initialValues}
        validationSchema={schema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoFocus={true}
                  fullWidth
                  variant="filled"
                  label="Strategy Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={12} pt={3}>
                <Stack direction="row" spacing={3}>
                  <ColorPicker
                    sampleValue={values.name}
                    value={values.color}
                    onChange={(value) => setFieldValue('color', value, false)}
                  />
                </Stack>
              </Grid>
            </Grid>
            <Alert mutation={mutation} sx={{ mt: 3 }} />
            <Box display="flex" justifyContent="center" mt="20px">
              <FormButtons
                submit="Save Strategy"
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
