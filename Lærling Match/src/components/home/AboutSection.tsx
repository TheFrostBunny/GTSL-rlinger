import { Box, Container, Typography } from "@mui/material";

export default function AboutSection() {
  return (
    <Box
      id="about"
      component="section"
      sx={{
        backgroundColor: "#f6f8f7",

        py: {
          xs: 10,
          md: 16,
        },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
            },

            gap: {
              xs: 6,
              md: 12,
            },

            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              sx={{
                mb: 2,

                color: "#14845c",

                fontSize: "0.85rem",
                fontWeight: 800,

                letterSpacing: "0.15em",
              }}
            >
              OM OSS
            </Typography>

            <Typography
              component="h2"
              sx={{
                mb: 3,

                color: "#14231d",

                fontSize: {
                  xs: "2.4rem",
                  md: "3.7rem",
                },

                fontWeight: 750,

                lineHeight: 1.05,

                letterSpacing: "-2px",
              }}
            >
              En enklere vei fra skole til arbeidsliv.
            </Typography>

            <Typography
              sx={{
                maxWidth: 590,

                color: "#627069",

                fontSize: {
                  xs: "1rem",
                  md: "1.1rem",
                },

                lineHeight: 1.9,
              }}
            >
              LærlingMatch skal gjøre overgangen fra skole til arbeidsliv
              enklere. Vi samler elever og lærebedrifter på én plattform,
              slik at det blir lettere å finne relevante muligheter, vise
              interesse og komme i kontakt med hverandre.
            </Typography>
          </Box>

          <Box
            sx={{
              position: "relative",

              minHeight: {
                xs: 320,
                md: 450,
              },

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              borderRadius: "32px",

              overflow: "hidden",

              background:
                "linear-gradient(135deg, #dff5ea 0%, #b9e8d2 100%)",
            }}
          >
            <Box
              sx={{
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  color: "#17392c",

                  fontSize: {
                    xs: "3rem",
                    md: "4.5rem",
                  },

                  fontWeight: 800,

                  letterSpacing: "-3px",
                }}
              >
                Elev
              </Typography>

              <Typography
                sx={{
                  my: 2,

                  color: "#14845c",

                  fontSize: "2rem",
                }}
              >
                ↕
              </Typography>

              <Typography
                sx={{
                  color: "#17392c",

                  fontSize: {
                    xs: "3rem",
                    md: "4.5rem",
                  },

                  fontWeight: 800,

                  letterSpacing: "-3px",
                }}
              >
                Bedrift
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}