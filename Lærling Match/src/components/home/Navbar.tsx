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

export default function Navbar() {
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
          <Typography
            component="a"
            href="#top"
            sx={{
              color: darkTheme.palette.primary.contrastText,
              textDecoration: "none",
              fontSize: {
                xs: "1.25rem",
                md: "1.45rem",
              },
              fontWeight: 800,
              letterSpacing: "-0.5px",
            }}
          >
            Lærling
            <Box
              component="span"
              sx={{
                color: darkTheme.palette.primary.main,
              }}
            >
              Match
            </Box>
          </Typography>

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
              Om oss
            </Button>

            <Button
              href="#goals"
              sx={{
                color: darkTheme.palette.primary.contrastText,
              }}
            >
              Våre mål
            </Button>

            <Button
              href="#how-it-works"
              sx={{
                color: darkTheme.palette.primary.contrastText,
              }}
            >
              Slik fungerer det
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

                ":hover": {
                  backgroundColor: darkTheme.palette.secondary.light,
                  color: darkTheme.palette.primary.dark,
                },
              }}
            >
              Logg inn
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
