import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SavingsIcon from '@mui/icons-material/Savings';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Box } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

const types = [
  {
    key: 'ALL',
    value: 'All',
    icon: <StarOutlineIcon />,
  },
  {
    key: 'TRADE',
    value: 'Trade',
    icon: <TrendingUpIcon />,
  },
  {
    key: 'DEPOSIT',
    value: 'Deposit',
    icon: <SavingsIcon />,
  },
  {
    key: 'WITHDRAWAL',
    value: 'Withdrawal',
    icon: <CurrencyExchangeIcon />,
  },
  {
    key: 'TAXES',
    value: 'Taxes',
    icon: <AccountBalanceIcon />,
  },
];

export const EntrySelect = ({ filterChanged }) => {
  const [type, setType] = useState('ALL');
  const changeFilter = (type) => {
    setType(type);
    if (filterChanged) {
      filterChanged(type === 'ALL' ? undefined : type);
    }
  };

  return (
    <Box>
      <Box sx={{ flexGrow: 1, p: 1, display: { xs: 'none', md: 'flex' } }}>
        <ToggleButtonGroup
          value={type}
          onChange={(e, value) => changeFilter(value)}
          exclusive
          size="small"
        >
          {types.map((type) => (
            <ToggleButton value={type.key} key={type.key}>
              {React.cloneElement(type.icon, {
                color: 'secondary',
                fontSize: 'small',
              })}
              <Typography sx={{ ml: 1 }} variant="body2">
                {type.value}
              </Typography>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
};
