import CloseIcon from '@mui/icons-material/Close';
import { Alert as MuiAlert } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';

export const Alert = ({
  mutation,
  severity,
  show,
  children,
  closeable = true,
  onClose,
  ...rest
}) => {
  const [open, setOpen] = useState(show);

  useEffect(() => {
    setOpen(show);
  }, [show]);

  useEffect(() => {
    if (mutation) {
      setOpen(true);
    }
  }, [mutation]);

  const closeAlert = () => {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const Close = () => {
    if (closeable) {
      return (
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={closeAlert}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      );
    } else {
      return null;
    }
  };

  if (mutation) {
    return (
      <div>
        <Collapse in={open}>
          {mutation.isError && mutation.error ? (
            <MuiAlert severity="error" action={<Close />} {...rest}>
              <span style={{ whiteSpace: 'pre-line' }}>
                {mutation.error.message}
              </span>
            </MuiAlert>
          ) : null}
        </Collapse>
      </div>
    );
  }

  return (
    <Collapse in={open}>
      <MuiAlert severity={severity} action={<Close />} {...rest}>
        <span style={{ whiteSpace: 'pre-line' }}>{children}</span>
      </MuiAlert>
    </Collapse>
  );
};
