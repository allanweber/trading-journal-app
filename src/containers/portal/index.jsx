import { Avatar, Box, Grid, Paper, Typography } from '@mui/material';
import { ThemeChange } from '../../components/theme-change';

export const Portal = ({ children, icon, title }) => {
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light'
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <ThemeChange />
          <Avatar sx={{ m: 2, bgcolor: 'secondary.main' }}>{icon}</Avatar>
          <Typography variant="h3">{title}</Typography>
          {children}
        </Box>
      </Grid>
    </Grid>
  );
};
