import {
    Box,
    Container,
    Typography,
  } from "@mui/material";
  import { theme } from "../../themes/darkTheme";
  
  export default function Footer() {
    return (
      <Box
        component="footer"
        sx={{
          backgroundColor: theme.palette.background.default,
          borderTop: `1px solid ${theme.palette.primary.light}`,
          py: 5,
          px: { xs: 2, md: 3 },
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
  
            flexDirection: {
              xs: "column",
              sm: "row",
            },
  
            justifyContent: "space-between",
            alignItems: {
              xs: "flex-start",
              sm: "center",
            },
  
            gap: 2,
          }}
        >
          <Typography
            sx={{
              color: theme.palette.primary.contrastText,
              fontWeight: 800,
            }}
          >
            Lærling
            <Box
              component="span"
              sx={{
                color: theme.palette.primary.main,
              }}
            >
              Match
            </Box>
          </Typography>
  
          <Typography
            sx={{
              color: theme.palette.text.secondary,
              fontSize: "0.85rem",
            }}
          >
            © 2026 LærlingMatch
          </Typography>
        </Container>
      </Box>
    );
  }