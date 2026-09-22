import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";

import { useTranslation } from "react-i18next";

import { darkTheme } from "../../themes/darkTheme";

export default function GoalsSection() {
  const { t } = useTranslation();

  const goals = [
    {
      number: "01",
      title: t("goals.items.first.title"),
      description: t("goals.items.first.description"),
    },
    {
      number: "02",
      title: t("goals.items.second.title"),
      description: t("goals.items.second.description"),
    },
    {
      number: "03",
      title: t("goals.items.third.title"),
      description: t("goals.items.third.description"),
    },
    {
      number: "04",
      title: t("goals.items.fourth.title"),
      description: t("goals.items.fourth.description"),
    },
  ];

  return (
    <Box
      id="goals"
      component="section"
      sx={{
        backgroundColor:
          darkTheme.palette.background.default,

        py: {
          xs: 10,
          md: 16,
        },

        px: {
          xs: 2,
          md: 3,
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

              color:
                darkTheme.palette.primary.main,

              fontSize: "0.85rem",
              fontWeight: 800,

              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            {t("goals.title")}
          </Typography>

          <Typography
            component="h2"
            sx={{
              color:
                darkTheme.palette.primary
                  .contrastText,

              fontSize: {
                xs: "2.4rem",
                md: "3.7rem",
              },

              fontWeight: 750,
              lineHeight: 1.05,
              letterSpacing: "-2px",
            }}
          >
            {t("goals.heading")}
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
                backgroundColor:
                  darkTheme.palette.background.paper,

                border: `1px solid ${darkTheme.palette.divider}`,

                borderRadius: "24px",

                transition:
                  "transform 200ms ease, box-shadow 200ms ease",

                "&:hover": {
                  transform:
                    "translateY(-5px)",

                  boxShadow:
                    "0 20px 50px rgba(14, 35, 26, 0.08)",
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

                    color:
                      darkTheme.palette.primary.main,

                    fontSize: "0.9rem",
                    fontWeight: 800,
                  }}
                >
                  {goal.number}
                </Typography>

                <Typography
                  sx={{
                    mb: 2,

                    color:
                      darkTheme.palette.primary
                        .contrastText,

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
                    color:
                      darkTheme.palette.text
                        .secondary,

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