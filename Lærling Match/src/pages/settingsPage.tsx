import { useState } from "react";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import NavbarAPP from "../components/layout/NavbarApp";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

export default function SettingsPage() {
  const { t, i18n } = useTranslation();

  const [notifications] = useState(
    localStorage.getItem("notifications") !== "false",
  );
  const [language, setLanguage] = useState(
    localStorage.getItem("language") ?? i18n.language ?? "no",
  );

  const saveSettings = () => {
    localStorage.setItem("notifications", String(notifications));
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    localStorage.setItem("language", value);
    void i18n.changeLanguage(value);
  };

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

  return (
    <NavbarAPP
      appName="Lærling Link"
      userName="Ola Nordmann"
      userRole="Elev"
      initials="ON"
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

          <Stack spacing={3}>

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
                onChange={(event) =>
                  handleLanguageChange(event.target.value)
                }
              >
                <MenuItem value="no">{t("settings.norwegian")}</MenuItem>
                <MenuItem value="en">{t("settings.english")}</MenuItem>
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