import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';

export const Dropdown = ({ items, onChange, value, small, name, ...rest }) => {
  const [currentValue, setCurrentValue] = useState(value || '');

  const handleChange = (event) => {
    const selected = event.target.value;
    setCurrentValue(selected);
    if (onChange) {
      onChange(selected);
    }
  };

  return (
    <TextField
      size={small ? 'small' : 'normal'}
      name={name}
      id={`${name}-select`}
      select
      onChange={handleChange}
      value={currentValue}
      {...rest}
    >
      {items &&
        items.map((item) => (
          <MenuItem key={item.value || 'none-option'} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
    </TextField>
  );
};
