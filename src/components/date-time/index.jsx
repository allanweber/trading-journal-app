import { FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'dayjs/locale/en-gb';
import { useState } from 'react';
export const DateTime = ({
  onChange,
  name,
  value,
  variant,
  label,
  onBlur,
  error,
  helperText,
  dateOnly,
}) => {
  const [locale] = useState('en-gb');

  const onDateChange = (value) => {
    if (value) {
      onChange(value.toDate());
    } else {
      onChange(undefined);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <FormControl fullWidth>
        {dateOnly && (
          <DatePicker
            onChange={onDateChange}
            value={value}
            label={label}
            renderInput={(props) => (
              <TextField
                variant={variant}
                onBlur={onBlur}
                name={name}
                {...props}
                error={error}
                helperText={helperText}
              />
            )}
          />
        )}

        {!dateOnly && (
          <DateTimePicker
            onChange={onDateChange}
            value={value}
            label={label}
            renderInput={(props) => (
              <TextField
                variant={variant}
                onBlur={onBlur}
                name={name}
                {...props}
                error={error}
                helperText={helperText}
              />
            )}
          />
        )}
      </FormControl>
    </LocalizationProvider>
  );
};
