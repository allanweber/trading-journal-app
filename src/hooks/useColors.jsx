import { useTheme } from '@mui/material';
import { tokens } from '../theme';

export const useColors = () => {
  const theme = useTheme();
  return tokens(theme.palette.mode);
};

export const useMode = () => {
  const theme = useTheme();
  return theme.palette.mode;
};

export const usePalette = () => {
  const theme = useTheme();
  return theme.palette;
};

export const useIsDarkMode = () => {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
};

export const useIsLightMode = () => {
  const theme = useTheme();
  return theme.palette.mode === 'light';
};
