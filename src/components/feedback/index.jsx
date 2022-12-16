import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const To = ({ to, toLabel }) => {
  if (to) {
    return (
      <Link component={RouterLink} to={to} fontSize={14} sx={{ mt: 3 }}>
        {toLabel}
      </Link>
    );
  } else {
    return <div></div>;
  }
};

const Subtitle = ({ subtitle }) => {
  if (subtitle) {
    return (
      <Typography variant="h5" sx={{ mt: 3 }}>
        {subtitle}
      </Typography>
    );
  } else {
    return <div></div>;
  }
};

export const Feedback = ({ header, subtitle, icon, to, toLabel }) => {
  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>{icon}</Avatar>
      <Typography variant="h5" sx={{ mt: 2 }}>
        {header}
      </Typography>
      <Subtitle subtitle={subtitle} />
      <To to={to} toLabel={toLabel} />
    </Box>
  );
};
