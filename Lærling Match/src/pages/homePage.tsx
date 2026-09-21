import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import BusinessIcon from "@mui/icons-material/Business";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import NavbarAPP from "../components/layout/NavbarApp";
import { useTranslation } from "react-i18next";
import CompanyList from "../components/CompanyList";

export default function HomePage() {
     const { t } = useTranslation();
  const userRole: "Elev" | "Bedrift" = "Elev";

  const navItems =
    userRole === "Elev"
      ? [
          { label: t("nav.home"), href: "/", icon: <HomeIcon /> },
          { label: t("nav.profile"), href: "/profil", icon: <PersonIcon /> },
          {
            label: t("nav.findApprenticeship"),
            href: "/stillinger",
            icon: <SearchIcon />,
          },
        ]
      : [
          { label: t("nav.home"), href: "/", icon: <HomeIcon /> },
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
        logo="/logo.png"
        profileImage="/profile.jpg"
        initials="ON"
        navItems={navItems}
      >
        <Box sx={{ maxWidth: 1200, mx: "auto", p: { xs: 2, md: 4 } }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              mb: 3,
              borderRadius: 1,
              backgroundColor: "#935CA6",
              color: "#fff",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              Velkommen, David!
            </Typography>
            <Typography sx={{ mt: 1, opacity: 0.9 }}>
              Finn spennende bedrifter og din neste læreplass.
            </Typography>
          </Paper>
          <CompanyList />
        </Box>
      </NavbarAPP>
    </Box>
  );
}