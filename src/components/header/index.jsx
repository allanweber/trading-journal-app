import { Box, Typography } from '@mui/material';
import { useColors } from '../../hooks/useColors';

export const Header = ({ title, subtitle }) => {
  const colors = useColors();
  return (
    <Box mb="10px">
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: '0 0 5px 0' }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.grey[400]}>
        {subtitle}
      </Typography>
    </Box>
  );
};
