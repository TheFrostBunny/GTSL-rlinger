import MenuAppBar from "../components/layout/NavbarAPP";

const AppPage = () => {
  return (
    <MenuAppBar
      userName="Ola Nordmann"
      userRole="Elev"
      profileImage="/profile.jpg"
      initials="ON"
      navItems={[
        { label: 'Hjem', href: '/' },
        { label: 'Min profil', href: '/profil' },
        { label: 'Stillinger', href: '/stillinger' },
        { label: 'Innstillinger', href: '/innstillinger' },
      ]}
    />
  );
};

export default AppPage;