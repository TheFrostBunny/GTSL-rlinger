import { useState } from "react";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import NavbarAPP from "../components/layout/NavbarApp";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

export default function SettingsPage() {
  const { t, i18n } = useTranslation();

  const [notifications, setNotifications] = useState(
    localStorage.getItem("notifications") !== "false",
  );
  const [language, setLanguage] = useState(
    localStorage.getItem("language") ?? i18n.language ?? "no",
  );
  const [themeMode, setThemeMode] = useState(
    localStorage.getItem("theme") ?? "dark",
  );

  const saveSettings = () => {
    localStorage.setItem("notifications", String(notifications));
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    localStorage.setItem("language", value);
    void i18n.changeLanguage(value);
  };

  const handleThemeChange = (value: string) => {
    setThemeMode(value);
    localStorage.setItem("theme", value);
    window.dispatchEvent(new Event("theme-change"));
  };

  const navItems = [
    { label: t("nav.home"), href: "/app", icon: <HomeIcon /> },
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
      label: t("settings.title"),
      href: "/settings",
      icon: <SettingsIcon />,
    },
  ];

  const selectSx = {
    color: "text.primary",
    backgroundColor: "background.paper",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "divider",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "primary.main",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "primary.main",
    },
    "& .MuiSvgIcon-root": {
      color: "text.primary",
    },
  };

  const menuProps = {
    MenuListProps: {
      dense: true,
    },
    PaperProps: {
      sx: {
        backgroundColor: "background.paper",
        color: "text.primary",
        border: "1px solid",
        borderColor: "divider",
        "& .MuiMenuItem-root": {
          color: "text.primary",
          "&:hover": {
            backgroundColor: "action.hover",
          },
          "&.Mui-selected": {
            backgroundColor: "primary.main",
            color: "primary.contrastText",
          },
          "&.Mui-selected:hover": {
            backgroundColor: "primary.dark",
          },
        },
      },
    },
  };

  return (
    <NavbarAPP
      appName="Lærling Link"
      userName="Ola Nordmann"
      userRole="Elev"
      initials="ON"
      navItems={navItems}
    >
      <Box sx={{ width: "100%", maxWidth: 900, mx: "auto" }}>
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            p: { xs: 2, sm: 4 },
            borderRadius: 3,
            backgroundColor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            color: "text.primary",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: "text.primary",
              fontWeight: 800,
              mb: 1,
            }}
          >
            {t("settings.title")}
          </Typography>

          <Typography sx={{ color: "text.secondary", mb: 4 }}>
            {t("settings.description")}
          </Typography>

          <Stack spacing={3}>
            <Box>
              <Typography sx={{ color: "text.primary", fontWeight: 700 }}>
                {t("settings.notifications")}
              </Typography>

              <Typography sx={{ color: "text.secondary", mt: 0.5 }}>
                {t("settings.notificationsDescription")}
              </Typography>
            </Box>

            <FormControl
              fullWidth
              sx={{
                "& .MuiInputLabel-root": {
                  color: "text.secondary",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "primary.main",
                },
              }}
            >
              <InputLabel>{t("settings.language")}</InputLabel>
              <Select
                value={language}
                label="Språk"
                sx={selectSx}
                MenuProps={menuProps}
                onChange={(event) =>
                  handleLanguageChange(event.target.value)
                }
              >
                <MenuItem value="no">{t("settings.norwegian")}</MenuItem>
                <MenuItem value="en">{t("settings.english")}</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              fullWidth
              sx={{
                "& .MuiInputLabel-root": {
                  color: "text.secondary",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "primary.main",
                },
              }}
            >
              <InputLabel>{t("settings.theme")}</InputLabel>
              <Select
                value={themeMode}
                label={t("settings.theme")}
                sx={selectSx}
                MenuProps={menuProps}
                onChange={(event) =>
                  handleThemeChange(event.target.value)
                }
              >
                <MenuItem value="dark">{t("settings.dark")}</MenuItem>
                <MenuItem value="light">{t("settings.light")}</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              onClick={saveSettings}
              sx={{ alignSelf: "flex-start" }}
            >
              {t("settings.save")}
            </Button>
          </Stack>
        </Paper>
      </Box>
    </NavbarAPP>
  );
}