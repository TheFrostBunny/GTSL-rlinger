import { useState } from "react";
import type { ReactNode } from "react";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Sidebar from "./Sidebar";

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

const navbarHeight = 72;

const roleColors = {
  Elev: "#935CA6",
  Bedrift: "#422859",
} as const;

export default function NavbarAPP({
  appName = "Lærling Match",
  userName,
  userRole,
  profileImage,
  initials,
  navItems = [],
  children,
}: NavbarAPPProps) {
  const [collapsed, setCollapsed] = useState(false);
  const roleColor = roleColors[userRole];

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{
          height: navbarHeight,
          flexShrink: 0,
          backgroundColor: roleColor,
        }}
      >
        <Toolbar
          sx={{
            height: navbarHeight,
            minHeight: `${navbarHeight}px !important`,
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              onClick={() => setCollapsed((value) => !value)}
              aria-label={collapsed ? "Vis sidebar" : "Skjul sidebar"}
              sx={{ color: "#fff" }}
            >
              {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>

            <Typography
              variant="h6"
              sx={{ color: "#fff", fontWeight: 800 }}
            >
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
                display: { xs: "none", sm: "block" },
                color: "#fff",
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
                border: "2px solid #fff",
              }}
            >
              {initials}
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          display: "flex",
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
        }}
      >
        <Sidebar
          collapsed={collapsed}
          navItems={navItems}
          color={roleColor}
        />

        <Box
          component="main"
          sx={{
            flex: 1,
            minWidth: 0,
            overflow: "auto",
            p: 3,
            backgroundColor: "#f8f9fa",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
