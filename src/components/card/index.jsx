import {
  Card as MuiCard,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import React from 'react';

export const Card = ({
  title,
  subtitle = undefined,
  minWidth = 250,
  children = undefined,
}) => {
  return (
    <MuiCard sx={{ minWidth: minWidth }} variant="outlined">
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
