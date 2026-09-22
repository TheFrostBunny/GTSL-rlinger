import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { theme } from "../../themes/darkTheme";

export default function CTASection() {
  return (
    <Box
      component="section"
      sx={{
        backgroundColor: theme.palette.background.default,
        py: { xs: 10, md: 16 },
        px: { xs: 2, md: 3 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            position: "relative",

            overflow: "hidden",

            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,

            borderRadius: "36px",

            px: {
              xs: 4,
              md: 8,
            },

            py: {
              xs: 7,
              md: 9,
            },
          }}
        >
          <Typography
            component="h2"
            sx={{
              maxWidth: 750,

              mb: 3,

              color: theme.palette.primary.contrastText,

              fontSize: {
                xs: "2.3rem",
                md: "4rem",
              },

              fontWeight: 750,

              lineHeight: 1.05,

              letterSpacing: "-2px",
            }}
          >
            Klar for å finne din lærlingplass?
          </Typography>

          <Typography
            sx={{
              maxWidth: 610,

              mb: 5,

              color: theme.palette.secondary.light,

              fontSize: "1.08rem",

              lineHeight: 1.8,
            }}
          >
            Opprett en profil og finn lærebedrifter som passer utdanningen,
            interessene og målene dine.
          </Typography>

          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={2}
            sx={{
              alignItems: {
                xs: "stretch",
                sm: "center",
              },
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.palette.primary.contrastText,
                color: theme.palette.primary.main,

                borderRadius: "999px",

                px: 4,
                py: 1.4,

                textTransform: "none",
                fontWeight: 700,

                "&:hover": {
                  backgroundColor: theme.palette.secondary.light,
                  color: theme.palette.primary.dark,
                },
              }}
            >
              Kom i gang
            </Button>

            <Button
              variant="outlined"
              sx={{
                color: theme.palette.primary.contrastText,
                borderColor: theme.palette.primary.light,

                borderRadius: "999px",

                px: 4,
                py: 1.4,

                textTransform: "none",
                fontWeight: 700,

                "&:hover": {
                  borderColor: theme.palette.primary.contrastText,
                  backgroundColor: theme.palette.primary.light,
                },
              }}
            >
              Registrer bedrift
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
