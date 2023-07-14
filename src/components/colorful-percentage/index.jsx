import { Typography } from '@mui/material';
import { usePalette } from '../../hooks/useColors';
import { percentFormatter } from '../../utilities/numberUtilities';

export const ColorfulPercentage = ({ value }) => {
  const palette = usePalette();
  const red = palette.error.main;
  const green = palette.success.main;

  if (value === undefined) {
    return null;
  }

  return (
    <Typography
      fontSize="1rem"
      sx={{
        color: value >= 0 ? green : red,
      }}
    >
      {percentFormatter(value)}
    </Typography>
  );
};
