import { AutoStoriesOutlined } from '@mui/icons-material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import TableRowsOutlinedIcon from '@mui/icons-material/TableRowsOutlined';
import { Box, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useJournalContext } from '../../../context/JournalContext';
import { useColors } from '../../../hooks/useColors';
import { useIsMobile } from '../../../hooks/useIsMobile';

export const NavLinks = ({ onChange }) => {
  const colors = useColors();
  const location = useLocation();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { journal } = useJournalContext();
  let currentLocation = location.pathname;

  const [selected, setSelected] = useState(currentLocation);

  useEffect(() => {
    setSelected(currentLocation);
  }, [currentLocation]);

  const onSelect = (path) => {
    setSelected(path);
    navigate(path);
    closeMenu();
    if (onChange) {
      onChange(path);
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const selectedStyle = {
    borderBottom: `1px solid ${colors.grey[100]}`,
    fontWeight: 900,
    borderRadius: 0,
  };

  const MenuHeader = ({ children, select, ...rest }) => {
    return (
      <Typography
        textAlign="center"
        fontSize="1rem"
        color={colors.grey[100]}
        paddingBottom="5px"
        style={select ? selectedStyle : null}
        {...rest}
      >
        {children}
      </Typography>
    );
  };

  return (
    <Box display={isMobile ? 'block' : 'flex'}>
      <MenuItem key="Dashboard" onClick={() => onSelect('/')}>
        <MenuHeader select={selected === '/'}>DASHBOARD</MenuHeader>
      </MenuItem>
      {journal && (
        <MenuItem onMouseEnter={openMenu} onMouseLeave={closeMenu}>
          <MenuHeader
            select={
              selected === '/journal' ||
              selected === '/entries' ||
              selected === '/calendar'
            }
          >
            TRADES
          </MenuHeader>
          <Menu
            id="trades-select"
            anchorEl={anchorEl}
            open={open}
            sx={{
              '& .MuiMenu-paper': {
                width: 320,
                maxWidth: '100%',
              },
            }}
          >
            <MenuItem
              key="Trades"
              onClick={() => onSelect('/journal')}
              sx={{ padding: '20px' }}
            >
              <ListItemIcon>
                <AutoStoriesOutlined />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  variant="h5"
                  style={selected === '/journal' ? selectedStyle : null}
                >
                  JOURNAL
                </Typography>
                <Typography variant="body2">
                  Entry and manage your trades by date or symbol
                </Typography>
              </ListItemText>
            </MenuItem>
            <MenuItem
              key="Table"
              onClick={() => onSelect('/entries')}
              sx={{ padding: '20px' }}
            >
              <ListItemIcon>
                <TableRowsOutlinedIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  variant="h5"
                  style={selected === '/entries' ? selectedStyle : null}
                >
                  ALL ENTRIES
                </Typography>
                <Typography variant="body2">
                  View all your entries, trades, deposits, withdrawals
                </Typography>
              </ListItemText>
            </MenuItem>
            <MenuItem
              key="Calendar"
              onClick={() => onSelect('/calendar')}
              sx={{ padding: '20px' }}
            >
              <ListItemIcon>
                <CalendarMonthOutlinedIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  variant="h5"
                  style={selected === '/calendar' ? selectedStyle : null}
                >
                  CALENDAR
                </Typography>
                <Typography variant="body2">
                  Explore your trades via the Calendar
                </Typography>
              </ListItemText>
            </MenuItem>
          </Menu>
        </MenuItem>
      )}
      <MenuItem key="Strategies" onClick={() => onSelect('/strategies')}>
        <MenuHeader select={selected === '/strategies'}>STRATEGIES</MenuHeader>
      </MenuItem>
    </Box>
  );
};
