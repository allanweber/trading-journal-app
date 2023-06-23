import { Box } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/header';
import { JournalForm } from '../../containers/journals';
import { useJournalContext } from '../../context/JournalContext';

export const FirstJournal = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setJournal } = useJournalContext();

  const onSaved = (journal) => {
    setJournal(journal);
    queryClient.invalidateQueries(['journals']);
    setTimeout(() => {
      navigate('/entries');
    }, 1000);
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="You need to create your first journal"
          subtitle="Create you first journal and start adding your trades"
        />
      </Box>
      <Box display="flex" justifyContent="center">
        <JournalForm onSaved={onSaved} showCancel={false} />
      </Box>
    </Box>
  );
};
