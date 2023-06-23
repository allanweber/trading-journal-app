import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined';
import { Box, Button } from '@mui/material';
import { useState } from 'react';
import { Dialog } from '../../components/dialog/Dialog';
import { Header } from '../../components/header';
import { StrategiesTable } from './StrategiesTable';
import { StrategyForm } from './StrategyForm';

export const Strategies = () => {
  const [strategy, setStrategy] = useState(undefined);
  const [openForm, setOpenForm] = useState(false);

  const openDialog = () => {
    setOpenForm(true);
  };

  const closeDialog = () => {
    setOpenForm(false);
  };

  const onNew = () => {
    setStrategy(undefined);
    openDialog();
  };

  const onEdit = (strategy) => {
    setStrategy(strategy);
    openDialog();
  };

  return (
    <div>
      <Box m="10px">
        <Box display="flex" justifyContent="space-between">
          <Header title="Strategies" subtitle="Manage your strategies" />

          <Box>
            <Button variant="contained" onClick={onNew}>
              <AddCircleOutlineOutlinedIcon sx={{ mr: '5px' }} />
              New Strategy
            </Button>
          </Box>
        </Box>
        <StrategiesTable onEdit={onEdit} />
      </Box>
      <Dialog
        open={openForm}
        onClose={closeDialog}
        title={strategy ? `Edit ${strategy.name}` : 'Add Strategy'}
        icon={<ExtensionOutlinedIcon />}
      >
        <StrategyForm
          strategy={strategy}
          onCancel={closeDialog}
          onSaved={closeDialog}
        />
      </Dialog>
    </div>
  );
};
