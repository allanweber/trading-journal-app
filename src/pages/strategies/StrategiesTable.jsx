import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Box, Link, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';

import { useCallback } from 'react';
import { Alert } from '../../components/alert';
import { useConfirmationModal } from '../../components/dialog/Confirmation';
import {
  useDeleteStrategy,
  useGetStrategies,
} from '../../services/StrategyQueries';

export const StrategiesTable = ({
  onEdit,
  selectOnly = false,
  onRowsSelected,
  selectedRows,
}) => {
  const { data, error, isLoading } = useGetStrategies();
  const mutation = useDeleteStrategy();
  const deleteConfirmation = useConfirmationModal();

  const editAction = (strategy) => {
    onEdit(strategy);
  };

  const dataSelected = (ids) => {
    const rowsSelected = ids.map((id) => data.find((row) => row.id === id));
    if (onRowsSelected) {
      onRowsSelected(rowsSelected);
    }
  };

  const selectionChanged = selectedRows && selectedRows.map((row) => row.id);

  const deleteAction = useCallback(
    async (strategy) => {
      const result = await deleteConfirmation.showConfirmation(
        'Delete Strategy',
        <div>
          <Typography fontSize={20}>
            Are you sure do you want to remove {strategy.name}?
          </Typography>
          <Typography fontSize={14}>This action can not be undone</Typography>
        </div>
      );
      if (result) {
        mutation.mutate(strategy.id);
      }
    },
    [mutation, deleteConfirmation]
  );

  const columns = [
    {
      field: 'actions',
      type: 'actions',
      width: 30,
      hide: selectOnly,
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
        checkboxSelection={selectOnly}
        onSelectionModelChange={dataSelected}
        selectionModel={selectionChanged}
      />
    </Box>
  );
};
