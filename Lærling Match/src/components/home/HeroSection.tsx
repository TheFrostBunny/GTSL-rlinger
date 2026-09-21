import { Box, Button, Container, Stack, Typography } from "@mui/material";

export default function HeroSection() {
  return (
    <Box
      id="top"
      component="section"
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        color: "#ffffff",
      }}
    >
      <Box
        component="video"
        autoPlay
        muted
        loop
        playsInline
        sx={{
          position: "absolute",
          inset: 0,

          width: "100%",
          height: "100%",

          objectFit: "cover",

          zIndex: 0,
        }}
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </Box>

      <Box
        sx={{
          position: "absolute",
          inset: 0,

          background:
            "linear-gradient(180deg, rgba(5, 17, 12, 0.45) 0%, rgba(5, 17, 12, 0.68) 100%)",

          zIndex: 1,
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 2,

          textAlign: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 900,
            mx: "auto",
          }}
        >
          <Typography
            sx={{
              mb: 2,

              color: "#79e2b4",

              fontSize: {
                xs: "0.8rem",
                md: "0.9rem",
              },

              fontWeight: 800,

              letterSpacing: "0.18em",
            }}
          >
            FRA UTDANNING TIL MULIGHETER
          </Typography>

          <Typography
            sx={{
              mb: 3,

              fontSize: {
                xs: "3rem",
                sm: "4.5rem",
                md: "6rem",
              },

              fontWeight: 800,

              letterSpacing: {
                xs: "-2px",
                md: "-5px",
              },

              lineHeight: 0.95,
            }}
          >
            Lærling
            <Box
              component="span"
              sx={{
                color: "#72dda9",
              }}
            >
              Match
            </Box>
          </Typography>

          <Typography
            component="h1"
            sx={{
              maxWidth: 760,
              mx: "auto",

              fontSize: {
                xs: "1.8rem",
                md: "2.7rem",
              },

              fontWeight: 600,
              lineHeight: 1.15,

              mb: 3,
            }}
          >
            Veien fra skole til arbeidsliv starter her.
          </Typography>

          <Typography
            sx={{
              maxWidth: 660,
              mx: "auto",

              mb: 5,

              color: "rgba(255,255,255,0.78)",

              fontSize: {
                xs: "1rem",
                md: "1.15rem",
              },

              lineHeight: 1.7,
            }}
          >
            Vi kobler elever med godkjente lærebedrifter og gjør det enklere å
            finne riktig lærlingplass, praksisplass og nye muligheter.
          </Typography>

          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            sx={{
              spacing: 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                minWidth: 190,

                backgroundColor: "#14845c",

                borderRadius: "999px",

                px: 4,
                py: 1.5,

                textTransform: "none",

                fontSize: "1rem",
                fontWeight: 700,

                "&:hover": {
                  backgroundColor: "#0e6847",
                },
              }}
            >
              Finn lærebedrift
            </Button>

            <Button
              variant="outlined"
              size="large"
              sx={{
                minWidth: 190,

                color: "#ffffff",
                borderColor: "rgba(255,255,255,0.55)",

                borderRadius: "999px",

                px: 4,
                py: 1.5,

                textTransform: "none",

                fontSize: "1rem",
                fontWeight: 700,

                "&:hover": {
                  borderColor: "#ffffff",
                  backgroundColor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              For bedrifter
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
