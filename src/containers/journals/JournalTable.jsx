import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Box, Link, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';

import { useCallback, useState } from 'react';
import { Alert } from '../../components/alert';
import { useConfirmationModal } from '../../components/dialog/Confirmation';
import { useJournalContext } from '../../context/JournalContext';
import {
  useDeleteJournal,
  useGetJournals,
} from '../../services/JournalQueries';
import { displayDate } from '../../utilities/dateTimeUtilities';
import { currencyFormatter } from '../../utilities/numberUtilities';

export const JournalTable = ({ onEdit }) => {
  const { data, error, isLoading } = useGetJournals();
  const { journal: contextJournal, setJournal } = useJournalContext();
  const mutation = useDeleteJournal();
  const deleteConfirmation = useConfirmationModal();
  const [lastJournal, setLastJournal] = useState(false);

  const editAction = (journal) => {
    onEdit(journal);
  };

  const deleteAction = useCallback(
    async (journal) => {
      if (data.length === 1) {
        setLastJournal(true);
      } else {
        const result = await deleteConfirmation.showConfirmation(
          'Delete Journal',
          <div>
            <Typography fontSize={20}>
              Are you sure do you want to remove {journal.name}?
            </Typography>
            <Typography fontSize={14}>
              All entries for this journal will also be delete.
            </Typography>
            <Typography fontSize={14}>This action can not be undone</Typography>
          </div>
        );
        if (result) {
          mutation.mutate(journal.id);
          if (contextJournal.id === journal.id) {
            setJournal(data.find((item) => item.id !== journal.id));
          }
        }
      }
    },
    [mutation, deleteConfirmation, contextJournal, data, setJournal]
  );

  const columns = [
    {
      field: 'actions',
      type: 'actions',
      width: 30,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteOutlineOutlinedIcon />}
          label="Delete"
          onClick={() => deleteAction(params.row)}
        />,
      ],
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      renderCell: (params) => (
        <Link onClick={() => editAction(params.row)}>{params.row.name}</Link>
      ),
    },
    {
      field: 'startBalance',
      headerName: 'Start Balance',
      type: 'number',
      valueGetter: (params) =>
        currencyFormatter(params.row.startBalance, params.row.currency),
    },
    {
      field: 'startJournal',
      headerName: 'Start Journal',
      flex: 1,
      valueGetter: (params) => displayDate(params.row.startJournal),
    },
    {
      field: 'currency',
      headerName: 'Currency',
    },
  ];

  return (
    <Box>
      <Box marginBottom="10px">
        {mutation.isError && <Alert mutation={mutation} />}
      </Box>
      <DataGrid
        isLoading={isLoading}
        error={error}
        rows={data || []}
        columns={columns}
        autoHeight
        disableSelectionOnClick
        disableColumnMenu
      />
      <Box marginTop="10px">
        <Alert show={lastJournal} severity="error">
          You cannot delete the last journal, at least one journal must be
          present
        </Alert>
      </Box>
    </Box>
  );
};
