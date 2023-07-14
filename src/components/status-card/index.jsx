import { Box, Card, CardContent, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { usePalette } from '../../hooks/useColors';
import {
  currencyFormatter,
  percentFormatter,
} from '../../utilities/numberUtilities';

export const StatusCard = ({ title, value, currency, icon, percentage }) => {
  const palette = usePalette();

  const [formattedValue, setFormattedValue] = useState();
  const [formattedPercentage, setFormattedPercentage] = useState();
  const [valueColor, setValueColor] = useState();
  const [percentageColor, setPercentageColor] = useState();

  const red = palette.error.main;
  const green = palette.success.main;
  const secondary = palette.secondary.main;

  useEffect(() => {
    if (typeof value === 'number') {
      setFormattedValue(currencyFormatter(value, currency));
      if (value === 0) {
        setValueColor(secondary);
      } else if (value >= 0) {
        setValueColor(green);
      } else {
        setValueColor(red);
      }
    } else {
      setFormattedValue(value);
      setValueColor(secondary);
    }
  }, [value, currency, secondary, green, red]);

  useEffect(() => {
    if (percentage === 0) {
      setPercentageColor(secondary);
    } else if (percentage > 0) {
      setPercentageColor(green);
    } else {
      setPercentageColor(red);
    }
    setFormattedPercentage(percentFormatter(percentage));
  }, [percentage, secondary, green, red]);

  return (
    <Card variant="outlined">
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{ color: valueColor }}
            >
              {formattedValue}
            </Typography>
          </Box>
          <Box>{icon}</Box>
        </Box>
        <Box display="flex" justifyContent="space-between" mt="2px">
          <Typography variant="h5">{title}</Typography>
          {percentage && (
            <Typography
              variant="h5"
              fontStyle="italic"
              sx={{ color: percentageColor }}
            >
              {formattedPercentage}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
