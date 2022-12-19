import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { ThemeChange } from '../../../components/theme-change';
import { UserActions } from './UserActions';

export const OptionsMenu = () => {
  return (
    <Box display="flex">
      <ThemeChange />
      <IconButton>
        <NotificationsOutlinedIcon />
      </IconButton>
      <IconButton>
        <SettingsOutlinedIcon />
      </IconButton>
      <UserActions />
    </Box>
  );
};
