import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useColors, useIsDarkMode } from '../../hooks/useColors';
import {
  currencyFormatter,
  percentFormatter,
} from '../../utilities/numberUtilities';

export const StatusCard = ({ title, value, currency, icon, percentage }) => {
  const colors = useColors();
  const [formattedValue, setFormattedValue] = useState();
  const [formattedPercentage, setFormattedPercentage] = useState();
  const [valueColor, setValueColor] = useState();
  const [percentageColor, setPercentageColor] = useState();
  const isDarkMode = useIsDarkMode();

  useEffect(() => {
    if (typeof value === 'number') {
      setFormattedValue(currencyFormatter(value, currency));
      if (value === 0) {
        setValueColor(colors.grey[100]);
      } else if (value >= 0) {
        setValueColor(colors.greenAccent[400]);
      } else {
        setValueColor(colors.redAccent[500]);
      }
    } else {
      setFormattedValue(value);
      setValueColor(colors.grey[100]);
    }
  }, [value, currency, colors]);

  useEffect(() => {
    if (percentage === 0) {
      setPercentageColor(colors.grey[100]);
    } else if (percentage > 0) {
      setPercentageColor(colors.greenAccent[400]);
    } else {
      setPercentageColor(colors.redAccent[500]);
    }
    setFormattedPercentage(percentFormatter(percentage));
  }, [percentage, colors]);

  return (
    <Box
      p="20px"
      maxWidth="300px"
      backgroundColor={isDarkMode ? colors.primary[400] : colors.primary[300]}
    >
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h3" fontWeight="bold" sx={{ color: valueColor }}>
            {formattedValue}
          </Typography>
        </Box>
        <Box>{icon}</Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: colors.grey[100] }}>
          {title}
        </Typography>
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
    </Box>
  );
};
