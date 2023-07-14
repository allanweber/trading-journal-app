import { createTheme } from '@mui/material/styles';
import { createContext, useMemo, useState } from 'react';
import { loadTheme } from './services/ConfigurationStorage';

export const tokens = (mode) => ({
  slate: {
    100: '#f8fafc',
    200: '#e2e8f0',
    500: '#64748b',
    700: '#334155',
    800: '#1e293b',
    850: '#282828',
    900: '#161616',
  },
  neutral: {
    100: '#f5f5f5',
    200: '#c9cacc',
    500: '#737373',
    700: '#404040',
    800: '#2d2d2d',
  },
  red: {
    100: '#fee2e2',
    500: '#ef4444',
    900: '#7f1d1d',
  },
  blue: {
    100: '#dbeafe',
    500: '#3b82f6',
    900: '#1e3a8a',
  },
  green: {
    100: '#dcfce7',
    500: '#22c55e',
    900: '#14532d',
  },
  orange: {
    100: '#ffedd5',
    500: '#f97316',
    900: '#7c2d12',
  },
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === 'dark'
        ? {
            primary: {
              main: colors.slate[100],
            },
            secondary: {
              main: colors.neutral[100],
            },
            background: {
              default: colors.slate[900],
            },
            success: {
              main: colors.green[500],
            },
            error: {
              main: colors.red[500],
            },
          }
        : {
            primary: {
              main: colors.slate[900],
            },
            secondary: {
              main: colors.neutral[700],
            },

            background: {
              default: colors.slate[100],
            },
            success: {
              main: colors.green[500],
            },
            error: {
              main: colors.red[500],
            },
          }),
    },
    typography: {
      fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
      fontSize: 12,
      h1: {
        fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
        fontSize: 40,
        color: mode === 'dark' ? colors.slate[100] : colors.slate[900],
      },
      h2: {
        fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
        fontSize: 32,
        color: mode === 'dark' ? colors.slate[100] : colors.slate[900],
      },
      h3: {
        fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
        fontSize: 24,
        color: mode === 'dark' ? colors.slate[100] : colors.slate[900],
      },
      h4: {
        fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
        fontSize: 20,
        color: mode === 'dark' ? colors.slate[200] : colors.slate[700],
      },
      h5: {
        fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
        fontSize: 16,
        color: mode === 'dark' ? colors.slate[200] : colors.slate[700],
      },
      h6: {
        fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
        fontSize: 14,
        color: mode === 'dark' ? colors.slate[200] : colors.slate[700],
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontSize: '14px',
            fontWeight: 'bold',
            padding: '10px 10px',
          },
          contained: {
            backgroundColor:
              mode === 'dark' ? colors.slate[100] : colors.slate[900],
            color: mode === 'dark' ? colors.slate[900] : colors.slate[100],
            '&:hover': {
              backgroundColor:
                mode === 'dark' ? colors.slate[200] : colors.slate[700],
            },
          },
          outlined: {
            backgroundColor: 'transparent',
            border: `1px solid ${
              mode === 'dark' ? colors.slate[100] : colors.slate[900]
            } !important`,
            color: mode === 'dark' ? colors.slate[100] : colors.slate[900],
            '&:hover': {
              backgroundColor:
                mode === 'dark' ? colors.slate[700] : colors.slate[200],
            },
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            backgroundColor:
              mode === 'dark' ? colors.slate[900] : colors.slate[100],
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: colors.blue[500],
            cursor: 'pointer',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor:
              mode === 'dark' ? colors.slate[900] : colors.slate[100],
            backgroundImage: 'none !important',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor:
              mode === 'dark' ? colors.slate[900] : colors.slate[100],
            '&:hover': {
              backgroundColor:
                mode === 'dark' ? colors.slate[850] : colors.slate[200],
            },
          },
        },
      },
      MuiCircularProgress: {
        styleOverrides: {
          root: {
            color: mode === 'dark' ? colors.slate[200] : colors.slate[500],
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            '& .MuiAlert-icon': {
              color: mode === 'dark' ? colors.slate[900] : colors.slate[100],
            },
          },
          standardSuccess: {
            backgroundColor: colors.green[500],
            color: mode === 'dark' ? colors.slate[900] : colors.slate[100],
          },
          standardInfo: {
            backgroundColor: colors.blue[500],
            color: mode === 'dark' ? colors.slate[900] : colors.slate[100],
          },
          standardError: {
            backgroundColor: colors.red[500],
            color: mode === 'dark' ? colors.slate[900] : colors.slate[100],
          },
          standardWarning: {
            backgroundColor: colors.orange[500],
            color: mode === 'dark' ? colors.slate[900] : colors.slate[100],
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: `${
              mode === 'dark'
                ? '0px 0px 0px 0px rgba(0,0,00), 0px 0px 0px 0px rgba(0,0,00),0px 0px 0px 1px rgba(120, 117, 117 ,0.62)'
                : '0px 0px 0px 0px rgba(0,0,00), 0px 0px 0px 0px rgba(0,0,0,0), 0px 0px 0px 1px rgba(0,0,0,0.12)'
            }`,
            // box-shadow:;
          },
        },
      },
      MuiDataGrid: {
        styleOverrides: {
          root: {
            border: `0.5px solid ${
              mode === 'dark' ? colors.slate[500] : colors.slate[200]
            }`,
          },
          cell: {
            fontSize: '0.9rem',
          },
          columnHeaders: {
            borderBottom: `1px solid ${
              mode === 'dark' ? colors.slate[500] : colors.slate[200]
            }`,
            '&:hover': {
              backgroundColor:
                mode === 'dark' ? colors.slate[850] : colors.slate[200],
            },
          },
          footerContainer: {
            borderTop: `1px solid ${
              mode === 'dark' ? colors.slate[500] : colors.slate[200]
            }`,
            '&:hover': {
              backgroundColor:
                mode === 'dark' ? colors.slate[850] : colors.slate[200],
            },
          },
          checkboxInput: {
            color: mode === 'dark' ? colors.slate[100] : colors.slate[800],
            '&.Mui-checked': {
              color: mode === 'dark' ? colors.slate[100] : colors.slate[800],
            },
          },
        },
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState(loadTheme());

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
