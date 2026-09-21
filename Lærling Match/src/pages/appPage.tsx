import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import BusinessIcon from "@mui/icons-material/Business";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import NavbarAPP from "../components/layout/NavbarAPP";

const AppPage = () => {
  const userRole: "Elev" | "Bedrift" = "Elev";

  const navItems =
    userRole === "Elev"
      ? [
          { label: "Hjem", href: "/", icon: <HomeIcon /> },
          { label: "Min profil", href: "/profil", icon: <PersonIcon /> },
          {
            label: "Finn læreplass",
            href: "/stillinger",
            icon: <SearchIcon />,
          },
        ]
      : [
          { label: "Hjem", href: "/", icon: <HomeIcon /> },
          {
            label: "Bedriftsprofil",
            href: "/bedriftsprofil",
            icon: <BusinessIcon />,
          },
          {
            label: "Opprett stilling",
            href: "/opprett-stilling",
            icon: <AddBusinessIcon />,
          },
        ];

  return (
    <NavbarAPP
      userName="Ola Nordmann"
      userRole={userRole}
      profileImage="/profile.jpg"
      initials="ON"
      navItems={navItems}
    />
  );
};

export default AppPage;
