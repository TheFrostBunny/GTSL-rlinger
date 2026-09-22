import {
    Box,
    Button,
    Container,
    Stack,
    Typography,
  } from "@mui/material";
  
  import { useTranslation } from "react-i18next";
  
  import { darkTheme } from "../../themes/darkTheme";
  
  export default function CTASection() {
    const { t } = useTranslation();
  
    return (
      <Box
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
              position: "relative",
  
              overflow: "hidden",
  
              backgroundColor:
                darkTheme.palette.primary.main,
  
              color:
                darkTheme.palette.primary.contrastText,
  
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
  
                color:
                  darkTheme.palette.primary.contrastText,
  
                fontSize: {
                  xs: "2.3rem",
                  md: "4rem",
                },
  
                fontWeight: 750,
                lineHeight: 1.05,
                letterSpacing: "-2px",
              }}
            >
              {t("cta.title")}
            </Typography>
  
            <Typography
              sx={{
                maxWidth: 610,
  
                mb: 5,
  
                color:
                  darkTheme.palette.secondary.light,
  
                fontSize: "1.08rem",
  
                lineHeight: 1.8,
              }}
            >
              {t("cta.description")}
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
                  backgroundColor:
                    darkTheme.palette.primary.contrastText,
  
                  color:
                    darkTheme.palette.primary.main,
  
                  borderRadius: "999px",
  
                  px: 4,
                  py: 1.4,
  
                  textTransform: "none",
                  fontWeight: 700,
  
                  "&:hover": {
                    backgroundColor:
                      darkTheme.palette.secondary.light,
  
                    color:
                      darkTheme.palette.primary.dark,
                  },
                }}
              >
                {t("cta.start")}
              </Button>
  
              <Button
                variant="outlined"
                sx={{
                  color:
                    darkTheme.palette.primary.contrastText,
  
                  borderColor:
                    darkTheme.palette.primary.light,
  
                  borderRadius: "999px",
  
                  px: 4,
                  py: 1.4,
  
                  textTransform: "none",
                  fontWeight: 700,
  
                  "&:hover": {
                    borderColor:
                      darkTheme.palette.primary.contrastText,
  
                    backgroundColor:
                      darkTheme.palette.primary.light,
                  },
                }}
              >
                {t("cta.company")}
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    );
  }