import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { theme } from "../../themes/darkTheme";

export default function Navbar() {
  return (
    <AppBar
      position="absolute"
      elevation={0}
      sx={{
        backgroundColor: theme.palette.background.default,
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
              color: theme.palette.primary.contrastText,
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
                color: theme.palette.primary.main,
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
                color: theme.palette.primary.contrastText,
              }}
            >
              Om oss
            </Button>

            <Button
              href="#goals"
              sx={{
                color: theme.palette.primary.contrastText,
              }}
            >
              Våre mål
            </Button>

            <Button
              href="#how-it-works"
              sx={{
                color: theme.palette.primary.contrastText,
              }}
            >
              Slik fungerer det
            </Button>

            <Button
              variant="contained"
              href="/app"
              sx={{
                ml: 2,

                backgroundColor: theme.palette.primary.contrastText,
                color: theme.palette.primary.main,

                borderRadius: "999px",

                px: 3,

                textTransform: "none",
                fontWeight: 700,

                "&:hover": {
                  backgroundColor: theme.palette.secondary.light,
                  color: theme.palette.primary.dark,
                },
              }}
            >
              Logg inn
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
