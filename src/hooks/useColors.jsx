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
