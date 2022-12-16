import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { Box, Drawer, IconButton, List } from '@mui/material';
import { useState } from 'react';
import { useColors } from '../../../hooks/useColors';
import { useGetJournals } from '../../../services/JournalQueries';
import { MenuItem, WithSubMenu } from './MenuItem';

export const MobileSidebar = () => {
  const [selected, setSelected] = useState('Dashboard');
  const colors = useColors();
  const [open, setOpen] = useState(false);
  const { data: journals } = useGetJournals();

  const selectMenu = (title) => {
    setSelected(title);
    setOpen(false);
  };

  return (
    <Box p="5px 0px 5px 0px" position="fixed">
      <IconButton onClick={() => setOpen(true)}>
        <MenuOutlinedIcon sx={{ fontSize: 40 }} />
      </IconButton>
      <Drawer
        anchor="left"
        open={open}
        sx={{
          pt: '20px',
          '& .MuiDrawer-paper': {
            backgroundColor: `${colors.primary[400]} !important`,
            backgroundImage: 'none !important',
          },
        }}
      >
        <List component="nav" sx={{ backgroundColor: colors.primary[400] }}>
          <MenuItem
            title="Dashboard"
            to="/"
            icon={<HomeOutlinedIcon />}
            selected={selected}
            setSelected={selectMenu}
          />
          <WithSubMenu
            title="Journals"
            isOpen={true}
            icon={<AutoStoriesOutlinedIcon />}
            isMobile={true}
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
