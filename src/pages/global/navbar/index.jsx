import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, MenuItem } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { useState } from 'react';
import { useAuthState } from '../../../context/UserContext';
import { useColors, useMode } from '../../../hooks/useColors';
import { JournalSelect } from './JournalSelect';
import { NavLinks } from './NavLinks';
import { OptionsMenu } from './OptionsMenu';

export const NavBar = () => {
  const colors = useColors();
  const mode = useMode();

  const { user } = useAuthState();

  const [anchorMobileMenu, setAnchorMobileMenu] = useState();
  const openMobileMenu = (event) => {
    setAnchorMobileMenu(event.currentTarget);
  };

  const mobileMenuSelect = () => {
    setAnchorMobileMenu(null);
  };

  if (!user) return <div></div>;

  return (
    <AppBar position="static">
      <Container maxWidth={false} sx={{ backgroundColor: colors.primary[400] }}>
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <JournalSelect />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={openMobileMenu}
              sx={{ color: colors.grey[100] }}
            >
              <MenuIcon fontSize="1.2rem" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorMobileMenu}
              keepMounted
              open={Boolean(anchorMobileMenu)}
              onClose={() => setAnchorMobileMenu(null)}
              sx={{
                '& .MuiMenu-paper': {
                  backgroundColor: colors.primary[400],
                  backgroundImage: 'none !important',
                },
              }}
            >
              <MenuItem
                key="journal select"
                onClose={() => setAnchorMobileMenu(null)}
              >
                <JournalSelect onChange={mobileMenuSelect} />
              </MenuItem>

              <NavLinks onChange={mobileMenuSelect} />
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <NavLinks />
          </Box>
          <Box
            display="flex"
            backgroundColor={
              mode === 'dark' ? colors.primary[200] : colors.primary[900]
            }
            borderRadius="3px"
            sx={{ mr: '10px' }}
          >
            <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
            <IconButton type="button" sx={{ p: 1 }}>
              <SearchIcon />
            </IconButton>
          </Box>

          <OptionsMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
