import { Box, FormControl, MenuItem, Select } from '@mui/material';
import { useState } from 'react';

export const TimeGroup = ({ onChange }) => {
  const [time, setTime] = useState('DAY');

  const handleChange = (event) => {
    setTime(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <Box>
      <FormControl variant="standard" sx={{ minWidth: 100 }}>
        <Select id="group-time-select" value={time} onChange={handleChange}>
          <MenuItem value={'DAY'}>Day</MenuItem>
          <MenuItem value={'WEEK'}>Week</MenuItem>
          <MenuItem value={'MONTH'}>Month</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
