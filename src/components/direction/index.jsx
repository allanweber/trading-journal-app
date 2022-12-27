import { Chip } from '@mui/material';

export const Direction = ({ direction }) => {
  let color = 'error';
  if (direction === 'LONG') {
    color = 'success';
  }

  if (direction) {
    return (
      <Chip label={direction} variant="outlined" size="small" color={color} />
    );
  }
  return null;
};
