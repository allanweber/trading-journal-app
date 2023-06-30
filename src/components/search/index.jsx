import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, InputBase } from '@mui/material';
import { useState } from 'react';
import { useColors, useIsDarkMode } from '../../hooks/useColors';

export const Search = ({ placeholder, onSearch }) => {
  const colors = useColors();
  const isDarkMode = useIsDarkMode();
  const [value, setValue] = useState('');
  function isBlank(str) {
    return !str || /^\s*$/.test(str);
  }

  const clear = () => {
    setValue('');
    if (onSearch) onSearch(undefined);
  };

  return (
    <Box
      display="flex"
      sx={{
        border: `1px solid ${
          isDarkMode ? colors.primary[100] : colors.primary[800]
        }`,
      }}
      borderRadius="3px"
      maxWidth="150px"
    >
      <InputBase
        value={value}
        sx={{ ml: 2, flex: 1 }}
        placeholder={placeholder ? placeholder : 'Search'}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setValue(e.target.value);
            onSearch(isBlank(value) ? undefined : value);
          }
        }}
      />
      {!isBlank(value) && (
        <IconButton
          type="button"
          sx={{ p: 1 }}
          {...{
            onClick: clear,
          }}
        >
          <ClearOutlinedIcon />
        </IconButton>
      )}
      <IconButton
        type="button"
        sx={{ p: 1 }}
        {...(onSearch && {
          onClick: () => onSearch(isBlank(value) ? undefined : value),
        })}
      >
        <SearchIcon />
      </IconButton>
    </Box>
  );
};
