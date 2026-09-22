import {
    Box,
    Container,
    Typography,
  } from "@mui/material";
  
  export default function Footer() {
    return (
      <Box
        component="footer"
        sx={{
          backgroundColor: "#ffffff",
  
          borderTop: "1px solid #e5ebe8",
  
          py: 5,
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
              color: "#17251f",
              fontWeight: 800,
            }}
          >
            Lærling
            <Box
              component="span"
              sx={{
                color: "#14845c",
              }}
            >
              Match
            </Box>
          </Typography>
  
          <Typography
            sx={{
              color: "#7a8580",
              fontSize: "0.85rem",
            }}
          >
            © 2026 LærlingMatch
          </Typography>
        </Container>
      </Box>
    );
  }