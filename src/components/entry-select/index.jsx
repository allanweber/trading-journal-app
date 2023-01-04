import { Box } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { types } from '../../containers/entries/EntryTypes';

export const EntrySelect = ({ onChange }) => {
  const [type, setType] = useState('TRADE');
  const changeFilter = (type) => {
    setType(type);
    if (onChange) {
      onChange(type === 'ALL' ? undefined : type);
    }
  };

  return (
    <Box>
      <ToggleButtonGroup
        value={type}
        onChange={(e, value) => changeFilter(value)}
        exclusive
        size="small"
      >
        {types.map((type) => (
          <ToggleButton value={type.key} key={type.key}>
            {React.cloneElement(type.icon, {
              fontSize: 'small',
            })}
            <Typography sx={{ ml: 1 }}>{type.value}</Typography>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};
