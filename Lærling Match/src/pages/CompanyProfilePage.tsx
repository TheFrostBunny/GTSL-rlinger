import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import HomeIcon from "@mui/icons-material/Home";
import { useTranslation } from "react-i18next";
import NavbarAPP from "../components/layout/NavbarApp";

const CompanyProfilePage = () => {
  const { t } = useTranslation();

  const [profile, setProfile] = useState({
    name: "GreenTech AS",
    organizationNumber: "123 456 789",
    email: "kontakt@greentech.no",
    phone: "+47 12 34 56 78",
    location: "Oslo",
    description: "Vi tilbyr læreplasser innen IT og teknologi.",
  });

  const [editing, setEditing] = useState(false);
  const [draftProfile, setDraftProfile] = useState(profile);

  const updateDraftProfile = (
    field: keyof typeof draftProfile,
    value: string,
  ) => {
    setDraftProfile((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const startEditing = () => {
    setEditing(true);
    setDraftProfile(profile);
  };

  const cancelEditing = () => {
    setEditing(false);
    setDraftProfile(profile);
  };

  const saveProfile = () => {
    setProfile(draftProfile);
    setEditing(false);
  };

  return (
    <NavbarAPP
      appName={t("app.name")}
      userName={profile.name}
      userRole="Bedrift"
      profileImage=""
      initials="GT"
      navItems={[
        {
          label: t("nav.home"),
          href: "/app",
          icon: <HomeIcon />,
        },
        {
          label: t("nav.businessProfile"),
          href: "/bedriftsprofil",
          icon: <BusinessIcon />,
        },
      ]}
    >
      <Box
        sx={{
          minHeight: "100vh",
          maxWidth: 900,
          mx: "auto",
          p: { xs: 2, md: 4 },
          color: "#1f2937",
        }}
      >
        <Paper
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 3,
            backgroundColor: "#151b2b",
            color: "#f5f7fa",
            border: "1px solid #273449",
          }}
        >
          <Stack spacing={3}>
            <Box sx={{ textAlign: "center" }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  mx: "auto",
                  bgcolor: "#9858ad",
                  color: "#ffffff",
                  fontSize: 36,
                }}
              >
                GT
              </Avatar>

              <Typography
                variant="h4"
                sx={{ mt: 2, fontWeight: 700, color: "#ffffff" }}
              >
                {t("companyProfile.title")}
              </Typography>

              <Typography sx={{ color: "#ffffff" }}>
                {t(
                  "companyProfile.description"
                )}
              </Typography>
            </Box>

            {!editing ? (
              <>
                {[
                  ["Bedriftsnavn", profile.name],
                  ["Organisasjonsnummer", profile.organizationNumber],
                  ["E-post", profile.email],
                  ["Telefon", profile.phone],
                  ["Sted", profile.location],
                  ["Om bedriften", profile.description],
                ].map(([label, value]) => (
                  <Box key={label}>
                    <Typography sx={{ color: "#aebbd0", fontSize: 14 }}>
                      {label}
                    </Typography>
                    <Typography sx={{ color: "#ffffff", fontSize: 17 }}>
                      {value}
                    </Typography>
                  </Box>
                ))}

                <Button
                  variant="contained"
                  size="large"
                  onClick={startEditing}
                >
                  {t("common.edit")}
                </Button>
              </>
            ) : (
              <>
                <TextField
                  label="Bedriftsnavn"
                  value={draftProfile.name}
                  onChange={(event) =>
                    updateDraftProfile("name", event.target.value)
                  }
                  fullWidth
                />

                <TextField
                  label="Organisasjonsnummer"
                  value={draftProfile.organizationNumber}
                  onChange={(event) =>
                    updateDraftProfile("organizationNumber", event.target.value)
                  }
                  fullWidth
                />

                <TextField
                  label="E-post"
                  value={draftProfile.email}
                  onChange={(event) =>
                    updateDraftProfile("email", event.target.value)
                  }
                  fullWidth
                />

                <TextField
                  label="Telefon"
                  value={draftProfile.phone}
                  onChange={(event) =>
                    updateDraftProfile("phone", event.target.value)
                  }
                  fullWidth
                />

                <TextField
                  label="Sted"
                  value={draftProfile.location}
                  onChange={(event) =>
                    updateDraftProfile("location", event.target.value)
                  }
                  fullWidth
                />

                <TextField
                  label="Om bedriften"
                  value={draftProfile.description}
                  onChange={(event) =>
                    updateDraftProfile("description", event.target.value)
                  }
                  multiline
                  minRows={4}
                  fullWidth
                />

                <Stack direction="row" spacing={2}>
                  <Button variant="contained" onClick={saveProfile}>
                    {t("common.save")}
                  </Button>

                  <Button variant="outlined" onClick={cancelEditing}>
                    {t("common.cancel")}
                  </Button>
                </Stack>
              </>
            )}
          </Stack>
        </Paper>
      </Box>
    </NavbarAPP>
  );
};

export default CompanyProfilePage;