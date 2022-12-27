import TrendingDownOutlinedIcon from '@mui/icons-material/TrendingDownOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import { Chip } from '@mui/material';

export const DirectionDisplay = ({ direction }) => {
  let color = 'error';
  if (direction === 'LONG') {
    color = 'success';
  }

  if (direction) {
    return (
      <Chip
        label={direction}
        variant="outlined"
        size="small"
        color={color}
        icon={
          direction === 'LONG' ? (
            <TrendingUpOutlinedIcon />
          ) : (
            <TrendingDownOutlinedIcon />
          )
        }
        sx={{ width: '70px' }}
      />
    );
  }
  return null;
};
