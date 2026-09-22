import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { darkTheme } from "../../themes/darkTheme";

export default function HeroSection() {
  const navigate = useNavigate();
  const { t } = useTranslation();

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

        color: darkTheme.palette.primary.contrastText,

        pt: {
          xs: 12,
          md: 14,
        },

        pb: {
          xs: 10,
          md: 12,
        },

        px: {
          xs: 2,
          md: 3,
        },
      }}
    >
      {/* Background video */}

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
        <source
          src="/videos/hero.mp4"
          type="video/mp4"
        />
      </Box>

      {/* Dark overlay */}

      <Box
        sx={{
          position: "absolute",
          inset: 0,

          background:
            "linear-gradient(180deg, rgba(5, 17, 12, 0.45) 0%, rgba(5, 17, 12, 0.68) 100%)",

          zIndex: 1,
        }}
      />

      {/* Content */}

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
          {/* Eyebrow */}

          <Typography
            sx={{
              mb: 2,

              color: darkTheme.palette.secondary.main,

              fontSize: {
                xs: "0.8rem",
                md: "0.9rem",
              },

              fontWeight: 800,
              letterSpacing: "0.18em",
            }}
          >
            {t("hero.eyebrow")}
          </Typography>

          {/* Logo */}

          <Box
            component="img"
            src="/Logo_Tekst.png"
            alt="Lærling Link"
            sx={{
              width: {
                xs: 260,
                sm: 420,
                md: 560,
              },

              maxWidth: "100%",
              height: "auto",

              display: "block",

              mx: "auto",
              mb: 3,
            }}
          />

          {/* Main heading */}

          <Typography
            component="h1"
            sx={{
              maxWidth: 760,
              mx: "auto",

              color: darkTheme.palette.text.primary,

              fontSize: {
                xs: "1.8rem",
                md: "2.7rem",
              },

              fontWeight: 600,
              lineHeight: 1.15,

              mb: 3,
            }}
          >
            {t("hero.title")}
          </Typography>

          {/* Description */}

          <Typography
            sx={{
              maxWidth: 660,
              mx: "auto",

              mb: 5,

              color: darkTheme.palette.text.secondary,

              fontSize: {
                xs: "1rem",
                md: "1.15rem",
              },

              lineHeight: 1.7,
            }}
          >
            {t("hero.description")}
          </Typography>

          {/* CTA buttons */}

          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={4}
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() =>
                navigate(
                  "/signup?type=apprentice",
                )
              }
              sx={{
                minWidth: 190,

                backgroundColor:
                  darkTheme.palette.primary.main,

                borderRadius: "999px",

                px: 4,
                py: 1.5,

                textTransform: "none",

                fontSize: "1rem",
                fontWeight: 700,

                "&:hover": {
                  backgroundColor:
                    darkTheme.palette.primary.light,
                },
              }}
            >
              {t("hero.findApprenticeship")}
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() =>
                navigate(
                  "/signup?type=company",
                )
              }
              sx={{
                minWidth: 190,

                color:
                  darkTheme.palette.primary.contrastText,

                borderColor:
                  darkTheme.palette.primary.light,

                borderRadius: "999px",

                px: 4,
                py: 1.5,

                textTransform: "none",

                fontSize: "1rem",
                fontWeight: 700,

                "&:hover": {
                  borderColor:
                    darkTheme.palette.primary.contrastText,

                  backgroundColor:
                    darkTheme.palette.primary.light,
                },
              }}
            >
              {t("hero.forCompanies")}
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}