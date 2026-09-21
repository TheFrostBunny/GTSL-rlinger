import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import BusinessIcon from "@mui/icons-material/Business";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { useTranslation } from "react-i18next";
import NavbarAPP from "../components/layout/NavbarApp";

const AppPage = () => {
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
    <NavbarAPP
      appName={t("app.name")}
      userName="Ola Nordmann"
      userRole={userRole}
      logo="/logo.png"
      profileImage="/profile.jpg"
      initials="ON"
      navItems={navItems}
    />
  );
};

export default AppPage;
