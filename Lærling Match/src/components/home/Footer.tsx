import {
    Box,
    Container,
    Typography,
  } from "@mui/material";
  import { darkTheme } from "../../themes/darkTheme";
  
  export default function Footer() {
    return (
      <Box
        component="footer"
        sx={{
          backgroundColor: darkTheme.palette.background.default,
          borderTop: `1px solid ${darkTheme.palette.primary.light}`,
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
              color: darkTheme.palette.primary.contrastText,
              fontWeight: 800,
            }}
          >
            Lærling
            <Box
              component="span"
              sx={{
                color: darkTheme.palette.primary.main,
              }}
            >
              Match
            </Box>
          </Typography>
  
          <Typography
            sx={{
              color: darkTheme.palette.text.secondary,
              fontSize: "0.85rem",
            }}
          >
            © 2026 LærlingMatch
          </Typography>
        </Container>
      </Box>
    );
  }