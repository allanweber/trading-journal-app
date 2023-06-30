import CloseIcon from '@mui/icons-material/Close';
import { Alert, Snackbar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import React, { createContext, useContext, useRef, useState } from 'react';

const useModalShow = () => {
  const [show, setShow] = useState(false);
  const onHide = () => {
    setShow(false);
  };
  return {
    show,
    setShow,
    onHide,
  };
};

const ToastrContext = createContext({});

const ToastrContextProvider = (props) => {
  const { setShow, show, onHide } = useModalShow();
  const [content, setContent] = useState();
  const resolver = useRef();

  const handleShow = (message) => {
    setContent({
      message,
    });
    setShow(true);
    return new Promise(function (resolve) {
      resolver.current = resolve;
    });
  };

  const toastrContext = {
    showToastr: handleShow,
  };

  const handleClose = () => {
    resolver.current && resolver.current(false);
    onHide();
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <ToastrContext.Provider value={toastrContext}>
      {props.children}
      {content && (
        <Snackbar
          open={show}
          autoHideDuration={6000}
          onClose={handleClose}
          action={action}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            open={show}
            onClose={handleClose}
            severity="info"
            sx={{ width: '100%' }}
          >
            {content.message}
          </Alert>
        </Snackbar>
      )}
    </ToastrContext.Provider>
  );
};

const useToastr = () => useContext(ToastrContext);

export { useToastr };

export default ToastrContextProvider;
