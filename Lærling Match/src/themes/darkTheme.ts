import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#935CA6",
      light: "#AC87BF",
      dark: "#422859",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#D9ACD8",
      light: "#E8CBE7",
      dark: "#935CA6",
      contrastText: "#FFFFFF",
    },

    background: {
      default: "#0f141b",
      paper: "#18212d",
    },

    text: {
      primary: "#f5f7fa",
      secondary: "#8fa1b8",
    },

    divider: "#273445",
  },

  typography: {
    fontFamily: "Inter, Arial, sans-serif",

    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      color: "#422859",
    },

    h2: {
      fontWeight: 700,
      color: "#422859",
    },

    h3: {
      fontWeight: 600,
      color: "#422859",
    },

    body1: {
      color: "#2E2E2E",
    },

    body2: {
      color: "#2E2E2E",
    },
  },

  shape: {
    borderRadius: 8,
  },

  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },

      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#935CA6",
          },

          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#935CA6",
          },
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#422859",
          color: "#FFFFFF",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
        },
      },
    },

    MuiCssBaseline: {
      styleOverrides: {
        html: {
          backgroundColor: "#0f141b",
        },
        body: {
          margin: 0,
          minHeight: "100vh",
          backgroundColor: "#0f141b",
        },
        "#root": {
          minHeight: "100vh",
          backgroundColor: "#0f141b",
        },
      },
    },
  },
});
