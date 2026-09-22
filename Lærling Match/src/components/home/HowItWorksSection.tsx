import { Box, Container, Typography } from "@mui/material";
import { darkTheme } from "../../themes/darkTheme";

const steps = [
  {
    number: "01",
    title: "Opprett profil",
    description:
      "Fortell hvem du er, hva du går på skole og hvilke muligheter du ser etter.",
  },
  {
    number: "02",
    title: "Finn relevante bedrifter",
    description:
      "Utforsk godkjente lærebedrifter og finn bedrifter som passer deg.",
  },
  {
    number: "03",
    title: "Vis interesse",
    description:
      "Ta kontakt med bedriften og kom ett steg nærmere en lærlingplass.",
  },
];

export default function HowItWorksSection() {
  return (
    <Box
      id="how-it-works"
      component="section"
      sx={{
        backgroundColor: darkTheme.palette.background.default,
        color: darkTheme.palette.primary.contrastText,
        py: { xs: 10, md: 16 },
        px: { xs: 2, md: 3 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            maxWidth: 750,

            mb: {
              xs: 7,
              md: 10,
            },
          }}
        >
          <Typography
            sx={{
              mb: 2,

              color: darkTheme.palette.primary.main,

              fontSize: "0.85rem",
              fontWeight: 800,

              letterSpacing: "0.15em",
            }}
          >
            SLIK FUNGERER DET
          </Typography>

          <Typography
            component="h2"
            sx={{
              color: darkTheme.palette.text.primary,

              fontSize: {
                xs: "2.4rem",
                md: "3.7rem",
              },

              fontWeight: 750,

              lineHeight: 1.05,

              letterSpacing: "-2px",
            }}
          >
            Tre steg til nye muligheter.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(3, 1fr)",
            },

            gap: {
              xs: 6,
              md: 7,
            },
          }}
        >
          {steps.map((step) => (
            <Box key={step.number}>
              <Typography
                sx={{
                  mb: 3,

                  color: darkTheme.palette.primary.main,

                  fontSize: {
                    xs: "3rem",
                    md: "4.5rem",
                  },

                  fontWeight: 300,

                  lineHeight: 1,
                }}
              >
                {step.number}
              </Typography>

              <Typography
                sx={{
                  mb: 2,

                  fontSize: "1.4rem",
                  fontWeight: 700,
                }}
              >
                {step.title}
              </Typography>

              <Typography
                sx={{
                  maxWidth: 340,

                  color: darkTheme.palette.text.secondary,

                  lineHeight: 1.8,
                }}
              >
                {step.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
