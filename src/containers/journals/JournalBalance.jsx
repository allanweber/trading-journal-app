import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { Accordion } from '../../components/accordion';
import { StatusCard } from '../../components/status-card';

const BalanceCards = ({ balance }) => {
  const accountBalance =
    (balance.accountBalance - balance.startBalance) / balance.startBalance;

  const available = balance.available / balance.accountBalance;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={3}>
        <StatusCard
          title="Account Balance"
          currency={balance.currency}
          value={balance.accountBalance}
          percentage={accountBalance}
          icon={<AccountBalanceWalletOutlinedIcon />}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <StatusCard
          title="Available to invest"
          currency={balance.currency}
          value={balance.available}
          percentage={available}
          icon={<MonetizationOnOutlinedIcon />}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <StatusCard
          title="Open Positions"
          currency={balance.currency}
          value={balance.openedPositions}
          icon={<PendingOutlinedIcon />}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <StatusCard
          title="Closed Positions"
          currency={balance.currency}
          value={balance.closedPositions}
          icon={<SavingsOutlinedIcon />}
        />
      </Grid>
    </Grid>
  );
};

export const JournalBalance = ({ balance }) => {
  return (
    <div>
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <Accordion title="Journal Balance">
          {balance && <BalanceCards balance={balance}></BalanceCards>}
        </Accordion>
      </Box>
      <Grid container sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {balance && <BalanceCards balance={balance}></BalanceCards>}
      </Grid>
    </div>
  );
};
