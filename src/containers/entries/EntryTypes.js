import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CandlestickChartOutlinedIcon from '@mui/icons-material/CandlestickChartOutlined';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SavingsIcon from '@mui/icons-material/Savings';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

export const types = [
  {
    key: 'ALL',
    value: 'All',
    icon: <StarOutlineIcon />,
  },
  {
    key: 'TRADE',
    value: 'Trade',
    icon: <CandlestickChartOutlinedIcon />,
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

export const getByType = (type) => {
  return types.find((tp) => tp.key === type);
};
