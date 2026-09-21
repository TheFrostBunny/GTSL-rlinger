import type { ReactNode } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

type NavItem = {
  label: string;
  href: string;
  icon?: ReactNode;
};

type SidebarProps = {
  collapsed: boolean;
  navItems: NavItem[];
  color: string;
};

const drawerWidth = 260;
const collapsedWidth = 76;

export default function Sidebar({
  collapsed,
  navItems,
  color,
}: SidebarProps) {
  const width = collapsed ? collapsedWidth : drawerWidth;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        height: "100%",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          position: "relative",
          width,
          height: "100%",
          boxSizing: "border-box",
          backgroundColor: color,
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
  );
}