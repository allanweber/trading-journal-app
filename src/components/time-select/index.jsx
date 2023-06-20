import { Box, FormControl, MenuItem, Select } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import {
  loadClosedTime,
  saveClosedTime,
} from '../../services/ConfigurationStorage';
import { apiFormat } from '../../utilities/dateTimeUtilities';

export const timeOptionToDate = (timeOption) => {
  let date = undefined;
  switch (timeOption) {
    case 1:
      date = dayjs().startOf('date');
      break;
    case 2:
      date = dayjs().subtract(1, 'day').startOf('date');
      break;
    case 7:
      date = dayjs().subtract(7, 'day').startOf('date');
      break;
    case 30:
      date = dayjs().subtract(1, 'month').startOf('date');
      break;
    case 90:
      date = dayjs().subtract(3, 'month').startOf('date');
      break;
    case 180:
      date = dayjs().subtract(6, 'month').startOf('date');
      break;
    case 365:
      date = dayjs().subtract(1, 'year').startOf('date');
      break;
    default:
      date = undefined;
      break;
  }
  return date;
};

export const TimeSelect = ({ onChange }) => {
  const [time, setTime] = useState(loadClosedTime());

  const handleChange = (event) => {
    setTime(event.target.value);
    saveClosedTime(event.target.value);
    if (onChange) {
      onChange(apiFormat(timeOptionToDate(event.target.value)));
    }
  };

  return (
    <Box>
      <FormControl variant="standard" sx={{ minWidth: 120 }}>
        <Select id="time-select" value={time} onChange={handleChange}>
          <MenuItem value={0}>All Time</MenuItem>
          <MenuItem value={1}>Today</MenuItem>
          <MenuItem value={2}>Yesterday</MenuItem>
          <MenuItem value={7}>Last 7 Days</MenuItem>
          <MenuItem value={30}>Last 30 Days</MenuItem>
          <MenuItem value={90}>Last 3 Months</MenuItem>
          <MenuItem value={180}>Last 6 Months</MenuItem>
          <MenuItem value={365}>Last 12 Months</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
