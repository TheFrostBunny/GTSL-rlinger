import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import HistoryIcon from "@mui/icons-material/History";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import { useTranslation } from "react-i18next";
import NavbarAPP from "../components/layout/NavbarApp";

const historyItems = [
  {
    company: "GreenTech AS",
    profession: "IT-driftsfaget",
    location: "Oslo",
    date: "12. sep 2026",
    action: "Søknad sendt",
  },
  {
    company: "Nordic Solutions",
    profession: "Utviklerfaget",
    location: "Bergen",
    date: "15. sep 2026",
    action: "Søknad sendt",
  },
  {
    company: "Fjord Industri",
    profession: "Mekanikerfaget",
    location: "Ålesund",
    date: "18. sep 2026",
    action: "Søknad sendt",
  },
];

export default function History() {
  const { t } = useTranslation();

  const navItems = [
    { label: t("nav.home"), href: "/app", icon: <HomeIcon /> },
    {
      label: t("nav.findApprenticeship"),
      href: "/stillinger",
      icon: <SearchIcon />,
    },
    {
      label: t("nav.myApplications"),
      href: "/application",
      icon: <AssignmentOutlinedIcon />,
    },
    {
      label: t("nav.history"),
      href: "/historikk",
      icon: <HistoryIcon />,
    },
    {
      label: t("nav.profile"),
      href: "/profil",
      icon: <PersonIcon />,
    },
    {
      label: t("nav.settings"),
      href: "/settings",
      icon: <SettingsIcon />,
    }
  ];

  return (
    <NavbarAPP
      appName={t("app.name")}
      userName="Ola Nordmann"
      userRole="Elev"
      profileImage="/profile.jpg"
      initials="ON"
      navItems={navItems}
    >
      <Box sx={{ width: "100%", maxWidth: 1100, mx: "auto" }}>
        <Typography
          variant="h3"
          sx={{ color: "text.primary", fontWeight: 800, mb: 1 }}
        >
          Historikk
        </Typography>

        <Typography sx={{ color: "text.secondary", mb: 4 }}>
          Se tidligere søknader og aktiviteter.
        </Typography>

        <Stack spacing={2}>
          {historyItems.map((item) => (
            <Paper
              key={`${item.company}-${item.date}`}
              elevation={0}
              sx={{
                p: { xs: 2, md: 3 },
                borderRadius: 3,
                backgroundColor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography
                sx={{ color: "text.primary", fontWeight: 700, fontSize: 20 }}
              >
                {item.company}
              </Typography>

              <Typography sx={{ color: "text.secondary", mt: 0.5 }}>
                {item.profession} · {item.location}
              </Typography>

              <Typography sx={{ color: "text.secondary", mt: 1 }}>
                {item.action} · {item.date}
              </Typography>
            </Paper>
          ))}
        </Stack>
      </Box>
    </NavbarAPP>
  );
}