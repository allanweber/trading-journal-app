import { Box, Link, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Alert } from '../../components/alert';
import { Loading } from '../../components/loading';
import { useColors } from '../../hooks/useColors';
import { useDeleteEntry, useGetEntries } from '../../services/EntryQueries';
import { displayDateTime } from '../../utilities/dateTimeUtilities';
import {
  currencyFormatter,
  percentFormatter,
} from '../../utilities/numberUtilities';

export const EntriesTable = ({ journal }) => {
  const colors = useColors();
  const red = colors.redAccent[500];
  const green = colors.greenAccent[400];
  const JournalDataGrid = Loading(DataGrid);
  const { data, error, isLoading } = useGetEntries(journal.id);
  const mutation = useDeleteEntry(journal.id);
  const currency = journal.currency;

  const columns = [
    // {
    //   field: 'actions',
    //   type: 'actions',
    //   width: 30,
    //   getActions: (params) => [
    //     <GridActionsCellItem
    //       icon={<DeleteOutlineOutlinedIcon />}
    //       label="Delete"
    //       onClick={() => deleteAction(params.row)}
    //     />,
    //   ],
    // },
    {
      field: 'date',
      headerName: 'Entry Date',
      width: 140,
      valueGetter: (params) => displayDateTime(params.row.date),
    },
    {
      field: 'exitDate',
      headerName: 'Exit Date',
      width: 140,
      valueGetter: (params) => displayDateTime(params.row.exitDate),
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
      field: 'size',
      headerName: 'Entry Size',
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
      field: 'direction',
      headerName: 'Direction',
      width: 80,
      renderCell: (params) => {
        return (
          <Typography
            sx={{
              color: params.row.direction === 'SHORT' ? red : green,
            }}
          >
            {params.row.direction}
          </Typography>
        );
      },
    },
    {
      field: 'exitPrice',
      headerName: 'Exit Price',
      type: 'number',
      width: 130,
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
      renderCell: (params) => (
        <Typography
          sx={{
            color: params.row.netResult >= 0 ? green : red,
          }}
        >
          {currencyFormatter(params.row.netResult, currency)}
        </Typography>
      ),
    },
    {
      field: 'accountChange',
      headerName: 'Account Changed',
      type: 'number',
      width: 130,
      renderCell: (params) => (
        <Typography
          sx={{
            color: params.row.accountChange >= 0 ? green : red,
          }}
        >
          {percentFormatter(params.row.accountChange)}
        </Typography>
      ),
    },
  ];

  return (
    <Box>
      <Box marginBottom="10px">
        {mutation.isError && <Alert mutation={mutation} />}
      </Box>
      <JournalDataGrid
        isLoading={isLoading}
        error={error}
        rows={data}
        columns={columns}
        autoHeight
        disableSelectionOnClick
        disableColumnMenu
      />
    </Box>
  );
};
