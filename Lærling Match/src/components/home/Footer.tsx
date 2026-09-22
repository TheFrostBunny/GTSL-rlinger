import {
  Box,
  Container,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";

import { darkTheme } from "../../themes/darkTheme";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor:
          darkTheme.palette.background.default,

        borderTop: `1px solid ${darkTheme.palette.primary.light}`,

        py: 5,

        px: {
          xs: 2,
          md: 3,
        },
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
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",

            gap: 1.5,

            textDecoration: "none",
          }}
        >
          <Box
            component="img"
            src="/Logo.png"
            alt="Lærling Link"
            sx={{
              width: {
                xs: 42,
                md: 50,
              },

              height: "auto",
              display: "block",
            }}
          />
        </Box>

        <Typography
          sx={{
            color:
              darkTheme.palette.text.secondary,

            fontSize: "0.85rem",
          }}
        >
          © 2026 LærlingMatch
        </Typography>
      </Container>
    </Box>
  );
}