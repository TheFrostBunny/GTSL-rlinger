import { useState } from "react";
import type { ReactNode } from "react";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

type NavItem = {
  label: string;
  href: string;
  icon?: ReactNode;
};

type NavbarAPPProps = {
  appName?: string;
  logo?: string;
  userName: string;
  userRole: "Elev" | "Bedrift";
  profileImage?: string;
  initials?: string;
  navItems?: NavItem[];
  children?: ReactNode;
};

const drawerWidth = 260;
const collapsedWidth = 76;

export default function NavbarAPP({
  appName = "Lærling Match",
  logo = "/logo.jpg",
  userName,
  userRole,
  profileImage,
  initials,
  navItems = [],
  children,
}: NavbarAPPProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      {/* Navbar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "#935CA6",
          borderBottom: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", minHeight: 72 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              onClick={() => setCollapsed((value) => !value)}
              aria-label={collapsed ? "Vis sidebar" : "Skjul sidebar"}
              sx={{ color: "#fff" }}
            >
              {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>

            <Typography variant="h6" sx={{ color: "#fff", fontWeight: 800 }}>
              {appName}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Chip
              label={userRole}
              variant="outlined"
              sx={{
                color: "#fff",
                borderColor: "#fff",
                fontWeight: 600,
              }}
            />

            <Typography
              sx={{
                color: "#fff",
                fontWeight: 600,
                display: { xs: "none", sm: "block" },
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
                border: "2px solid #fff",
              }}
            >
              {initials}
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar og innhold under navbaren */}
      <Box sx={{ display: "flex", minHeight: "calc(100vh - 72px)" }}>
        <Drawer
          variant="permanent"
          sx={{
            width: collapsed ? collapsedWidth : drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              position: "relative",
              height: "calc(100vh - 72px)",
              width: collapsed ? collapsedWidth : drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#935CA6",
              color: "#fff",
              border: "none",
              overflowX: "hidden",
              transition: "width 0.25s ease",
            },
          }}
        >
          <List sx={{ px: 1.5 }}>
            {navItems.map((item) => (
              <ListItemButton
                key={item.href}
                component="a"
                href={item.href}
                title={collapsed ? item.label : undefined}
                sx={{
                  mb: 0.5,
                  minHeight: 48,
                  justifyContent: collapsed ? "center" : "initial",
                  borderRadius: 2,
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.15)",
                  },
                }}
              >
                {item.icon && (
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: collapsed ? 0 : 2,
                      justifyContent: "center",
                      color: "#fff",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                )}

                {!collapsed && <ListItemText primary={item.label} />}
              </ListItemButton>
            ))}
          </List>
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            minWidth: 0,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
