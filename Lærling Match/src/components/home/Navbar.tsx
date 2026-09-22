import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";

export default function Navbar() {
  return (
    <AppBar
      position="absolute"
      elevation={0}
      sx={{
        backgroundColor: "#ac85be",
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
              color: "#ffffff",
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
                color: "#6fe0ad",
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
                color: "#ffffff",
              }}
            >
              Om oss
            </Button>

            <Button
              href="#goals"
              sx={{
                color: "#ffffff",
              }}
            >
              Våre mål
            </Button>

            <Button
              href="#how-it-works"
              sx={{
                color: "#ffffff",
              }}
            >
              Slik fungerer det
            </Button>

            <Button
              variant="contained"
              sx={{
                ml: 2,

                backgroundColor: "#ffffff",
                color: "#10251c",

                borderRadius: "999px",

                px: 3,

                textTransform: "none",
                fontWeight: 700,

                "&:hover": {
                  backgroundColor: "#e9eeec",
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
