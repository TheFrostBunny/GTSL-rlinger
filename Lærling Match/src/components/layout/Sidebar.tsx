import type { ReactNode } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
import { alpha, useTheme } from "@mui/material/styles";

type NavItem = {
  label: string;
  href: string;
  icon?: ReactNode;
};

type SidebarProps = {
  collapsed: boolean;
  navItems: NavItem[];
  color?: string;
  appName?: string;
  logo?: string;
  onToggle: () => void;
};

export default function Sidebar({
  collapsed,
  navItems,
  color,
  appName = "Lærling Link",
  logo = "/Logo.png",
  onToggle,
}: SidebarProps) {
  const location = useLocation();
  const theme = useTheme();
  const width = collapsed ? 76 : 310;
  const sidebarColor = color ?? theme.palette.background.paper;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        flexShrink: 0,
        bgcolor: sidebarColor,
        transition: "width 0.25s ease",

        "&.MuiDrawer-docked": {
          bgcolor: sidebarColor,
        },

        "& .MuiDrawer-paper": {
          position: "fixed",
          top: 0,
          left: 0,
          width,
          height: "100vh",
          boxSizing: "border-box",
          bgcolor: sidebarColor,
          borderRight: 1,
          borderColor: "divider",
          overflowX: "hidden",
          transition: "width 0.25s ease",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          px: collapsed ? 1.5 : 4,
          py: 3,
        }}
      >
        {!collapsed && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.75 }}>
            <Box
              component="img"
              src={logo}
              alt={`${appName} logo`}
              sx={{
                width: 48,
                height: 48,
                objectFit: "contain",
              }}
            />

            <Typography
              sx={{
                color: "text.primary",
                fontSize: "1.45rem",
                fontWeight: 800,
                whiteSpace: "nowrap",
              }}
            >
              {appName}
            </Typography>
          </Box>
        )}

        <IconButton
          onClick={onToggle}
          aria-label={collapsed ? "Åpne sidebar" : "Lukk sidebar"}
          sx={{
            color: "text.primary",
            ml: collapsed ? 0 : 1,
            "&:hover": {
              bgcolor: "action.hover",
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      <List sx={{ px: collapsed ? 1.5 : 3, pt: 1 }}>
        {navItems.map((item) => {
          const isActive =
            item.href === "/app"
              ? location.pathname === "/app"
              : location.pathname.startsWith(item.href);

          return (
            <ListItemButton
              key={item.href}
              component={Link}
              to={item.href}
              title={collapsed ? item.label : undefined}
              sx={{
                minHeight: 56,
                mb: 1,
                px: 2,
                justifyContent: collapsed ? "center" : "initial",
                borderRadius: 3,
                bgcolor: isActive
                  ? alpha(theme.palette.primary.main, 0.14)
                  : "transparent",

                "& .MuiListItemIcon-root": {
                  minWidth: 0,
                  mr: collapsed ? 0 : 2,
                  justifyContent: "center",
                  color: isActive ? "primary.main" : "text.secondary",
                },

                "& .MuiListItemText-primary": {
                  color: isActive ? "text.primary" : "text.secondary",
                  fontSize: "1.1rem",
                  fontWeight: isActive ? 600 : 500,
                },

                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
            >
              {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
              {!collapsed && <ListItemText primary={item.label} />}
            </ListItemButton>
          );
        })}
      </List>
    </Drawer>
  );
}
