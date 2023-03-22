import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Box, Link, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

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
  const [items, setItems] = useState(undefined);
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 10,
  });
  const { data, error, isLoading } = useGetStrategies(
    pagination.page,
    pagination.pageSize
  );
  const mutation = useDeleteStrategy();
  const deleteConfirmation = useConfirmationModal();

  const [rowCount, setRowCount] = useState(0);

  const handleChangePage = (newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  const handleChangePageSize = (newSize) => {
    setPagination({ ...pagination, pageSize: newSize });
  };

  useEffect(() => {
    if (data) {
      setItems(data.items);
      setRowCount(data.totalItems);
    }
  }, [data]);

  const editAction = (strategy) => {
    onEdit(strategy);
  };

  const dataSelected = (ids) => {
    const rowsSelected = ids.map((id) => items.find((row) => row.id === id));
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
        loading={isLoading}
        error={error}
        rows={items || []}
        columns={columns}
        autoHeight
        disableSelectionOnClick
        disableColumnMenu
        checkboxSelection={selectOnly}
        onSelectionModelChange={dataSelected}
        selectionModel={selectionChanged}
        rowsPerPageOptions={[10, 20, 50, 100]}
        pageSize={pagination.pageSize}
        onPageChange={handleChangePage}
        onPageSizeChange={handleChangePageSize}
        rowCount={rowCount}
        paginationMode="server"
      />
    </Box>
  );
};
