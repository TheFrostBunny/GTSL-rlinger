import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import { useTranslation } from "react-i18next";
import NavbarAPP from "../components/layout/NavbarApp";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Chip, Stack } from "@mui/material";

export default function Profile() {
  const { t } = useTranslation();
  const [profile, setProfile] = useState(() => ({
    name: localStorage.getItem("profile-name") ?? "Ola Nordmann",
    email: localStorage.getItem("profile-email") ?? "ola.nordmann@example.com",
    field: localStorage.getItem("profile-field") ?? "IT-driftsfaget",
    image: localStorage.getItem("profile-image") ?? "",
    interests:
      localStorage.getItem("profile-interests") ??
      "Teknologi, programmering og problemløsning",
    description:
      localStorage.getItem("profile-description") ??
      "Jeg er en motivert lærling som liker å lære nye ting og samarbeide med andre.",
    location: localStorage.getItem("profile-location") ?? "Oslo",
  }));
  const [editing, setEditing] = useState(false);

  const updateProfile = (key: keyof typeof profile, value: string) => {
    setProfile((current) => ({ ...current, [key]: value }));
  };

  const saveProfile = () => {
    Object.entries(profile).forEach(([key, value]) => {
      localStorage.setItem(`profile-${key}`, value);
    });
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
  ];

  return (
    <NavbarAPP
      appName={t("app.name")}
      userName="Ola Nordmann"
      userRole="Elev"
      profileImage="/profile.jpg"
      initials="ON"
      navItems={navItems}
    >
      <Box sx={{ width: "100%", maxWidth: 900, mx: "auto" }}>
        <Typography
          variant="h3"
          sx={{ color: "text.primary", fontWeight: 800, mb: 1 }}
        >
          Min profil
        </Typography>

        <Typography sx={{ color: "text.secondary", mb: 4 }}>
          Se og administrer profilinformasjonen din.
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 3,
            backgroundColor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              alignItems: { xs: "center", sm: "flex-start" },
            }}
          >
            <Avatar
              src={profile.image}
              sx={{ width: 100, height: 100, bgcolor: "primary.main" }}
            >
              {profile.name
                .split(" ")
                .map((name) => name[0])
                .join("")
                .slice(0, 2)}
            </Avatar>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <Box>
                <Typography
                  sx={{ color: "text.primary", fontWeight: 700, fontSize: 24 }}
                >
                  {profile.name}
                </Typography>

                <Typography sx={{ color: "text.secondary" }}>
                  Elev
                </Typography>
              </Box>

              {!editing && (
                <Tooltip title="Endre profil">
                  <IconButton
                    aria-label="Endre profil"
                    onClick={() => setEditing(true)}
                    sx={{
                      color: "primary.main",
                      border: "1px solid",
                      borderColor: "divider",
                      "&:hover": {
                        backgroundColor: "action.hover",
                      },
                    }}
                  >
                    <EditOutlinedIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Box>

            <Box sx={{ width: "100%" }}>
              <Typography sx={{ color: "text.secondary", mb: 0.5 }}>
                E-post
              </Typography>
              {editing ? (
                <TextField
                  fullWidth
                  label="E-post"
                  type="email"
                  value={profile.email}
                  onChange={(event) => updateProfile("email", event.target.value)}
                />
              ) : (
                <Typography sx={{ color: "text.primary", fontWeight: 600 }}>
                  {profile.email}
                </Typography>
              )}
            </Box>

            <Box sx={{ width: "100%" }}>
              <Typography sx={{ color: "text.secondary", mb: 0.5 }}>
                Fagretning
              </Typography>
              {editing ? (
                <TextField
                  fullWidth
                  label="Fagretning"
                  value={profile.field}
                  onChange={(event) => updateProfile("field", event.target.value)}
                />
              ) : (
                <Typography sx={{ color: "text.primary", fontWeight: 600 }}>
                  {profile.field}
                </Typography>
              )}
            </Box>

            <Box sx={{ width: "100%" }}>
              <Typography sx={{ color: "text.secondary", mb: 0.5 }}>
                Om meg
              </Typography>
              {editing ? (
                <TextField
                  fullWidth
                  multiline
                  minRows={3}
                  value={profile.description}
                  onChange={(event) =>
                    updateProfile("description", event.target.value)
                  }
                />
              ) : (
                <Typography sx={{ color: "text.primary" }}>
                  {profile.description}
                </Typography>
              )}
            </Box>

            <Box sx={{ width: "100%" }}>
              <Typography sx={{ color: "text.secondary", mb: 1 }}>
                Interesser
              </Typography>

              {editing ? (
                <TextField
                  fullWidth
                  label="Interesser"
                  value={profile.interests}
                  onChange={(event) =>
                    updateProfile("interests", event.target.value)
                  }
                  helperText="Skill interessene med komma"
                />
              ) : (
                <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
                  {profile.interests
                    .split(",")
                    .map((interest) => interest.trim())
                    .filter(Boolean)
                    .map((interest) => (
                      <Chip
                        key={interest}
                        label={interest}
                        sx={{
                          color: "secondary.main",
                          backgroundColor: "action.hover",
                          border: "1px solid",
                          borderColor: "divider",
                        }}
                      />
                    ))}
                </Stack>
              )}
            </Box>

            <Box sx={{ width: "100%" }}>
              <Typography sx={{ color: "text.secondary", mb: 0.5 }}>
                Bosted
              </Typography>
              {editing ? (
                <TextField
                  fullWidth
                  label="Bosted"
                  value={profile.location}
                  onChange={(event) =>
                    updateProfile("location", event.target.value)
                  }
                />
              ) : (
                <Typography sx={{ color: "text.primary" }}>
                  {profile.location}
                </Typography>
              )}
            </Box>

            {editing && (
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => {
                    saveProfile();
                    setEditing(false);
                  }}
                >
                  Lagre profil
                </Button>

                <Button variant="outlined" onClick={() => setEditing(false)}>
                  Avbryt
                </Button>
              </Box>
            )}
          </Box>
        </Paper>
      </Box>
    </NavbarAPP>
  );
}