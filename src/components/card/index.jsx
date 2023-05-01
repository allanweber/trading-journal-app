import {
  CardContent,
  CardHeader,
  Card as MuiCard,
  Typography,
} from '@mui/material';
import React from 'react';

export const Card = ({
  title,
  subtitle = undefined,
  minWidth = 250,
  children = undefined,
  props,
}) => {
  return (
    <MuiCard sx={{ minWidth: minWidth }} variant="outlined" {...props}>
      <CardHeader
        sx={{ textAlign: 'center', pb: '3px' }}
        title={<Typography fontSize={20}>{title}</Typography>}
        subheader={
          subtitle && <Typography fontSize={12}>{subtitle}</Typography>
        }
      />
      {children && <CardContent>{children}</CardContent>}
    </MuiCard>
  );
};
