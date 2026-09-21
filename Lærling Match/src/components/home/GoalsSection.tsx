import { Box, Card, CardContent, Container, Typography } from "@mui/material";

const goals = [
  {
    number: "01",
    title: "Enklere vei til læreplass",
    description:
      "Gjøre det lettere for elever å finne bedrifter som passer utdanningen, interessene og målene deres.",
  },
  {
    number: "02",
    title: "Bedre matching",
    description:
      "Koble elever og bedrifter basert på fagområde, lokasjon og interesser.",
  },
  {
    number: "03",
    title: "Tettere kontakt",
    description:
      "Gjøre kommunikasjonen mellom elever og bedrifter enklere, raskere og mer direkte.",
  },
  {
    number: "04",
    title: "Flere muligheter",
    description:
      "Synliggjøre lærlingplasser, praksisplasser og andre relevante muligheter.",
  },
];

export default function GoalsSection() {
  return (
    <Box
      id="goals"
      component="section"
      sx={{
        backgroundColor: "#ffffff",

        py: {
          xs: 10,
          md: 16,
        },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            maxWidth: 700,

            mx: "auto",
            mb: {
              xs: 6,
              md: 9,
            },

            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              mb: 2,

              color: "#14845c",

              fontSize: "0.85rem",
              fontWeight: 800,

              letterSpacing: "0.15em",
            }}
          >
            VÅRE MÅL
          </Typography>

          <Typography
            component="h2"
            sx={{
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
            Vi gjør veien til læreplass enklere.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, 1fr)",
            },

            gap: 3,
          }}
        >
          {goals.map((goal) => (
            <Card
              key={goal.number}
              elevation={0}
              sx={{
                border: "1px solid #e3e9e6",

                borderRadius: "24px",

                transition: "transform 200ms ease, box-shadow 200ms ease",

                "&:hover": {
                  transform: "translateY(-5px)",

                  boxShadow: "0 20px 50px rgba(14, 35, 26, 0.08)",
                },
              }}
            >
              <CardContent
                sx={{
                  p: {
                    xs: 4,
                    md: 5,
                  },

                  "&:last-child": {
                    pb: {
                      xs: 4,
                      md: 5,
                    },
                  },
                }}
              >
                <Typography
                  sx={{
                    mb: 4,

                    color: "#14845c",

                    fontSize: "0.9rem",
                    fontWeight: 800,
                  }}
                >
                  {goal.number}
                </Typography>

                <Typography
                  sx={{
                    mb: 2,

                    color: "#17251f",

                    fontSize: {
                      xs: "1.35rem",
                      md: "1.55rem",
                    },

                    fontWeight: 700,
                  }}
                >
                  {goal.title}
                </Typography>

                <Typography
                  sx={{
                    color: "#68746e",

                    lineHeight: 1.75,
                  }}
                >
                  {goal.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
