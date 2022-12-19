import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { Divider, IconButton } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { doLogout, useAuthDispatch } from '../../../context/UserContext';
import { useColors } from '../../../hooks/useColors';

export const UserActions = () => {
  const colors = useColors();
  const dispatch = useAuthDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option) => {
    if (option === 'logout') {
      doLogout(dispatch);
    }
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="user-action-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <PersonOutlinedIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          '& .MuiMenu-paper': {
            backgroundColor: colors.primary[400],
            backgroundImage: 'none !important',
          },
        }}
      >
        <MenuItem onClick={() => handleClose('profile')}>Profile</MenuItem>
        <MenuItem onClick={() => handleClose('account')}>My account</MenuItem>
        <Divider />
        <MenuItem onClick={() => handleClose('logout')}>Logout</MenuItem>
      </Menu>
    </div>
  );
};
