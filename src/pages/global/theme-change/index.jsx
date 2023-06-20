import { useTheme } from '@emotion/react';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { IconButton } from '@mui/material';
import { useContext, useEffect } from 'react';
import { saveTheme } from '../../../services/ConfigurationStorage';
import { ColorModeContext } from '../../../theme';

export const ThemeChange = () => {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();

  const changeTheme = () => {
    colorMode.toggleColorMode();
  };

  useEffect(() => {
    saveTheme(theme.palette.mode);
  }, [theme]);

  return (
    <IconButton onClick={changeTheme}>
      {theme.palette.mode === 'dark' ? (
        <LightModeOutlinedIcon />
      ) : (
        <DarkModeOutlinedIcon />
      )}
    </IconButton>
  );
};
