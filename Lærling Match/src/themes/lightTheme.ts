import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
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
      contrastText: "#422859",
    },
    background: {
      default: "#ECEBEB",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#2E2E2E",
      secondary: "#7A7A7E",
    },
    divider: "#DDD9DC",
  },
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: { backgroundColor: "#ECEBEB" },
        body: {
          margin: 0,
          minHeight: "100vh",
          backgroundColor: "#ECEBEB",
        },
        "#root": {
          minHeight: "100vh",
          backgroundColor: "#ECEBEB",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: "#F4EEF4",
          color: "#935CA6",
          fontWeight: 500,
        },
      },
    },
  },
});
