import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import { Link } from "react-router-dom";
import { darkTheme } from "../../themes/darkTheme";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t, i18n } = useTranslation();

  const currentLanguage =
    i18n.resolvedLanguage?.startsWith("en")
      ? "en"
      : "no";

  const handleLanguageChange = (
    _: React.MouseEvent<HTMLElement>,
    newLanguage: string | null,
  ) => {
    if (!newLanguage) return;

    i18n.changeLanguage(newLanguage);

    localStorage.setItem(
      "language",
      newLanguage,
    );
  };

  return (
    <AppBar
      position="absolute"
      elevation={0}
      sx={{
        backgroundColor:
          darkTheme.palette.background.default,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            minHeight: {
              xs: 70,
              md: 84,
            },

            display: "flex",
            justifyContent: "space-between",
          }}
        >

          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              textDecoration: "none",
            }}
          >
            <Box
              component="img"
              src="./Logo.png"
              alt="Lærling Link"
              sx={{
                width: {
                  xs: 42,
                  md: 50,
                },

                height: "auto",
                display: "block",
              }}
            />

            <Typography
              sx={{
                color: "primary.contrastText",

                fontSize: {
                  xs: 18,
                  md: 22,
                },

                fontWeight: 800,
                whiteSpace: "nowrap",
              }}
            >
              {t("app.name")}
            </Typography>
          </Box>

          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },

              alignItems: "center",
              gap: 1,
            }}
          >

            <ToggleButtonGroup
              exclusive
              value={currentLanguage}
              onChange={handleLanguageChange}
              size="small"
              aria-label="language"
              sx={{
                mr: 2,

                border: "1px solid",
                borderColor:
                  darkTheme.palette.divider,

                borderRadius: "999px",

                overflow: "hidden",

                "& .MuiToggleButtonGroup-grouped":
                  {
                    border: 0,

                    px: 1.8,
                    py: 0.7,

                    color:
                      darkTheme.palette.text
                        .secondary,

                    fontWeight: 700,
                    fontSize: "0.78rem",

                    textTransform: "uppercase",

                    "&:not(:first-of-type)": {
                      borderRadius: "999px",
                    },

                    "&:first-of-type": {
                      borderRadius: "999px",
                    },

                    "&.Mui-selected": {
                      color:
                        darkTheme.palette.primary
                          .contrastText,

                      backgroundColor:
                        darkTheme.palette.primary
                          .main,

                      "&:hover": {
                        backgroundColor:
                          darkTheme.palette.primary
                            .main,
                      },
                    },

                    "&:hover": {
                      backgroundColor:
                        "rgba(255, 255, 255, 0.06)",
                    },
                  },
              }}
            >
              <ToggleButton
                value="no"
                aria-label="Norsk"
              >
                NO
              </ToggleButton>

              <ToggleButton
                value="en"
                aria-label="English"
              >
                EN
              </ToggleButton>
            </ToggleButtonGroup>

            <Button
              href="#about"
              sx={{
                color:
                  darkTheme.palette.primary
                    .contrastText,
              }}
            >
              {t("about.title")}
            </Button>

            <Button
              href="#goals"
              sx={{
                color:
                  darkTheme.palette.primary
                    .contrastText,
              }}
            >
              {t("goals.title")}
            </Button>

            <Button
              href="#how-it-works"
              sx={{
                color:
                  darkTheme.palette.primary
                    .contrastText,
              }}
            >
              {t("howItWorks.title")}
            </Button>

            <Box
              component={Link}
              to="/login"
              sx={{
                ml: 1,

                backgroundColor:
                  darkTheme.palette.primary
                    .contrastText,

                color:
                  darkTheme.palette.primary.main,

                borderRadius: "999px",

                px: 3,
                py: 1,

                textDecoration: "none",

                fontWeight: 700,

                transition: "0.2s ease",

                "&:hover": {
                  opacity: 0.9,
                },
              }}
            >
              {t("nav.login")}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;