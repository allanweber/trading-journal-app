import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Divider, ListItemIcon, ListItemText } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetJournals } from '../../../services/JournalQueries';

import { AutoStoriesOutlined } from '@mui/icons-material';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import { useJournalContext } from '../../../context/JournalContext';
import { useIsMobile } from '../../../hooks/useIsMobile';
import {
  getCurrentJournal,
  setCurrentJournal,
} from '../../../services/JournalStorageService';

export const JournalSelect = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { journal, setJournal } = useJournalContext();
  const { data: journals } = useGetJournals();

  useEffect(() => {
    const currentJournal = getCurrentJournal();
    if (currentJournal) {
      setJournal(currentJournal);
    }
  }, [setJournal]);

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
      setCurrentJournal(selected);
      setJournal(selected);
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
        endIcon={<ArrowDropDownOutlinedIcon />}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={openMenu}
        startIcon={isMobile ? null : <AutoStoriesOutlined />}
      >
        <Typography
          variant="h5"
          noWrap
          sx={{
            overflow: isMobile ? 'hidden' : 'visible',
            textOverflow: 'ellipsis',
            width: isMobile ? '11rem' : null,
            fontWeight: 700,
            letterSpacing: '.1rem',
            textDecoration: 'none',
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
            }}
          >
            Manage Journals
          </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};
