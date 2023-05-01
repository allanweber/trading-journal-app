import { Typography } from '@mui/material';
import { useColors } from '../../hooks/useColors';
import { currencyFormatter } from '../../utilities/numberUtilities';

export const ColorfulCurrency = ({ value, currency }) => {
  const colors = useColors();
  const red = colors.redAccent[500];
  const green = colors.greenAccent[400];

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
      {currency && currencyFormatter(value, currency)}
      {!currency && currencyFormatter(value)}
    </Typography>
  );
};
