import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createContext, useContext, useRef, useState } from 'react';
import { Button } from '../button/Button';

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

const ConfirmationModalContext = createContext({});

const ConfirmationModalContextProvider = (props) => {
  const { setShow, show, onHide } = useModalShow();
  const [content, setContent] = useState();
  const resolver = useRef();

  const handleShow = (title, message) => {
    setContent({
      title,
      message,
    });
    setShow(true);
    return new Promise(function (resolve) {
      resolver.current = resolve;
    });
  };

  const modalContext = {
    showConfirmation: handleShow,
  };

  const handleOk = () => {
    resolver.current && resolver.current(true);
    onHide();
  };

  const handleCancel = () => {
    resolver.current && resolver.current(false);
    onHide();
  };

  return (
    <ConfirmationModalContext.Provider value={modalContext}>
      {props.children}
      {content && (
        <Dialog open={show}>
          <DialogTitle>{content.title}</DialogTitle>
          <DialogContent>{content.message}</DialogContent>
          <DialogActions>
            <Button
              onClick={handleCancel}
              variant="outlined"
              startIcon={<ClearIcon />}
            >
              Disagree
            </Button>
            <Button onClick={handleOk} startIcon={<CheckIcon />}>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </ConfirmationModalContext.Provider>
  );
};

const useConfirmationModal = () => useContext(ConfirmationModalContext);

export { useConfirmationModal };

export default ConfirmationModalContextProvider;
