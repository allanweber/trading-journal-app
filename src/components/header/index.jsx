import { Box, Typography } from '@mui/material';

export const Header = ({ title, subtitle }) => {
  return (
    <Box mb="10px">
      <Typography variant="h2" fontWeight="bold" sx={{ m: '0 0 5px 0' }}>
        {title}
      </Typography>
      <Typography variant="h5">{subtitle}</Typography>
    </Box>
  );
};
