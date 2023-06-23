import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/header';
import { JournalBalance } from '../../containers/journals';
import { useJournalContext } from '../../context/JournalContext';
import { useGetBalance, useGetJournals } from '../../services/JournalQueries';

export const Dashboard = () => {
  const { journal } = useJournalContext();
  const { data: balance } = useGetBalance(journal.id);
  const { data: journals } = useGetJournals();
  const navigate = useNavigate();

  useEffect(() => {
    if (journals && journals.length === 0) {
      navigate('/first-journal');
    }
  }, [journals, navigate]);

  if (!journal) return <div></div>;

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title={`Dashboard ${journal.name}`}
          subtitle="Welcome To Trading Journal "
        />
      </Box>
      <JournalBalance balance={balance} />
    </Box>
  );
};
