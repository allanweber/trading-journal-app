import { useTheme } from '@emotion/react';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { IconButton } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext } from '../../../theme';

export const ThemeChange = () => {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  return (
    <IconButton onClick={colorMode.toggleColorMode}>
      {theme.palette.mode === 'dark' ? (
        <LightModeOutlinedIcon />
      ) : (
        <DarkModeOutlinedIcon />
      )}
    </IconButton>
  );
};
