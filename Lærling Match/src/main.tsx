import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import "../src/i18n";
import ThemeModeProvider from "./themes/ThemeModeProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeModeProvider>
        <AppRoutes />
      </ThemeModeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
