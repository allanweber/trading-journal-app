import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import { Box, IconButton, Popover, Stack, Tooltip } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { types } from '../../containers/entries/EntryTypes';
import { useIsMobile } from '../../hooks/useIsMobile';

export const EntrySelect = ({ onChange }) => {
  const isMobile = useIsMobile();
  const [type, setType] = useState('TRADE');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const changeFilter = (type) => {
    setType(type);
    if (onChange) {
      onChange(type === 'ALL' ? undefined : type);
    }
  };

  return (
    <Box>
      <ToggleButtonGroup
        value={type}
        onChange={(e, value) => changeFilter(value)}
        exclusive
        size={isMobile ? 'medium' : 'small'}
      >
        {types.map((type) => {
          if (isMobile) {
            return (
              <ToggleButton value={type.key} key={type.key}>
                <Tooltip title={type.value}>
                  {React.cloneElement(type.icon, {
                    fontSize: 'small',
                  })}
                </Tooltip>
              </ToggleButton>
            );
          } else {
            return (
              <ToggleButton value={type.key} key={type.key}>
                {React.cloneElement(type.icon, {
                  fontSize: 'small',
                })}
                <Typography sx={{ ml: 1 }}>{type.value}</Typography>
              </ToggleButton>
            );
          }
        })}
      </ToggleButtonGroup>
      {isMobile && (
        <Box display="inline">
          <IconButton
            aria-label="help"
            aria-describedby={id}
            onClick={handleClick}
          >
            <ContactSupportOutlinedIcon />
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'left',
            }}
          >
            {types.map((type) => (
              <Stack direction="row" spacing={1} key={type.key}>
                {React.cloneElement(type.icon, {
                  fontSize: 'small',
                })}
                <Typography sx={{ ml: 1 }}>{type.value}</Typography>
              </Stack>
            ))}
          </Popover>
        </Box>
      )}
    </Box>
  );
};
