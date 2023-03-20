import InvertColorsOffOutlinedIcon from '@mui/icons-material/InvertColorsOffOutlined';
import { Chip, IconButton, Stack, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { GithubPicker } from 'react-color';

export const ColorPicker = ({ sampleValue, value, onChange }) => {
  const [color, setColor] = useState(value);

  const onChangeColor = (newColor) => {
    setColor(newColor.hex);
    if (onChange) {
      onChange(newColor.hex);
    }
  };

  const clearColor = () => {
    setColor(undefined);
    onChange(undefined);
  };

  return (
    <Stack direction="row" spacing={1}>
      {sampleValue && (
        <Chip
          label={sampleValue}
          sx={{
            backgroundColor: color,
          }}
        />
      )}
      <GithubPicker
        width="100%"
        triangle="hide"
        value={value}
        onChange={onChangeColor}
        colors={[
          '#f44336',
          '#e81e63',
          '#9c27b0',
          '#673ab7',
          '#3f51b5',
          '#2196f3',
          '#03a9f4',
          '#00bcd4',
          '#009688',
          '#4caf50',
          '#8bc34a',
          '#ffc107',
          '#ff9800',
          '#ff5722',
          '#795548',
          '#607d8b',
        ]}
      />
      <Tooltip title="Clear Color">
        <IconButton size="small" type="button" onClick={clearColor}>
          <InvertColorsOffOutlinedIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};
