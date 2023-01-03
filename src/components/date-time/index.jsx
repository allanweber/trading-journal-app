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
  ...rest
}) => {
  const [locale] = useState('en-gb');

  const [current, setCurrent] = useState(value || null);

  const onDateChange = (newValue) => {
    if (newValue) {
      setCurrent(newValue);
      onChange(newValue.toDate());
    } else {
      onChange(undefined);
      setCurrent(null);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <FormControl fullWidth>
        {dateOnly && (
          <DatePicker
            onChange={onDateChange}
            value={current}
            label={label}
            onFocus={(event) => {
              event.target.select();
            }}
            renderInput={(props) => (
              <TextField
                variant={variant}
                onBlur={onBlur}
                name={name}
                {...props}
                error={error}
                helperText={helperText}
                onFocus={(event) => {
                  event.target.select();
                }}
                {...rest}
              />
            )}
          />
        )}

        {!dateOnly && (
          <DateTimePicker
            onChange={onDateChange}
            value={current}
            label={label}
            onFocus={(event) => {
              event.target.select();
            }}
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
