import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Box, Menu } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import { cloneElement, useState } from 'react';
import { Button } from '../../components/button/Button';
import { Dialog } from '../../components/dialog/Dialog';
import { EntryForm } from './EntryForm';
import { types } from './EntryTypes';

export const AddEntryAction = ({ journal }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [openForm, setOpenForm] = useState(false);
  const [addType, setAddType] = useState();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const addSelected = (type) => {
    setAddType(type);
    openDialog();
    handleClose();
  };

  const openDialog = () => {
    setOpenForm(true);
  };

  const closeDialog = () => {
    setOpenForm(false);
  };

  const entryTypes = types.filter((type) => type.key !== 'ALL');

  return (
    <Box>
      <Button onClick={handleClick}>
        <AddCircleOutlineOutlinedIcon sx={{ mr: '5px' }} />
        Add Entry
      </Button>
      <Menu
        id="entry-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {entryTypes.map((type, index) => (
          <MenuItem
            onClick={() => addSelected(type)}
            key={`header-menuitem-${index}`}
          >
            <ListItemIcon key={`entry-listitem-${index}`}>
              {cloneElement(type.icon, {
                fontSize: 'small',
                key: `entry-icon-grid-${index}`,
              })}
            </ListItemIcon>
            <ListItemText key={`entry-itemText-${index}`}>
              {type.value}
            </ListItemText>
          </MenuItem>
        ))}
      </Menu>
      {addType && (
        <Dialog
          open={openForm}
          onClose={closeDialog}
          title={`Add ${addType.value}`}
          icon={addType.icon}
          maxWidth="md"
        >
          <EntryForm
            type={addType.key}
            journal={journal}
            onClose={closeDialog}
          />
        </Dialog>
      )}
    </Box>
  );
};
