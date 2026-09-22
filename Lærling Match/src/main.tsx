import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import AppRoutes from "./routes/AppRoutes";
import "../src/i18n";
import { darkTheme } from "./themes/darkTheme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AppRoutes />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
