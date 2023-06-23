import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import { Box, Link, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from '../../components/alert';
import { ColorfulCurrency } from '../../components/colorful-currency';
import { ColorfulPercentage } from '../../components/colorful-percentage';
import { DateTimeDisplay } from '../../components/datetime-display';
import { useConfirmationModal } from '../../components/dialog/Confirmation';
import { Dialog } from '../../components/dialog/Dialog';
import { DirectionDisplay } from '../../components/direction/DirectionDisplay';
import { useDeleteEntry, useGetEntries } from '../../services/EntryQueries';
import { currencyFormatter } from '../../utilities/numberUtilities';
import { EntryDetails } from './EntryDetails';
import { getByType } from './EntryTypes';
import { TradeForm } from './TradeForm';

const SORT = [
  {
    field: 'date',
    sort: 'asc',
  },
];

export const EntriesTable = ({ args }) => {
  const { journal } = args;
  const [openEdit, setOpenEdit] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [trade, setTrade] = useState(undefined);
  const [entry, setEntry] = useState(undefined);
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 10,
  });

  const [sortModel, setSortModel] = useState(SORT);
  const [sortItems, setSortItems] = useState('date,desc');

  const { data, error, isLoading } = useGetEntries({
    ...args,
    journalId: journal.id,
    page: pagination.page,
    size: pagination.pageSize,
    sort: sortItems,
  });

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

  const { currency } = journal;

  const mutation = useDeleteEntry(journal.id);
  const deleteConfirmation = useConfirmationModal();

  const deleteAction = useCallback(
    async (entry) => {
      const result = await deleteConfirmation.showConfirmation(
        'Delete Journal',
        <div>
          <Typography fontSize={20}>
            Are you sure do you want to remove this {entry.type}?
          </Typography>
          {entry.type === 'TRADE' && (
            <Typography fontSize={14}>
              All data end profits of {entry.symbol} will be removed
            </Typography>
          )}
          <Typography fontSize={14}>This action can not be undone</Typography>
        </div>
      );
      if (result) {
        mutation.mutate(entry.id);
      }
    },
    [mutation, deleteConfirmation]
  );

  const closeDialog = () => {
    setOpenEdit(false);
    setOpenDetails(false);
    setTrade(undefined);
  };

  const editAction = (trade) => {
    setTrade(trade);
    setOpenEdit(true);
  };

  const showAction = (entry) => {
    if (args.status === 'OPEN') {
      editAction(entry);
    } else {
      setEntry(entry);
      setOpenDetails(true);
    }
  };

  const handleSortModelChange = useCallback((model) => {
    if (model.length === 0) {
      model = SORT;
    }
    setSortItems(`${model[0].field},${model[0].sort}`);
    setSortModel(model);
  }, []);

  const columns = [
    {
      field: 'delete',
      type: 'actions',
      headerName: 'Del',
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
      field: 'edit',
      type: 'actions',
      width: 30,
      headerName: 'Edit',
      hide: args.status === 'CLOSED',
      getActions: (params) => [
        <GridActionsCellItem
          icon={<ModeOutlinedIcon />}
          label="Edit"
          onClick={() => editAction(params.row)}
        />,
      ],
    },
    {
      field: 'date',
      headerName: 'Open Date',
      width: 140,
      renderCell: (params) => <DateTimeDisplay date={params.row.date} />,
    },
    {
      field: 'exitDate',
      headerName: 'Close Date',
      width: 140,
      hide: args.status === 'OPEN',
      renderCell: (params) => <DateTimeDisplay date={params.row.exitDate} />,
    },
    {
      field: 'symbol',
      headerName: 'Symbol',
      flex: 1,
      renderCell: (params) => (
        <Link key={params.row.id} onClick={(e) => showAction(params.row)}>
          {params.row.symbol || params.row.type}
        </Link>
      ),
    },
    {
      field: 'direction',
      headerName: 'Direction',
      width: 100,
      renderCell: (params) => (
        <DirectionDisplay direction={params.row.direction} />
      ),
    },
    {
      field: 'size',
      headerName: 'Quantity',
      type: 'number',
      width: 130,
      valueGetter: (params) => {
        if (params.row.type === 'TRADE') {
          return currencyFormatter(params.row.size);
        }
      },
    },
    {
      field: 'price',
      headerName: 'Entry Price',
      type: 'number',
      width: 130,
      valueGetter: (params) => currencyFormatter(params.row.price, currency),
    },
    {
      field: 'plannedRR',
      headerName: 'Planned RR',
      type: 'number',
      width: 130,
      valueGetter: (params) => currencyFormatter(params.row.plannedRR),
    },
    {
      field: 'exitPrice',
      headerName: 'Exit Price',
      type: 'number',
      width: 130,
      hide: args.status === 'OPEN',
      valueGetter: (params) => {
        if (params.row.exitPrice) {
          return currencyFormatter(params.row.exitPrice, currency);
        }
      },
    },
    {
      field: 'netResult',
      headerName: 'Net Result',
      type: 'number',
      width: 130,
      hide: args.status === 'OPEN',
      renderCell: (params) => (
        <ColorfulCurrency value={params.row.netResult} currency={currency} />
      ),
    },
    {
      field: 'accountChange',
      headerName: 'Account Changed',
      type: 'number',
      width: 130,
      hide: args.status === 'OPEN',
      renderCell: (params) => (
        <ColorfulPercentage value={params.row.accountChange} />
      ),
    },
    {
      field: 'accountRisked',
      headerName: 'Account Risked',
      type: 'number',
      width: 130,
      hide: args.status === 'CLOSED',
      renderCell: (params) => (
        <ColorfulPercentage value={params.row.accountRisked} />
      ),
    },
  ];

  return (
    <Box>
      <Box marginBottom="10px">
        {mutation.isError && <Alert mutation={mutation} />}
      </Box>
      <DataGrid
        error={error}
        loading={isLoading}
        rows={items}
        columns={columns}
        autoHeight
        disableSelectionOnClick
        disableColumnMenu
        sortModel={sortModel}
        onSortModelChange={handleSortModelChange}
        rowsPerPageOptions={[10, 20, 50, 100]}
        pageSize={pagination.pageSize}
        onPageChange={handleChangePage}
        onPageSizeChange={handleChangePageSize}
        rowCount={rowCount}
        paginationMode="server"
      />
      <Dialog
        maxWidth="lg"
        open={openEdit}
        onClose={closeDialog}
        title={trade && `Edit ${trade.symbol}`}
        icon={getByType('TRADE').icon}
      >
        <TradeForm
          journal={journal}
          onCancel={closeDialog}
          {...(trade && { trade: trade })}
        />
      </Dialog>
      <Dialog
        maxWidth="md"
        open={openDetails}
        onClose={closeDialog}
        title={
          entry &&
          `${entry.type === 'TRADE' ? entry.symbol : entry.type} Details`
        }
        icon={entry && getByType(entry.type).icon}
      >
        <EntryDetails {...(entry && { entry: entry })} />
      </Dialog>
    </Box>
  );
};
