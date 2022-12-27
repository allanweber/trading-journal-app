import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Box, Link, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { useCallback } from 'react';
import { Alert } from '../../components/alert';
import { ColorfulCurrency } from '../../components/colorful-currency';
import { ColorfulPercentage } from '../../components/colorful-percentage';
import { DateTimeDisplay } from '../../components/datetime-display';
import { useConfirmationModal } from '../../components/dialog/Confirmation';
import { DirectionDisplay } from '../../components/direction/DirectionDisplay';
import { Loading } from '../../components/loading';
import { useDeleteEntry, useGetEntries } from '../../services/EntryQueries';
import { currencyFormatter } from '../../utilities/numberUtilities';

export const EntriesTable = ({ args }) => {
  const { journal } = args;
  const DataGridLoading = Loading(DataGrid);
  const { data, error, isLoading } = useGetEntries({
    ...args,
    journalId: journal.id,
  });
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
      renderCell: (params) => {
        if (params.row.type === 'TRADE') {
          return <Link key={params.row.id}>{params.row.symbol}</Link>;
        } else {
          return <Typography fontStyle="italic">{params.row.type}</Typography>;
        }
      },
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
  ];

  return (
    <Box>
      <Box marginBottom="10px">
        {mutation.isError && <Alert mutation={mutation} />}
      </Box>
      <DataGridLoading
        error={error}
        loading={isLoading}
        rows={data || []}
        columns={columns}
        density="comfortable"
        autoHeight
        disableSelectionOnClick
        disableColumnMenu
      />
    </Box>
  );
};
