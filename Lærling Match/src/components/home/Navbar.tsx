import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { darkTheme } from "../../themes/darkTheme";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t } = useTranslation();
  return (
    <AppBar
      position="absolute"
      elevation={0}
      sx={{
        backgroundColor: darkTheme.palette.background.default,
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
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
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
                  width: { xs: 42, md: 50 },
                  height: "auto",
                  display: "block",
                }}
              />

              <Typography
                sx={{
                  color: "primary.contrastText",
                  fontSize: { xs: 18, md: 22 },
                  fontWeight: 800,
                  whiteSpace: "nowrap",
                }}
              >
                {t("app.name")}
              </Typography>
            </Box>
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
            <Button
              href="#about"
              sx={{
                color: darkTheme.palette.primary.contrastText,
              }}
            >
              {t("about.title")}
            </Button>

            <Button
              href="#goals"
              sx={{
                color: darkTheme.palette.primary.contrastText,
              }}
            >
              {t("goals.title")}
            </Button>

            <Button
              href="#how-it-works"
              sx={{
                color: darkTheme.palette.primary.contrastText,
              }}
            >
              {t("howItWorks.title")}
            </Button>

            <Link
              to="/login"
              style={{
                marginLeft: "8px",

                backgroundColor: darkTheme.palette.primary.contrastText,
                color: darkTheme.palette.primary.main,

                borderRadius: "999px",

                padding: "8px 24px",

                textTransform: "none",
                fontWeight: 700,
              }}
            >
              {t("nav.login")}
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
