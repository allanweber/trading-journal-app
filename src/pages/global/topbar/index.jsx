import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SearchIcon from '@mui/icons-material/Search';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Box, IconButton } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { ThemeChange } from '../../../components/theme-change';
import { useAuthState } from '../../../context/UserContext';
import { useColors } from '../../../hooks/useColors';
import { useIsMobile } from '../../../hooks/useIsMobile';
import { UserActions } from '../navbar/UserActions';

export const TopBar = () => {
  const { user } = useAuthState();
  const isMobile = useIsMobile();
  const colors = useColors();

  if (!user) return null;

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
        marginLeft={isMobile ? '35px' : '0px'}
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

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
    </Box>
  );
};
