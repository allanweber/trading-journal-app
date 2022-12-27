import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import MoneyOffOutlinedIcon from '@mui/icons-material/MoneyOffOutlined';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { Box } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useColors } from '../../hooks/useColors';

export const WinLose = ({ onChange }) => {
  const colors = useColors();
  const red = colors.redAccent[500];
  const green = colors.greenAccent[400];
  const [type, setType] = useState('ALL');
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
        <ToggleButton value="ALL" key="ALL">
          <StarOutlineIcon fontSize="small" />
          <Typography sx={{ ml: 1 }} variant="body2">
            ALL
          </Typography>
        </ToggleButton>
        <ToggleButton value="WIN" key="WIN">
          <AttachMoneyOutlinedIcon color="success" fontSize="small" />
          <Typography sx={{ ml: 1 }} variant="body2" color={green}>
            WIN
          </Typography>
        </ToggleButton>
        <ToggleButton value="LOSE" key="LOSE">
          <MoneyOffOutlinedIcon color="error" fontSize="small" />
          <Typography sx={{ ml: 1 }} variant="body2" color={red}>
            LOSE
          </Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};
