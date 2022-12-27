import { Typography } from '@mui/material';
import { useColors } from '../../hooks/useColors';
import { percentFormatter } from '../../utilities/numberUtilities';

export const ColorfulPercentage = ({ value }) => {
  const colors = useColors();
  const red = colors.redAccent[500];
  const green = colors.greenAccent[400];

  if (!value) {
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
