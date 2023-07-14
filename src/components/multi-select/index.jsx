import UnfoldMoreOutlinedIcon from '@mui/icons-material/UnfoldMoreOutlined';
import { FormHelperText } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import * as React from 'react';
import { useEffect, useState } from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const MultiSelect = ({
  label,
  name,
  items,
  onChange,
  error = false,
  helperText,
  ...rest
}) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const values = items.filter((item) => value.includes(item.value));
    setSelectedIds(values.map((item) => item.value));
    setSelectedValues(values);
  };

  useEffect(() => {
    if (onChange) {
      onChange(selectedValues);
    }
  }, [selectedValues, onChange]);

  return (
    <FormControl fullWidth>
      <InputLabel error={error} id={`${name}-label`}>
        {label}
      </InputLabel>
      <Select
        labelId={`${name}-label`}
        id={`${name}-multiselect`}
        multiple
        value={selectedIds}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={() => {
          if (selectedValues.length <= 2) {
            return selectedValues.map((value) => value.label).join(', ');
          } else {
            return `${selectedValues.length} selected`;
          }
        }}
        IconComponent={UnfoldMoreOutlinedIcon}
        MenuProps={MenuProps}
        error={error}
        {...rest}
      >
        {items &&
          items.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              <Checkbox checked={selectedIds.includes(item.value)} />
              <ListItemText
                primary={item.label}
                {...(item.description && { secondary: item.description })}
              />
            </MenuItem>
          ))}
      </Select>
      {helperText && <FormHelperText error={true}>{helperText}</FormHelperText>}
    </FormControl>
  );
};
