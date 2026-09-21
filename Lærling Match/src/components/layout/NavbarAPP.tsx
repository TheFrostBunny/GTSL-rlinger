import { useState } from 'react';
import type { ReactNode } from 'react';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

type NavItem = {
  label: string;
  href: string;
};

type NavbarAPPProps = {
  appName?: string;
  logo?: string;
  userName: string;
  userRole: 'Elev' | 'Bedrift';
  profileImage?: string;
  initials?: string;
  navItems?: NavItem[];
  children?: ReactNode;
};

function UserInfo({
  userName,
  userRole,
  profileImage,
  initials,
}: Omit<NavbarAPPProps, 'appName' | 'logo' | 'navItems' | 'children'>) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
      <Chip
        label={userRole}
        variant="outlined"
        sx={{
          display: { xs: 'none', sm: 'flex' },
          color: '#fff',
          borderColor: '#fff',
          fontWeight: 600,
        }}
      />

      <Typography
        sx={{
          display: { xs: 'none', sm: 'block' },
          color: '#fff',
          fontWeight: 600,
        }}
      >
        {userName}
      </Typography>

      <Avatar
        src={profileImage}
        alt={userName}
        sx={{
          width: 42,
          height: 42,
          border: '2px solid #fff',
        }}
      >
        {initials}
      </Avatar>
    </Box>
  );
}

function MobileMenu({
  open,
  onClose,
  items,
}: {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
}) {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 280 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton aria-label="Lukk meny" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List>
          {items.map((item) => (
            <ListItemButton
              key={item.href}
              component="a"
              href={item.href}
              onClick={onClose}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default function NavbarAPP({
  appName = 'Lærling Match',
  logo = '/logo.png',
  userName,
  userRole,
  profileImage,
  initials,
  navItems = [],
}: NavbarAPPProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: '#935CA6',
          borderBottom: '1px solid #e5e7eb',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              minHeight: 72,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <IconButton
                aria-label="Åpne meny"
                onClick={() => setMenuOpen(true)}
                sx={{
                  display: 'flex',
                  color: '#fff',
                  mr: 1,
                }}
              >
                <MenuIcon />
              </IconButton>

              <Box
                component="img"
                src={logo}
                alt={`${appName} logo`}
                sx={{ width: 42, height: 42, objectFit: 'contain' }}
              />

              <Typography
                variant="h6"
                sx={{ color: '#fff', fontWeight: 800 }}
              >
                {appName}
              </Typography>
            </Box>

            <UserInfo
              userName={userName}
              userRole={userRole}
              profileImage={profileImage}
              initials={initials}
            />
          </Toolbar>
        </Container>
      </AppBar>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={navItems}
      />
    </>
  );
}