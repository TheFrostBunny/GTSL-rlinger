import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
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
import ListItemIcon from "@mui/material/ListItemIcon";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import SchoolIcon from "@mui/icons-material/School";

type NavItem = {
  label: string;
  href: string;
  icon?: ReactNode;
};

export type UserRole = "Elev" | "Bedrift";

type NavbarAPPProps = {
  appName?: string;
  userName?: string | null;
  userRole: UserRole;
  profileImage?: string | null;
  initials?: string | null;
  navItems?: NavItem[];
  /**
   * Kalles når brukeren velger å bytte mellom Elev/Bedrift-visning.
   * Hvis den ikke er satt, vises ikke bytte-alternativet.
   */
  onRoleChange?: (role: UserRole) => void;
  children?: ReactNode;
};

const NAVBAR_HEIGHT = 72;
const SIDEBAR_STORAGE_KEY = "sidebar-collapsed";

function useDefaultNavItems(role: UserRole): NavItem[] {
  const { t } = useTranslation();

  if (role === "Bedrift") {
    return [
      {
        label: t("nav.home"),
        href: "/app",
        icon: <HomeIcon />,
      },
      {
        label: t("nav.businessProfile"),
        href: "/bedriftsprofil",
        icon: <BusinessCenterIcon />,
      },
      {
        label: t("nav.createPosition"),
        href: "/opprett-stilling",
        icon: <SwapHorizIcon />,
      },
      {
        label: t("nav.myApplications"),
        href: "/application",
        icon: <AssignmentOutlinedIcon />,
      },
      {
        label: t("nav.settings"),
        href: "/settings",
        icon: <SettingsIcon />,
      },
    ];
  }

  return [
    {
      label: t("nav.home"),
      href: "/app",
      icon: <HomeIcon />,
    },
    {
      label: t("nav.findApprenticeship"),
      href: "/stillinger",
      icon: <SearchIcon />,
    },
    {
      label: t("nav.myApplications"),
      href: "/application",
      icon: <AssignmentOutlinedIcon />,
    },
    {
      label: t("nav.history"),
      href: "/historikk",
      icon: <HistoryIcon />,
    },
    {
      label: t("nav.profile"),
      href: "/profil",
      icon: <PersonIcon />,
    },
    {
      label: t("nav.settings"),
      href: "/settings",
      icon: <SettingsIcon />,
    },
  ];
}

export default function NavbarAPP({
  appName = "Lærling Link",
  userName,
  userRole,
  profileImage,
  initials,
  navItems,
  onRoleChange,
  children,
}: NavbarAPPProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem(SIDEBAR_STORAGE_KEY) === "true",
  );
  const [userMenuAnchor, setUserMenuAnchor] =
    useState<null | HTMLElement>(null);

  useEffect(() => {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, String(collapsed));
  }, [collapsed]);

  const defaultNavItems = useDefaultNavItems(userRole);
  const resolvedNavItems = navItems ?? defaultNavItems;

  const roleColor =
    userRole === "Elev"
      ? theme.palette.secondary.main
      : theme.palette.primary.main;

  const handleLogout = () => {
    setUserMenuAnchor(null);
    navigate("/");
  };

  const handleRoleSwitch = (role: UserRole) => {
    setUserMenuAnchor(null);
    onRoleChange?.(role);
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
          height: NAVBAR_HEIGHT,
          flexShrink: 0,
          width: "100%",
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <Toolbar
          sx={{
            height: NAVBAR_HEIGHT,
            minHeight: `${NAVBAR_HEIGHT}px !important`,
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
              src={profileImage ?? undefined}
              alt={userName ?? undefined}
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
              {initials ?? ""}
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: "flex", flex: 1, minHeight: 0 }}>
        <Sidebar
          collapsed={collapsed}
          navItems={resolvedNavItems}
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
              minWidth: 220,
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
          {t("settings.title")}
        </MenuItem>

        {onRoleChange && (
          <>
            <Divider sx={{ borderColor: "divider" }} />

            <MenuItem
              disabled={userRole === "Elev"}
              sx={{
                color: "text.primary",
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
              onClick={() => handleRoleSwitch("Elev")}
            >
              <ListItemIcon>
                <SchoolIcon sx={{ color: "secondary.main" }} />
              </ListItemIcon>
              {t("nav.switchToStudent", "Bytt til elevvisning")}
            </MenuItem>

            <MenuItem
              disabled={userRole === "Bedrift"}
              sx={{
                color: "text.primary",
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
              onClick={() => handleRoleSwitch("Bedrift")}
            >
              <ListItemIcon>
                <SwapHorizIcon sx={{ color: "primary.main" }} />
              </ListItemIcon>
              {t("nav.switchToBusiness", "Bytt til bedriftsvisning")}
            </MenuItem>
          </>
        )}

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
          {t("nav.login")}
        </MenuItem>
      </Menu>
    </Box>
  );
}
