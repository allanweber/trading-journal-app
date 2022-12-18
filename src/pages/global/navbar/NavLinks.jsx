import { MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useColors } from '../../../hooks/useColors';

const pages = [
  {
    label: 'Dashboard',
    to: '/',
  },
  {
    label: 'Trades',
    to: '/journals',
  },
];

export const NavLinks = ({ onChange }) => {
  const colors = useColors();
  const location = useLocation();
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
  return pages.map((page) => (
    <MenuItem key={page.label}>
      <Button
        component={RouterLink}
        key={page.label}
        to={page.to}
        onClick={() => onSelect(page.to)}
        sx={{ color: colors.grey[100] }}
        style={selected === page.to ? selectedStyle : null}
      >
        <Typography textAlign="center" fontSize="1rem">
          {page.label}
        </Typography>
      </Button>
    </MenuItem>
  ));
};
