import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import GrettingsText from "../GrettingsText";
import { useTranslation } from "react-i18next";
import { useDashboardStats } from "../../hooks/useDashboardStats";

const DashboardIntro = () => {
  const { t } = useTranslation();
  const { stats, loading } = useDashboardStats();

  const dashboardStats = [
    [stats.newSuggestions, t("dashboard.stats.newSuggestions")],
    [stats.liked, t("dashboard.stats.liked")],
    [stats.awaitingResponse, t("dashboard.stats.awaitingResponse")],
  ];

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
        {t("dashboard.welcome")}
        <br />
        {t("dashboard.backToName", { name: "Ola" })}
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
        {loading
          ? t("dashboard.loadingSuggestions")
          : t("dashboard.matchingSuggestions", {
              count: stats.newSuggestions,
            })}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: { xs: 4, md: 8, lg: 12 },
          mt: 5,
        }}
      >
        {dashboardStats.map(([value, label]) => (
          <Box key={label}>
            <Typography
              sx={{ color: "#f5f7fa", fontSize: "1.8rem", fontWeight: 700 }}
            >
              {loading ? "—" : value}
            </Typography>
            <Typography sx={{ color: "#8fa1b8" }}>{label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default DashboardIntro;
