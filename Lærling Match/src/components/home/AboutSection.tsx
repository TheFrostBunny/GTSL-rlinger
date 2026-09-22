import {
  Box,
  Container,
  Typography,
} from "@mui/material";

import { useTranslation } from "react-i18next";

import { darkTheme } from "../../themes/darkTheme";

export default function AboutSection() {
  const { t } = useTranslation();

  return (
    <Box
      id="about"
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

                color:
                  darkTheme.palette.primary.main,

                fontSize: "0.85rem",
                fontWeight: 800,

                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              {t("about.title")}
            </Typography>

            <Typography
              component="h2"
              sx={{
                mb: 3,

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
              {t("about.heading")}
            </Typography>

            <Typography
              sx={{
                maxWidth: 590,

                color:
                  darkTheme.palette.text.secondary,

                fontSize: {
                  xs: "1rem",
                  md: "1.1rem",
                },

                lineHeight: 1.9,
              }}
            >
              {t("about.description")}
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

              background: `linear-gradient(
                135deg,
                ${darkTheme.palette.primary.light} 0%,
                ${darkTheme.palette.primary.main} 100%
              )`,
            }}
          >
            <Box
              sx={{
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  color:
                    darkTheme.palette.primary
                      .contrastText,

                  fontSize: {
                    xs: "3rem",
                    md: "4.5rem",
                  },

                  fontWeight: 800,
                  letterSpacing: "-3px",
                }}
              >
                {t("about.student")}
              </Typography>

              <Typography
                sx={{
                  my: 2,

                  color:
                    darkTheme.palette.primary
                      .contrastText,

                  fontSize: "2rem",
                }}
              >
                ↕
              </Typography>

              <Typography
                sx={{
                  color:
                    darkTheme.palette.primary
                      .contrastText,

                  fontSize: {
                    xs: "3rem",
                    md: "4.5rem",
                  },

                  fontWeight: 800,
                  letterSpacing: "-3px",
                }}
              >
                {t("about.company")}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}