import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import React from 'react';

export const Dropdown = ({ items, onChange, small, name, ...rest }) => {
  const handleChange = (event) => {
    const selected = event.target.value;
    onChange(selected);
  };

  return (
    <TextField
      size={small ? 'small' : 'normal'}
      name={name}
      id={`${name}-select`}
      select
      onChange={handleChange}
      {...rest}
    >
      {items.map((item) => (
        <MenuItem key={item.value || 'none-option'} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </TextField>
  );
};
