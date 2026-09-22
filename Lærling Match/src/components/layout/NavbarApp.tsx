import { useState } from "react";
import type { ReactNode } from "react";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Sidebar from "./Sidebar";

type NavItem = {
  label: string;
  href: string;
  icon?: ReactNode;
};

type NavbarAPPProps = {
  appName?: string;
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
  appName = "Lærling Link",
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
          width: "100%",
          backgroundColor: "#0f141b",
        }}
      >
        <Toolbar
          sx={{
            height: navbarHeight,
            minHeight: `${navbarHeight}px !important`,
            justifyContent: "flex-end",
            px: { xs: 2, md: 4 },
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1.5, padding: 1 }}
          >
            <Chip
              label={userRole}
              sx={{
                color: "#d9c5ff",
                backgroundColor: `${roleColor}33`,
                fontWeight: 700,
              }}
            />

            <Typography
              sx={{
                display: { xs: "none", sm: "block" },
                color: "#f5f7fa",
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
                color: "#dce5f2",
                backgroundColor: "#202c3b",
                border: "1px solid #334155",
                fontWeight: 700,
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
          color="#161e28"
          appName={appName}
          logo="/TestLogo.svg"
          onToggle={() => setCollapsed((value) => !value)}
        />

        <Box
          component="main"
          sx={{
            flex: 1,
            minWidth: 0,
            overflow: "auto",
            p: { xs: 2, md: 5 },
            backgroundColor: "#0f141b",
            color: "#f5f7fa",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
