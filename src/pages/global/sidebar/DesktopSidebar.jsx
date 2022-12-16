import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { Box, Button, IconButton, List, Typography } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useColors } from '../../../hooks/useColors';
import { useGetJournals } from '../../../services/JournalQueries';
import { MenuItem, WithSubMenu } from './MenuItem';

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    border: 'none',
    whiteSpace: 'nowrap',
    width: 300,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(6),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(6.5),
      },
    }),
  },
}));

export const DesktopSidebar = () => {
  const [selected, setSelected] = useState('Dashboard');
  const colors = useColors();

  const [open, setOpen] = useState(true);
  const [keepOpen, setKeepOpen] = useState(true);
  const [subMenuOpen, setSubMenuOpen] = useState(true);

  const { data: journals } = useGetJournals();

  const toggleMenu = () => {
    setOpen(!open);
    setKeepOpen(!keepOpen);
  };

  const selectMenu = (title) => {
    setSelected(title);
    if (!keepOpen) {
      setOpen(false);
    }
  };

  const clickNestedMenu = () => {
    if (open) {
      setSubMenuOpen(!subMenuOpen);
    } else {
      setSubMenuOpen(true);
    }
    setOpen(true);
  };

  return (
    <Box backgroundColor={colors.primary[400]} p="15px 2px 5px 2px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button
          variant="text"
          onClick={toggleMenu}
          sx={{ display: open ? 'block' : 'none' }}
        >
          <Typography variant="h3" color={colors.grey[100]} marginLeft={2}>
            TRADING JOURNAL
          </Typography>
        </Button>
        <IconButton onClick={toggleMenu} sx={{ ml: open ? '0px' : '3px' }}>
          {open && <ChevronLeftIcon />}
          {!open && <MenuOutlinedIcon sx={{ fontSize: 30 }} />}
        </IconButton>
      </Box>
      <Drawer variant="permanent" open={open} sx={{ pt: '20px' }}>
        <List component="nav" sx={{ backgroundColor: colors.primary[400] }}>
          <MenuItem
            title="Dashboard"
            to="/"
            icon={<HomeOutlinedIcon />}
            selected={selected}
            setSelected={selectMenu}
          />
          <WithSubMenu
            handleClick={clickNestedMenu}
            title="Journals"
            isOpen={open}
            icon={<AutoStoriesOutlinedIcon />}
          >
            <MenuItem
              title="Manage Journals"
              to="/journals"
              icon={<MenuBookOutlinedIcon />}
              selected={selected}
              setSelected={selectMenu}
              sx={{ pl: 4 }}
            />
            {journals &&
              journals.map((journal) => (
                <MenuItem
                  key={`journals-${journal.id}`}
                  title={journal.name}
                  to={`/journals/${journal.id}`}
                  icon={<MenuBookOutlinedIcon />}
                  selected={selected}
                  setSelected={selectMenu}
                  sx={{ pl: 4 }}
                />
              ))}
          </WithSubMenu>
        </List>
      </Drawer>
    </Box>
  );
};
