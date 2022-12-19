import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Divider, ListItemIcon, ListItemText } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useColors } from '../../../hooks/useColors';
import { useGetJournals } from '../../../services/JournalQueries';

import { AutoStoriesOutlined } from '@mui/icons-material';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import { useJournalContext } from '../../../context/JournalContext';

export const JournalSelect = ({ onChange }) => {
  const colors = useColors();
  const navigate = useNavigate();
  const { journal, setJournal } = useJournalContext();
  const { data: journals } = useGetJournals();

  useEffect(() => {
    if (!journal && journals) {
      setJournal(journals[0]);
    }
  }, [journals, journal, setJournal]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const goToJournals = () => {
    setAnchorEl(null);
    navigate('/journals');
  };

  const selectJournal = (selected) => {
    if (selected) {
      setJournal(selected);
      if (onChange) {
        onChange(selected);
      }
      closeMenu();
    }
  };

  const isSelected = (currentJournal) => {
    return currentJournal.id === journal.id;
  };

  if (!journals) return <div></div>;
  if (!journal) return <div></div>;

  return (
    <div>
      <Button
        sx={{ color: colors.grey[100] }}
        endIcon={<ArrowDropDownOutlinedIcon />}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={openMenu}
        startIcon={
          <AutoStoriesOutlined
            sx={{
              mr: 1,
              mb: '3px',
              color: colors.grey[100],
            }}
          />
        }
      >
        <Typography
          variant="h5"
          noWrap
          sx={{
            mr: 2,
            fontWeight: 700,
            letterSpacing: '.2rem',
            textDecoration: 'none',
            color: colors.grey[100],
          }}
        >
          {journal.name}
        </Typography>
      </Button>
      <Menu
        id="journal-select"
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        sx={{
          '& .MuiMenu-paper': {
            backgroundColor: colors.primary[400],
            backgroundImage: 'none !important',
            width: 320,
            maxWidth: '100%',
          },
        }}
      >
        {journals.map((journal) => (
          <MenuItem key={journal.id} onClick={() => selectJournal(journal)}>
            <ListItemText>
              <Typography
                variant="h5"
                noWrap
                sx={{ fontWeight: isSelected(journal) ? 800 : 300 }}
              >
                {journal.name}
              </Typography>
            </ListItemText>
            <ListItemIcon>
              {isSelected(journal) ? (
                <RadioButtonCheckedOutlinedIcon />
              ) : (
                <RadioButtonUncheckedOutlinedIcon />
              )}
            </ListItemIcon>
          </MenuItem>
        ))}
        <Divider />
        <MenuItem key="add-new-journal" onClick={goToJournals}>
          <SettingsOutlinedIcon sx={{ mr: 1 }} />
          <Typography
            sx={{
              textDecoration: 'none',
              color: colors.grey[100],
            }}
          >
            Manage Journals
          </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};
