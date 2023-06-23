import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Box, Chip, Link, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from '../../components/alert';
import { useConfirmationModal } from '../../components/dialog/Confirmation';
import {
  useDeleteStrategy,
  useGetStrategies,
} from '../../services/StrategyQueries';

const SORT = [
  {
    field: 'name',
    sort: 'asc',
  },
];

export const StrategiesTable = ({
  onEdit,
  selectOnly = false,
  onRowsSelected,
  selectedRows,
}) => {
  const [selection, setSelection] = useState();
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 10,
  });

  const [sortModel, setSortModel] = useState(SORT);
  const [sortItems, setSortItems] = useState('name,asc');

  const { data, error, isLoading } = useGetStrategies(
    pagination.page,
    pagination.pageSize,
    sortItems
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
      setItems(data.content);
      setRowCount(data.total);
    }
  }, [data]);

  useEffect(() => {
    if (selectedRows) {
      setSelection(selectedRows.map((row) => row.id));
    }
  }, [selectedRows]);

  const editAction = (strategy) => {
    onEdit(strategy);
  };

  const dataSelected = (ids) => {
    const rowsSelected = ids.map((id) => items.find((row) => row.id === id));
    if (onRowsSelected) {
      onRowsSelected(rowsSelected);
    }
  };

  const handleSortModelChange = useCallback((model) => {
    if (model.length === 0) {
      model = SORT;
    }
    setSortItems(`${model[0].field},${model[0].sort}`);
    setSortModel(model);
  }, []);

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
          key={params.row.id}
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
        <Stack direction="row" spacing={1}>
          {selectOnly ? (
            <Typography>{params.row.name}</Typography>
          ) : (
            <Link onClick={() => editAction(params.row)}>
              {params.row.name}
            </Link>
          )}
          {params.row.color && (
            <Chip
              size="small"
              sx={{
                backgroundColor: params.row.color,
              }}
            />
          )}
        </Stack>
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
        rows={items}
        columns={columns}
        autoHeight
        disableSelectionOnClick
        disableColumnMenu
        checkboxSelection={selectOnly}
        onSelectionModelChange={dataSelected}
        selectionModel={selection}
        sortModel={sortModel}
        onSortModelChange={handleSortModelChange}
        rowsPerPageOptions={[10, 20, 50, 100]}
        pageSize={pagination.pageSize}
        onPageChange={handleChangePage}
        onPageSizeChange={handleChangePageSize}
        rowCount={rowCount}
        paginationMode="server"
        sortingMode="server"
      />
    </Box>
  );
};
