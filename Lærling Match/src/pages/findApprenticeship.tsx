import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
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
    <>
      <NavbarAPP
        appName={t("app.name")}
        userName="Ola Nordmann"
        userRole={userRole}
        profileImage="/profile.jpg"
        initials="ON"
        navItems={navItems}
      >
        <Findplacement />
      </NavbarAPP>
    </>
  );
};

export default FindApprenticeship;
