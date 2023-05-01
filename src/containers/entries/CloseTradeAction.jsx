import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import React, { useState } from 'react';
import { Button } from '../../components/button/Button';
import { Dialog } from '../../components/dialog/Dialog';
import { CloseTrade } from './CloseTrade';
import { getByType } from './EntryTypes';

export const CloseTradeAction = ({ trade, journal, onChange }) => {
  const [show, setShow] = useState(false);

  const open = () => {
    setShow(true);
  };

  const close = () => {
    setShow(false);
  };

  const change = (trade) => {
    if (onChange) {
      onChange(trade);
    }
    close();
  };

  return (
    <div>
      <Button
        type="button"
        fullWidth
        startIcon={<DoneAllOutlinedIcon />}
        onClick={open}
      >
        Close {trade.symbol}
      </Button>
      <Dialog
        open={show}
        onClose={close}
        title={`Close ${trade.symbol}`}
        icon={getByType('TRADE').icon}
        maxWidth="md"
      >
        <CloseTrade
          trade={trade}
          journal={journal}
          onSave={change}
          onCancel={close}
        />
      </Dialog>
    </div>
  );
};
