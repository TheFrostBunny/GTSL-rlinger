import { useState } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import NavbarAPP from "../components/layout/NavbarApp";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";

type Application = {
  name: string;
  initials: string;
  profession: string;
  location: string;
  date: string;
  status: "Matchet" | "Venter svar" | "Avslått";
  color: string;
};

const applications: Application[] = [
  {
    name: "GreenTech AS",
    initials: "GT",
    profession: "IT-driftsfaget",
    location: "Oslo",
    date: "12. sep 2026",
    status: "Matchet",
    color: "#9858ad",
  },
  {
    name: "Nordic Solutions",
    initials: "NS",
    profession: "Utviklerfaget",
    location: "Bergen",
    date: "15. sep 2026",
    status: "Venter svar",
    color: "#ae82c4",
  },
  {
    name: "Fjord Industri",
    initials: "FJ",
    profession: "Mekanikerfaget",
    location: "Ålesund",
    date: "18. sep 2026",
    status: "Venter svar",
    color: "#452461",
  },
  {
    name: "Omsorg Pluss",
    initials: "OP",
    profession: "Helsearbeiderfaget",
    location: "Trondheim",
    date: "20. sep 2026",
    status: "Avslått",
    color: "#9858ad",
  },
];

const filters = ["Alle", "Venter", "Matchet", "Avslått"];

export default function MyApplications() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState("Alle");

  const navItems = [
    { label: t("nav.home"), href: "/app", icon: <HomeIcon /> },
    {
      label: t("nav.findApprenticeship"),
      href: "/stillinger",
      icon: <SearchIcon />,
    },
    {
      label: t("nav.myApplications"),
      href: "/mine-soknader",
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
  ];

  const filteredApplications = applications.filter((application) => {
    if (filter === "Alle") return true;
    if (filter === "Venter") return application.status === "Venter svar";
    return application.status === filter;
  });

  return (
    <>
    <NavbarAPP
      appName={t("app.name")}
      userName="Ola Nordmann"
      userRole="Elev"
      profileImage="/profile.jpg"
      initials="ON"
      navItems={navItems}
    >
      <Box>
        <Typography
          variant="h3"
          sx={{
            color: "text.primary",
            fontWeight: 800,
            fontSize: { xs: "2rem", md: "3rem" },
            mb: 0.5,
          }}
        >
          Mine søknader
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            fontSize: { xs: 16, md: 20 },
            mb: 4,
          }}
        >
          Oversikt over bedriftene du har vist interesse for.
        </Typography>

        <Stack
          direction="row"
          spacing={1.5}
          useFlexGap
          sx={{ flexWrap: "wrap", mb: 4 }}
        >
          {filters.map((item) => (
            <Chip
              key={item}
              label={
                item === "Alle"
                  ? "Alle (4)"
                  : item === "Venter"
                    ? "Venter (2)"
                    : item === "Matchet"
                      ? "Matchet (1)"
                      : "Avslått (1)"
              }
              onClick={() => setFilter(item)}
              sx={{
                height: 48,
                px: 1.5,
                fontSize: 18,
                color: filter === item ? "#fff" : "text.secondary",
                backgroundColor:
                  filter === item ? "primary.main" : "background.paper",
                border: "1px solid",
                borderColor: "divider",
                "&:hover": {
                  backgroundColor:
                    filter === item ? "primary.dark" : "action.hover",
                },
              }}
            />
          ))}
        </Stack>

        <Stack spacing={2.5}>
          {filteredApplications.map((application) => (
            <Paper
              key={application.name}
              elevation={0}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 2, md: 3 },
                p: { xs: 2, md: 4 },
                minHeight: 155,
                borderRadius: 3,
                backgroundColor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Box
                sx={{
                  width: { xs: 64, md: 72 },
                  height: { xs: 64, md: 72 },
                  flexShrink: 0,
                  display: "grid",
                  placeItems: "center",
                  borderRadius: 3,
                  backgroundColor: application.color,
                  color: "#fff",
                  fontSize: { xs: 20, md: 24 },
                  fontWeight: 700,
                }}
              >
                {application.initials}
              </Box>

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  sx={{
                    color: "text.primary",
                    fontSize: { xs: 20, md: 25 },
                    fontWeight: 700,
                  }}
                >
                  {application.name}
                </Typography>

                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: { xs: 16, md: 20 },
                    mt: 0.5,
                  }}
                >
                  {application.profession} · {application.location}
                </Typography>

                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: { xs: 14, md: 17 },
                    mt: 0.75,
                  }}
                >
                  Sendt {application.date}
                </Typography>
              </Box>

              <Chip
                label={application.status}
                sx={{
                  display: { xs: "none", sm: "flex" },
                  color:
                    application.status === "Matchet"
                      ? "#fff"
                      : "secondary.main",
                  backgroundColor:
                    application.status === "Matchet"
                      ? "primary.main"
                      : "action.hover",
                  fontSize: 17,
                  fontWeight: 700,
                  px: 1,
                  height: 40,
                }}
              />
            </Paper>
          ))}
        </Stack>
      </Box>
    </NavbarAPP>
    </>
  );
}