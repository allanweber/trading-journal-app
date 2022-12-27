import { Box } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { types } from '../../containers/entries/EntryTypes';
import { useColors } from '../../hooks/useColors';

export const EntrySelect = ({ onChange }) => {
  const colors = useColors();
  const [type, setType] = useState('TRADE');
  const changeFilter = (type) => {
    setType(type);
    if (onChange) {
      onChange(type === 'ALL' ? undefined : type);
    }
  };

  return (
    <Box>
      <Box sx={{ flexGrow: 1, p: 1 }}>
        <ToggleButtonGroup
          value={type}
          onChange={(e, value) => changeFilter(value)}
          exclusive
          size="small"
        >
          {types.map((type) => (
            <ToggleButton value={type.key} key={type.key}>
              {React.cloneElement(type.icon, {
                color: colors.grey[100],
                fontSize: 'small',
              })}
              <Typography sx={{ ml: 1 }} variant="body2">
                {type.value}
              </Typography>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
};
