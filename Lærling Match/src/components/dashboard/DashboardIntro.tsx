import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import GrettingsText from "../GrettingsText";

const DashboardIntro = () => {
  return (
    <Box sx={{ mb: 4 }}>
      <GrettingsText />

      <Typography
        variant="h1"
        sx={{
          width: "100%",
          maxWidth: { xs: 600, lg: 850 },
          color: "#f5f7fa",
          fontSize: "clamp(2.5rem, 6vw, 5rem)",
          lineHeight: 1.05,
          fontWeight: 800,
        }}
      >
        Velkommen
        <br />
        tilbake, Ola
      </Typography>

      <Typography
        sx={{
          mt: 3,
          width: "100%",
          maxWidth: { xs: 600, lg: 850 },
          color: "#8fa1b8",
          fontSize: "clamp(1rem, 1.5vw, 1.35rem)",
          lineHeight: 1.5,
        }}
      >
        To nye bedrifter matcher profilen din denne uken. Bla gjennom og finn
        din neste læreplass.
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: { xs: 4, md: 8, lg: 12 },
          mt: 5,
        }}
      >
        {[
          ["12", "nye forslag"],
          ["3", "du har likt"],
          ["2", "venter svar"],
        ].map(([value, label]) => (
          <Box key={label}>
            <Typography
              sx={{ color: "#f5f7fa", fontSize: "1.8rem", fontWeight: 700 }}
            >
              {value}
            </Typography>
            <Typography sx={{ color: "#8fa1b8" }}>{label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default DashboardIntro;
