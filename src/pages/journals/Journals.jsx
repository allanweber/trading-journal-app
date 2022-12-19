import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import { Box, Button } from '@mui/material';
import { useState } from 'react';
import { Dialog } from '../../components/dialog/Dialog';
import { Header } from '../../components/header';
import { JournalForm, JournalTable } from '../../containers/journals';

export const Journals = () => {
  const [journal, setJournal] = useState(undefined);
  const [openForm, setOpenForm] = useState(false);

  const openDialog = () => {
    setOpenForm(true);
  };

  const closeDialog = () => {
    setOpenForm(false);
  };

  const onNew = () => {
    setJournal(undefined);
    openDialog();
  };

  const onEdit = (journal) => {
    setJournal(journal);
    openDialog();
  };

  return (
    <div>
      <Box m="10px">
        <Box display="flex" justifyContent="space-between">
          <Header title="Journals" subtitle="Manage your journals" />

          <Box>
            <Button variant="contained" onClick={onNew}>
              <AddCircleOutlineOutlinedIcon sx={{ mr: '5px' }} />
              New Journal
            </Button>
          </Box>
        </Box>
        <JournalTable onEdit={onEdit} />
      </Box>
      <Dialog
        open={openForm}
        onClose={closeDialog}
        title="Add Journal"
        icon={<AutoStoriesOutlinedIcon />}
      >
        <JournalForm
          journal={journal}
          onCancel={closeDialog}
          onSaved={closeDialog}
        />
      </Dialog>
    </div>
  );
};
