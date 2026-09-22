import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

type NavItem = {
  label: string;
  href: string;
  icon?: ReactNode;
};

type NavbarAPPProps = {
  appName?: string;
  userName?: string | null;
  userRole: "Elev" | "Bedrift";
  profileImage?: string | null;
  initials?: string | null;
  navItems?: NavItem[];
  children?: ReactNode;
};

const navbarHeight = 72;
const sidebarStorageKey = "sidebar-collapsed";

export default function NavbarAPP({
  appName = "Lærling Link",
  userName,
  userRole,
  profileImage,
  initials,
  navItems = [],
  children,
}: NavbarAPPProps) {
  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem(sidebarStorageKey) === "true";
  });

  const [userMenuAnchor, setUserMenuAnchor] =
    useState<null | HTMLElement>(null);

  useEffect(() => {
    localStorage.setItem(sidebarStorageKey, String(collapsed));
  }, [collapsed]);

  const theme = useTheme();
  const navigate = useNavigate();

  const roleColor =
    userRole === "Elev"
      ? theme.palette.secondary.main
      : theme.palette.primary.main;

  const handleLogout = () => {
    setUserMenuAnchor(null);
    navigate("/login");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        bgcolor: "background.default",
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{
          height: navbarHeight,
          flexShrink: 0,
          width: "100%",
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <Toolbar
          sx={{
            height: navbarHeight,
            minHeight: `${navbarHeight}px !important`,
            justifyContent: "flex-end",
          }}
        >
          <Box
            onClick={(event) => setUserMenuAnchor(event.currentTarget)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              p: 1,
              borderRadius: 2,
              cursor: "pointer",
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
          >
            <Chip
              label={userRole}
              sx={{
                color: roleColor,
                bgcolor: alpha(roleColor, 0.16),
                fontWeight: 700,
              }}
            />

            <Typography
              sx={{
                display: { xs: "none", sm: "block" },
                color: "text.primary",
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
                color: "text.secondary",
                bgcolor: "action.hover",
                border: 1,
                borderColor: "divider",
                fontWeight: 700,
              }}
            >
              {initials}
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: "flex", flex: 1, minHeight: 0 }}>
        <Sidebar
          collapsed={collapsed}
          navItems={navItems}
          color={theme.palette.background.paper}
          appName={appName}
          logo="/Logo.png"
          onToggle={() => setCollapsed((value) => !value)}
        />

        <Box
          component="main"
          sx={{
            flex: 1,
            minWidth: 0,
            overflowY: "auto",
            p: { xs: 2, sm: 4, md: 5 },
            bgcolor: "background.default",
            color: "text.primary",
          }}
        >
          {children}
        </Box>
      </Box>

      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={() => setUserMenuAnchor(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: 190,
              backgroundColor: "background.paper",
              color: "text.primary",
              border: "1px solid",
              borderColor: "divider",
              boxShadow: 8,
            },
          },
        }}
      >
        <MenuItem
          sx={{
            color: "text.primary",
            "&:hover": {
              backgroundColor: "action.hover",
            },
          }}
          onClick={() => {
            setUserMenuAnchor(null);
            navigate("/settings");
          }}
        >
          <SettingsOutlinedIcon
            sx={{ mr: 1.5, color: "text.secondary" }}
          />
          Settings
        </MenuItem>

        <Divider sx={{ borderColor: "divider" }} />

        <MenuItem
          sx={{
            color: "error.main",
            "&:hover": {
              backgroundColor: "error.main",
              color: "error.contrastText",
            },
            "& .MuiSvgIcon-root": {
              color: "inherit",
            },
          }}
          onClick={handleLogout}
        >
          <LogoutOutlinedIcon sx={{ mr: 1.5 }} />
          Logg ut
        </MenuItem>
      </Menu>
    </Box>
  );
}
