import MenuIcon from '@mui/icons-material/Menu';
import { Box, IconButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Menu from '@mui/material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { useState } from 'react';
import { useAuthState } from '../../../context/UserContext';
import { useColors, useIsDarkMode } from '../../../hooks/useColors';
import { OptionsMenu } from '../options/OptionsMenu';
import { JournalSelect } from './JournalSelect';
import { NavLinks } from './NavLinks';

export const NavBar = () => {
  const color = useColors();
  const isDarkMode = useIsDarkMode();
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
    <Box marginBottom={user ? '75px' : null}>
      <AppBar component="nav">
        <Container
          maxWidth={false}
          sx={{
            backgroundColor: isDarkMode ? color.slate[900] : color.slate[100],
          }}
        >
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
              >
                <MenuIcon fontSize="1.2rem" />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorMobileMenu}
                keepMounted
                open={Boolean(anchorMobileMenu)}
                onClose={() => setAnchorMobileMenu(null)}
              >
                <NavLinks onChange={mobileMenuSelect} />
              </Menu>

              <Box mt="4px">
                <JournalSelect />
              </Box>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <NavLinks />
            </Box>
            <OptionsMenu />
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
