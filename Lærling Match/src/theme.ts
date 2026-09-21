import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',

    primary: {
      main: '#935CA6',
      light: '#AC87BF',
      dark: '#422859',
      contrastText: '#FFFFFF',
    },

    secondary: {
      main: '#D9ACD8',
      light: '#E8CBE7',
      dark: '#935CA6',
      contrastText: '#2E2E2E',
    },

    background: {
      default: '#ECEBEB',
      paper: '#FFFFFF',
    },

    text: {
      primary: '#2E2E2E',
      secondary: '#935CA6',
    },

    divider: '#D9ACD8',
  },

  typography: {
    fontFamily: 'Inter, Arial, sans-serif',

    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#422859',
    },

    h2: {
      fontWeight: 700,
      color: '#422859',
    },

    h3: {
      fontWeight: 600,
      color: '#422859',
    },

    body1: {
      color: '#2E2E2E',
    },

    body2: {
      color: '#2E2E2E',
    },
  },

  shape: {
    borderRadius: 8,
  },

  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },

      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#935CA6',
          },

          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#935CA6',
          },
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#422859',
          color: '#FFFFFF',
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
        },
      },
    },
  },
});
