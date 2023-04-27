import { Box } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import React, { useCallback } from 'react';
import { Uploader } from '../../components/uploader';
import { config } from '../../utilities/config';
import { EntryImagesList } from './EntryImagesList';

export const EntryImages = ({ entry, journal }) => {
  const queryClient = useQueryClient();

  const onFinish = useCallback(() => {
    queryClient.invalidateQueries(`entry-${entry.id}-images`);
  }, [entry, queryClient]);

  const uploadRequest = {
    url: `${config.entries}/journals/${journal.id}/entries/${entry.id}/image`,
    paramName: 'file  ',
    onFinish: onFinish,
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <EntryImagesList entry={entry} />
      <Uploader {...uploadRequest} />
    </Box>
  );
};
