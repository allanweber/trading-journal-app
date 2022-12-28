import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog as MuiDialog, Typography } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import { forwardRef } from 'react';
import { useColors } from '../../hooks/useColors';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Dialog = ({
  open,
  children,
  title,
  icon,
  fullScreen = false,
  onClose,
}) => {
  const colors = useColors();
  return (
    <MuiDialog
      open={open}
      fullScreen={fullScreen}
      TransitionComponent={Transition}
      sx={{
        '& .MuiDialogContent-root, & .MuiDialogTitle-root': {
          backgroundColor: colors.primary[400],
        },
      }}
    >
      <DialogTitle minWidth={300}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex">{icon && icon}</Box>
          <Box display="flex">
            <Typography variant="h4">{title}</Typography>
          </Box>

          <Box display="flex">
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 10,
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </MuiDialog>
  );
};
