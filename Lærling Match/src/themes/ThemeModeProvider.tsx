import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { darkTheme } from "./darkTheme";

type ThemeModeProviderProps = {
  children: ReactNode;
};

export default function ThemeModeProvider({
  children,
}: ThemeModeProviderProps) {
  const [mode, setMode] = useState<"dark" | "light">(() =>
    localStorage.getItem("theme") === "light" ? "light" : "dark",
  );

  useEffect(() => {
    const handleThemeChange = () => {
      setMode(
        localStorage.getItem("theme") === "light" ? "light" : "dark",
      );
    };

    window.addEventListener("theme-change", handleThemeChange);

    return () => {
      window.removeEventListener("theme-change", handleThemeChange);
    };
  }, []);

  const theme = useMemo(() => {
    if (mode === "dark") {
      return darkTheme;
    }

    return createTheme({
      palette: {
        mode: "light",
        primary: {
          main: "#9858ad",
        },
        secondary: {
          main: "#7d458f",
        },
        background: {
          default: "#f5f3f6",
          paper: "#ffffff",
        },
        text: {
          primary: "#241b2b",
          secondary: "#716878",
        },
      },
    });
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}