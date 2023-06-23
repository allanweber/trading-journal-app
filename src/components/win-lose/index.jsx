import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import MoneyOffOutlinedIcon from '@mui/icons-material/MoneyOffOutlined';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { Box } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useColors, useIsDarkMode } from '../../hooks/useColors';

export const WinLose = ({ onChange }) => {
  const colors = useColors();
  const isDarkMode = useIsDarkMode();
  const [type, setType] = useState('ALL');
  const changeFilter = (type) => {
    setType(type);
    if (onChange) {
      onChange(type === 'ALL' ? undefined : type);
    }
  };
  return (
    <Box>
      <ToggleButtonGroup
        value={type}
        onChange={(e, value) => changeFilter(value)}
        exclusive
        size="small"
        sx={{
          '& .Mui-selected.win': {
            color: '#E7F2FE !important',
            backgroundColor: `${
              isDarkMode ? colors.greenAccent[700] : colors.greenAccent[300]
            }`,
            '&:hover': {
              backgroundColor: `${
                isDarkMode ? colors.greenAccent[700] : colors.greenAccent[300]
              }`,
            },
          },
          '& .Mui-selected.lose': {
            color: '#E7F2FE !important',
            backgroundColor: `${
              isDarkMode ? colors.redAccent[700] : colors.redAccent[300]
            }`,
            '&:hover': {
              backgroundColor: `${
                isDarkMode ? colors.redAccent[700] : colors.redAccent[300]
              }`,
            },
          },
        }}
      >
        <ToggleButton value="ALL" key="ALL">
          <StarOutlineIcon fontSize="small" />
          <Typography sx={{ ml: 1 }}>ALL</Typography>
        </ToggleButton>
        <ToggleButton value="WIN" key="WIN" className="win">
          <AttachMoneyOutlinedIcon fontSize="small" />
          <Typography sx={{ ml: 1 }}>WIN</Typography>
        </ToggleButton>
        <ToggleButton value="LOSE" key="LOSE" className="lose">
          <MoneyOffOutlinedIcon fontSize="small" />
          <Typography sx={{ ml: 1 }}>LOSE</Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};
