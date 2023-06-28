import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined';
import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Box, IconButton, Paper, Tooltip } from '@mui/material';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { StrategiesTable } from '../../routes/strategies/StrategiesTable';
import { Dialog } from '../dialog/Dialog';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export const StrategySelect = ({
  onChanged,
  selectedValues,
  emptyLabel = 'All Strategies',
  small = false,
}) => {
  const [selected, setSelected] = useState();
  const [hasSelection, setHasSelection] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    setSelected(selectedValues);
  }, [selectedValues]);

  const openDialog = () => {
    setOpenForm(true);
  };

  const closeDialog = () => {
    setOpenForm(false);
  };

  const onRowsSelected = (rows) => {
    setSelected(rows);
    change(rows);
  };

  const handleDelete = (toDelete) => () => {
    let selection = selected.filter((item) => item.id !== toDelete.id);
    selection = selection.length === 0 ? undefined : selection;
    setSelected(selection);
    change(selection);
  };

  const deleteAll = () => {
    setSelected();
    change();
  };

  const change = (selection) => {
    if (onChanged) {
      onChanged(selection);
    }
  };

  useEffect(() => {
    if (selected && selected.length > 0) {
      setHasSelection(true);
    } else {
      setHasSelection(false);
    }
  }, [selected]);

  return (
    <div>
      <Dialog
        open={openForm}
        onClose={closeDialog}
        title="Select one or many strategies"
        icon={<ExtensionOutlinedIcon />}
      >
        <StrategiesTable
          selectOnly={true}
          onRowsSelected={onRowsSelected}
          selectedRows={selected}
        />
      </Dialog>
      <Box>
        <Paper
          variant="outlined"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            listStyle: 'none',
            pl: small ? 0.5 : 0,
            p: small ? null : 0.5,
          }}
        >
          {!hasSelection && (
            <Chip
              size={small ? 'small' : 'medium'}
              label={emptyLabel}
              onClick={openDialog}
            />
          )}

          {selected &&
            selected.map((data) => {
              return (
                <ListItem key={data.id}>
                  <Chip
                    size={small ? 'small' : 'medium'}
                    label={data.name}
                    onDelete={handleDelete(data)}
                    sx={{
                      backgroundColor: data.color,
                    }}
                  />
                </ListItem>
              );
            })}
          <Tooltip title="Filter Strategies">
            <IconButton type="button" onClick={openDialog}>
              <FilterAltOutlinedIcon />
            </IconButton>
          </Tooltip>
          {hasSelection && (
            <Tooltip title="Clear Strategies Filter">
              <IconButton type="button" onClick={deleteAll}>
                <FilterAltOffOutlinedIcon />
              </IconButton>
            </Tooltip>
          )}
        </Paper>
      </Box>
    </div>
  );
};
