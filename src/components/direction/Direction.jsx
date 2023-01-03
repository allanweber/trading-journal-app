import StarOutlineIcon from '@mui/icons-material/StarOutline';
import TrendingDownOutlinedIcon from '@mui/icons-material/TrendingDownOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import { Box, useTheme } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useColors } from '../../hooks/useColors';

export const Direction = ({
  onChange,
  value,
  showEmpty = false,
  size = 'medium',
}) => {
  const colors = useColors();
  const theme = useTheme();
  const [type, setType] = useState(showEmpty ? 'ALL' : value || 'LONG');
  const changeFilter = (type) => {
    if (type !== null) {
      setType(type);
      if (onChange) {
        onChange(type === 'ALL' ? undefined : type);
      }
    }
  };
  return (
    <Box>
      <ToggleButtonGroup
        value={type}
        onChange={(e, value) => changeFilter(value)}
        exclusive
        size={size}
        sx={{
          '& .Mui-selected.long': {
            color: '#E7F2FE !important',
            backgroundColor: `${
              theme.palette.mode === 'dark'
                ? colors.greenAccent[700]
                : colors.greenAccent[300]
            }`,
            '&:hover': {
              backgroundColor: `${
                theme.palette.mode === 'dark'
                  ? colors.greenAccent[700]
                  : colors.greenAccent[300]
              }`,
            },
          },
          '& .Mui-selected.short': {
            color: '#E7F2FE !important',
            backgroundColor: `${
              theme.palette.mode === 'dark'
                ? colors.redAccent[700]
                : colors.redAccent[300]
            }`,
            '&:hover': {
              backgroundColor: `${
                theme.palette.mode === 'dark'
                  ? colors.redAccent[700]
                  : colors.redAccent[300]
              }`,
            },
          },
        }}
      >
        {showEmpty && (
          <ToggleButton value="ALL" key="ALL">
            <StarOutlineIcon fontSize={size} />
            <Typography sx={{ ml: 1 }}>ALL</Typography>
          </ToggleButton>
        )}
        <ToggleButton value="LONG" key="LONG" className="long">
          <TrendingUpOutlinedIcon fontSize={size} />
          <Typography sx={{ ml: 1 }}>LONG</Typography>
        </ToggleButton>
        <ToggleButton value="SHORT" key="SHORT" className="short">
          <TrendingDownOutlinedIcon fontSize={size} />
          <Typography sx={{ ml: 1 }}>SHORT</Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};
