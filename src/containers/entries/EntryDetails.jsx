import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ColorfulCurrency } from '../../components/colorful-currency';
import { ColorfulPercentage } from '../../components/colorful-percentage';
import { Duration } from '../../components/duration';
import { useJournalContext } from '../../context/JournalContext';
import { EntryImagesList } from './EntryImagesList';

const Title = ({ children }) => {
  return (
    <Typography textTransform="uppercase" noWrap>
      {children}
    </Typography>
  );
};

export const EntryDetails = ({ entry }) => {
  const { journal } = useJournalContext();
  const { currency } = journal;

  const [isTrade, setIsTrade] = useState();

  useEffect(() => {
    setIsTrade(entry.type === 'TRADE');
  }, [entry]);

  if (!entry) return null;
  return (
    <Box>
      <Grid container spacing={2}>
        {isTrade && entry.grossResult && (
          <Grid item xs={12} sm={6}>
            <Title>Gross Result</Title>
            <ColorfulCurrency value={entry.grossResult} currency={currency} />
          </Grid>
        )}
        {entry.netResult && (
          <Grid item xs={12} sm={6}>
            <Title>net Result</Title>
            <ColorfulCurrency value={entry.netResult} currency={currency} />
          </Grid>
        )}
        {entry.accountChange > 0 && (
          <Grid item xs={12} sm={6}>
            <Title>Account Change</Title>
            <ColorfulPercentage value={entry.accountChange} />
          </Grid>
        )}
        {entry.accountBalance > 0 && (
          <Grid item xs={12} sm={6}>
            <Title>Account Balance</Title>
            <ColorfulCurrency value={entry.accountBalance} />
          </Grid>
        )}
        {entry.accountRisked > 0 && (
          <Grid item xs={12} sm={6}>
            <Title>Account Risked</Title>
            <ColorfulPercentage value={entry.accountRisked} />
          </Grid>
        )}
        {isTrade && (
          <Grid item xs={12} sm={6}>
            <Title>Planned RR</Title>
            <ColorfulCurrency value={entry.plannedRR} />
          </Grid>
        )}
        {isTrade && (
          <Grid item xs={12} sm={6}>
            <Title>Duration</Title>
            <Duration start={entry.date} end={entry.exitDate} />
          </Grid>
        )}
        {entry.notes && (
          <Grid item xs={12} sm={12}>
            <Title>Notes</Title>
            <Typography>{entry.notes}</Typography>
          </Grid>
        )}
        {isTrade && (
          <Grid item xs={12} sm={12}>
            <Title>Trade Images</Title>
            <EntryImagesList entry={entry} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
