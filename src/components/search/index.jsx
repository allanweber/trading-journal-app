import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, InputBase } from '@mui/material';
import { useState } from 'react';
import { useColors, useMode } from '../../hooks/useColors';

export const Search = ({ placeholder, onSearch }) => {
  const colors = useColors();
  const mode = useMode();
  const [value, setValue] = useState(undefined);
  function isBlank(str) {
    return !str || /^\s*$/.test(str);
  }
  return (
    <Box
      display="flex"
      backgroundColor={
        mode === 'dark' ? colors.primary[200] : colors.primary[900]
      }
      borderRadius="3px"
    >
      <InputBase
        sx={{ ml: 2, flex: 1 }}
        placeholder={placeholder ? placeholder : 'Search'}
        onChange={(event) => setValue(event.target.value)}
      />
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
