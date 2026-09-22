import Box from "@mui/material/Box";
import HistoryIcon from "@mui/icons-material/History";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import DashboardIntro from "../components/dashboard/DashboardIntro";
import BusinessIcon from "@mui/icons-material/Business";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import NavbarAPP from "../components/layout/NavbarApp";
import { useTranslation } from "react-i18next";
import CompanyList from "../components/dashboard/CompanyList";

const HomePage = () => {
  const { t } = useTranslation();
  const userRole: "Elev" | "Bedrift" = "Elev";
  const navItems =
    userRole === "Elev"
      ? [
          { label: t("nav.home"), href: "/app", icon: <HomeIcon /> },
          {
            label: t("nav.findApprenticeship"),
            href: "/application",
            icon: <SearchIcon />,
          },
          { label: t("nav.myApplications"), href: "/mine-soknader", icon: <AssignmentOutlinedIcon /> },
          { label: t("nav.history"), href: "/historikk", icon: <HistoryIcon /> },
          { label: t("nav.profile"), href: "/profil", icon: <PersonIcon /> },
        ]
      : [
          { label: t("nav.home"), href: "/app", icon: <HomeIcon /> },
          {
            label: t("nav.businessProfile"),
            href: "/bedriftsprofil",
            icon: <BusinessIcon />,
          },
          {
            label: t("nav.createPosition"),
            href: "/opprett-stilling",
            icon: <AddBusinessIcon />,
          },
        ];
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f3f7" }}>
      <NavbarAPP
        appName={t("app.name")}
        userName="Ola Nordmann"
        userRole={userRole}
        profileImage="/profile.jpg"
        initials="ON"
        navItems={navItems}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 1100,
            mx: "auto",
            px: { xs: 2, md: 3 },
            py: { xs: 3, md: 4 },
            boxSizing: "border-box",
          }}
        >
          <Box sx={{ mb: 4 }}>
            <DashboardIntro />
          </Box>
          <CompanyList />
        </Box>
      </NavbarAPP>
    </Box>
  );
};

export default HomePage;
