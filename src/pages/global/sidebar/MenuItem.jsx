import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Collapse from '@mui/material/Collapse';
import { Link } from 'react-router-dom';

export const MenuItem = ({
  title,
  to,
  icon,
  selected,
  setSelected,
  ...rest
}) => {
  return (
    <div>
      <ListItemButton
        {...rest}
        selected={selected.toLowerCase() === title.toLowerCase()}
        component={Link}
        to={to}
        onClick={() => setSelected(title)}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    </div>
  );
};

export const WithSubMenu = ({
  handleClick,
  title,
  isOpen,
  icon,
  children,
  isMobile,
}) => {
  return (
    <div>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
        {isMobile ? null : isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
    </div>
  );
};
