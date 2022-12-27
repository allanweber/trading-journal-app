import StarOutlineIcon from '@mui/icons-material/StarOutline';
import TrendingDownOutlinedIcon from '@mui/icons-material/TrendingDownOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import { Box } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useColors } from '../../hooks/useColors';

export const Direction = ({ showEmpty = false, onChange }) => {
  const colors = useColors();
  const red = colors.redAccent[500];
  const green = colors.greenAccent[400];
  const [type, setType] = useState(showEmpty ? 'ALL' : 'LONG');
  const changeFilter = (type) => {
    setType(type);
    if (onChange) {
      onChange(type === 'ALL' ? undefined : type);
    }
  };
  return (
    <Box sx={{ flexGrow: 1, p: 1 }}>
      <ToggleButtonGroup
        value={type}
        onChange={(e, value) => changeFilter(value)}
        exclusive
        size="small"
      >
        {showEmpty && (
          <ToggleButton value="ALL" key="ALL">
            <StarOutlineIcon fontSize="small" />
            <Typography sx={{ ml: 1 }} variant="body2">
              ALL
            </Typography>
          </ToggleButton>
        )}
        <ToggleButton value="LONG" key="LONG">
          <TrendingUpOutlinedIcon color="success" fontSize="small" />
          <Typography sx={{ ml: 1 }} variant="body2" color={green}>
            LONG
          </Typography>
        </ToggleButton>
        <ToggleButton value="SHORT" key="SHORT">
          <TrendingDownOutlinedIcon color="error" fontSize="small" />
          <Typography sx={{ ml: 1 }} variant="body2" color={red}>
            SHORT
          </Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};
