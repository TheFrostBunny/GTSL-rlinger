import {
    Box,
    Button,
    Container,
    Stack,
    Typography,
  } from "@mui/material";
  
  export default function CTASection() {
    return (
      <Box
        component="section"
        sx={{
          backgroundColor: "#f6f8f7",
  
          py: {
            xs: 8,
            md: 12,
          },
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              position: "relative",
  
              overflow: "hidden",
  
              backgroundColor: "#14845c",
              color: "#ffffff",
  
              borderRadius: {
                xs: "24px",
                md: "36px",
              },
  
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
  
                fontSize: {
                  xs: "2.3rem",
                  md: "4rem",
                },
  
                fontWeight: 750,
  
                lineHeight: 1.05,
  
                letterSpacing: "-2px",
              }}
            >
              Klar for å finne din lærlingplass?
            </Typography>
  
            <Typography
              sx={{
                maxWidth: 610,
  
                mb: 5,
  
                color: "rgba(255,255,255,0.78)",
  
                fontSize: "1.08rem",
  
                lineHeight: 1.8,
              }}
            >
              Opprett en profil og finn lærebedrifter som passer
              utdanningen, interessene og målene dine.
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
                  backgroundColor: "#ffffff",
                  color: "#0f5239",
  
                  borderRadius: "999px",
  
                  px: 4,
                  py: 1.4,
  
                  textTransform: "none",
                  fontWeight: 700,
  
                  "&:hover": {
                    backgroundColor: "#eef3f0",
                  },
                }}
              >
                Kom i gang
              </Button>
  
              <Button
                variant="outlined"
                sx={{
                  color: "#ffffff",
                  borderColor: "rgba(255,255,255,0.5)",
  
                  borderRadius: "999px",
  
                  px: 4,
                  py: 1.4,
  
                  textTransform: "none",
                  fontWeight: 700,
  
                  "&:hover": {
                    borderColor: "#ffffff",
                    backgroundColor: "rgba(255,255,255,0.07)",
                  },
                }}
              >
                Registrer bedrift
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    );
  }