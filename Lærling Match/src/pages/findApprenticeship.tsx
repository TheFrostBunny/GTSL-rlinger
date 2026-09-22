import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import { useTranslation } from "react-i18next";
import NavbarAPP from "../components/layout/NavbarApp";
import Findplacement from "../components/FindPlace/Findplacement";

const FindApprenticeship = () => {
  const { t } = useTranslation();
  const userRole = "Elev";

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

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f1eff0" }}>
      <NavbarAPP
        appName={t("app.name")}
        userName="Ola Nordmann"
        userRole={userRole}
        profileImage="/profile.jpg"
        initials="ON"
        navItems={navItems}
      />

      <Box
        component="main"
        sx={{
          ml: { xs: 0, md: "287px" },
          minHeight: "100vh",
          px: { xs: 2, md: 5 },
          py: 4,
        }}
      >
        <Box sx={{ maxWidth: 640, mx: "auto" }}>
          <Findplacement/>
        </Box>
      </Box>
    </Box>
  );
};

export default FindApprenticeship;
