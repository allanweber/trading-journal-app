import { Box, MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useJournalContext } from '../../../context/JournalContext';
import { useColors } from '../../../hooks/useColors';
import { useIsMobile } from '../../../hooks/useIsMobile';

export const NavLinks = ({ onChange }) => {
  const colors = useColors();
  const location = useLocation();
  const isMobile = useIsMobile();
  const { journal } = useJournalContext();
  let currentLocation = location.pathname;

  const [selected, setSelected] = useState(currentLocation);

  useEffect(() => {
    setSelected(currentLocation);
  }, [currentLocation]);

  const onSelect = (path) => {
    setSelected(path);
    if (onChange) {
      onChange(path);
    }
  };

  const selectedStyle = {
    borderBottom: `1px solid ${colors.grey[100]}`,
    borderRadius: 0,
  };

  return (
    <Box display={isMobile ? 'block' : 'flex'}>
      <MenuItem key="Dashboard">
        <Button
          component={RouterLink}
          key="Dashboard"
          to="/"
          onClick={() => onSelect('/')}
          sx={{ color: colors.grey[100] }}
          style={selected === '/' ? selectedStyle : null}
        >
          <Typography textAlign="center" fontSize="1rem">
            Dashboard
          </Typography>
        </Button>
      </MenuItem>
      {journal && (
        <MenuItem key="Trades">
          <Button
            component={RouterLink}
            key="Trades"
            to={`/journals/${journal.id}`}
            onClick={() => onSelect('/journals')}
            sx={{ color: colors.grey[100] }}
            style={selected === '/journals' ? selectedStyle : null}
          >
            <Typography textAlign="center" fontSize="1rem">
              Trades
            </Typography>
          </Button>
        </MenuItem>
      )}
    </Box>
  );
};
