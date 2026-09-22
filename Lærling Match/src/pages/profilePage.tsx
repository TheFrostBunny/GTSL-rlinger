import { useState } from "react";
import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import NavbarAPP from "../components/layout/NavbarApp";

type ProfileData = {
  name: string;
  email: string;
  field: string;
  image: string;
  interests: string;
  description: string;
  location: string;
};

const createInitialProfile = (): ProfileData => ({
  name: localStorage.getItem("profile-name") ?? "Ola Nordmann",

  email:
    localStorage.getItem("profile-email") ??
    "ola.nordmann@example.com",

  field:
    localStorage.getItem("profile-field") ??
    "IT-driftsfaget",

  image:
    localStorage.getItem("profile-image") ?? "",

  interests:
    localStorage.getItem("profile-interests") ??
    "Teknologi, programmering, problemløsning",

  description:
    localStorage.getItem("profile-description") ??
    "Jeg er en motivert lærling som liker å lære nye ting og samarbeide med andre.",

  location:
    localStorage.getItem("profile-location") ??
    "Oslo",
});

export default function Profile() {
  const { t } = useTranslation();

  const [profile, setProfile] =
    useState<ProfileData>(createInitialProfile);

  const [draftProfile, setDraftProfile] =
    useState<ProfileData>(profile);

  const [editing, setEditing] = useState(false);

  const [interestInput, setInterestInput] = useState("");

  const updateDraftProfile = (
    key: keyof ProfileData,
    value: string,
  ) => {
    setDraftProfile((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const interests = profile.interests
    .split(",")
    .map((interest) => interest.trim())
    .filter(Boolean);

  const draftInterests = draftProfile.interests
    .split(",")
    .map((interest) => interest.trim())
    .filter(Boolean);

  const addInterest = () => {
    const newInterest = interestInput.trim();

    if (!newInterest) {
      return;
    }

    const alreadyExists = draftInterests.some(
      (interest) =>
        interest.toLowerCase() === newInterest.toLowerCase(),
    );

    if (!alreadyExists) {
      updateDraftProfile(
        "interests",
        [...draftInterests, newInterest].join(", "),
      );
    }

    setInterestInput("");
  };

  const startEditing = () => {
    setDraftProfile(profile);
    setInterestInput("");
    setEditing(true);
  };

  const cancelEditing = () => {
    setDraftProfile(profile);
    setInterestInput("");
    setEditing(false);
  };

  const saveProfile = () => {
    let profileToSave = { ...draftProfile };

    const pendingInterest = interestInput.trim();

    /*
     * Если пользователь что-то написал в поле интересов,
     * но ещё не нажал пробел, сохраняем это тоже.
     */
    if (pendingInterest) {
      const currentInterests = draftProfile.interests
        .split(",")
        .map((interest) => interest.trim())
        .filter(Boolean);

      const alreadyExists = currentInterests.some(
        (interest) =>
          interest.toLowerCase() ===
          pendingInterest.toLowerCase(),
      );

      if (!alreadyExists) {
        profileToSave = {
          ...profileToSave,
          interests: [
            ...currentInterests,
            pendingInterest,
          ].join(", "),
        };
      }
    }

    Object.entries(profileToSave).forEach(
      ([key, value]) => {
        localStorage.setItem(
          `profile-${key}`,
          value,
        );
      },
    );

    setProfile(profileToSave);
    setDraftProfile(profileToSave);

    setInterestInput("");
    setEditing(false);
  };

  const navItems = [
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
  ];

  return (
    <NavbarAPP
      appName={t("app.name")}
      userName={profile.name}
      userRole="Elev"
      profileImage={profile.image}
      initials={profile.name
        .split(" ")
        .map((name) => name[0])
        .join("")
        .slice(0, 2)}
      navItems={navItems}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 900,
          mx: "auto",
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
          Min profil
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            mb: 4,
          }}
        >
          Se og administrer profilinformasjonen din.
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: {
              xs: 3,
              md: 5,
            },

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

              alignItems: {
                xs: "center",
                sm: "flex-start",
              },
            }}
          >
            <Avatar
              src={
                editing
                  ? draftProfile.image
                  : profile.image
              }
              sx={{
                width: 100,
                height: 100,
                bgcolor: "primary.main",
              }}
            >
              {(editing
                ? draftProfile.name
                : profile.name
              )
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
                  sx={{
                    color: "text.primary",
                    fontWeight: 700,
                    fontSize: 24,
                  }}
                >
                  {profile.name}
                </Typography>

                <Typography
                  sx={{
                    color: "text.secondary",
                  }}
                >
                  Elev
                </Typography>
              </Box>

              {!editing && (
                <Tooltip title="Endre profil">
                  <IconButton
                    aria-label="Endre profil"
                    onClick={startEditing}
                    sx={{
                      color: "primary.main",

                      border: "1px solid",
                      borderColor: "divider",

                      "&:hover": {
                        backgroundColor:
                          "action.hover",
                      },
                    }}
                  >
                    <EditOutlinedIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Box>

            {/* E-post */}

            <Box sx={{ width: "100%" }}>
              <Typography
                sx={{
                  color: "text.secondary",
                  mb: 0.5,
                }}
              >
                E-post
              </Typography>

              {editing ? (
                <TextField
                  fullWidth
                  label="E-post"
                  type="email"
                  value={draftProfile.email}
                  onChange={(event) =>
                    updateDraftProfile(
                      "email",
                      event.target.value,
                    )
                  }
                />
              ) : (
                <Typography
                  sx={{
                    color: "text.primary",
                    fontWeight: 600,
                  }}
                >
                  {profile.email}
                </Typography>
              )}
            </Box>

            {/* Fagretning */}

            <Box sx={{ width: "100%" }}>
              <Typography
                sx={{
                  color: "text.secondary",
                  mb: 0.5,
                }}
              >
                Fagretning
              </Typography>

              {editing ? (
                <TextField
                  fullWidth
                  label="Fagretning"
                  value={draftProfile.field}
                  onChange={(event) =>
                    updateDraftProfile(
                      "field",
                      event.target.value,
                    )
                  }
                />
              ) : (
                <Typography
                  sx={{
                    color: "text.primary",
                    fontWeight: 600,
                  }}
                >
                  {profile.field}
                </Typography>
              )}
            </Box>

            {/* Om meg */}

            <Box sx={{ width: "100%" }}>
              <Typography
                sx={{
                  color: "text.secondary",
                  mb: 0.5,
                }}
              >
                Om meg
              </Typography>

              {editing ? (
                <TextField
                  fullWidth
                  multiline
                  minRows={3}
                  label="Om meg"
                  value={draftProfile.description}
                  onChange={(event) =>
                    updateDraftProfile(
                      "description",
                      event.target.value,
                    )
                  }
                />
              ) : (
                <Typography
                  sx={{
                    color: "text.primary",
                  }}
                >
                  {profile.description}
                </Typography>
              )}
            </Box>

            {/* Interesser */}

            <Box sx={{ width: "100%" }}>
              <Typography
                sx={{
                  color: "text.secondary",
                  mb: 1,
                }}
              >
                Interesser
              </Typography>

              {editing ? (
                <Autocomplete<
                  string,
                  true,
                  false,
                  true
                >
                  multiple
                  freeSolo
                  options={[]}
                  value={draftInterests}
                  inputValue={interestInput}
                  onInputChange={(
                    _,
                    newInputValue,
                  ) => {
                    setInterestInput(
                      newInputValue,
                    );
                  }}
                  onChange={(_, newValue) => {
                    updateDraftProfile(
                      "interests",
                      newValue
                        .map((interest) =>
                          interest.trim(),
                        )
                        .filter(Boolean)
                        .join(", "),
                    );
                  }}
                  slotProps={{
                    chip: {
                      sx: {
                        color:
                          "secondary.main",

                        backgroundColor:
                          "action.hover",

                        border: "1px solid",
                        borderColor:
                          "divider",
                      },
                    },
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Interesser"
                      placeholder="Legg til interesse"
                      helperText="Trykk mellomrom for å legge til"
                      onKeyDown={(event) => {
                        if (
                          event.key === " "
                        ) {
                          event.preventDefault();
                          addInterest();
                        }
                      }}
                    />
                  )}
                />
              ) : (
                <Stack
                  direction="row"
                  spacing={1}
                  useFlexGap
                  sx={{
                    flexWrap: "wrap",
                  }}
                >
                  {interests.map(
                    (interest) => (
                      <Chip
                        key={interest}
                        label={interest}
                        sx={{
                          color:
                            "secondary.main",

                          backgroundColor:
                            "action.hover",

                          border:
                            "1px solid",

                          borderColor:
                            "divider",
                        }}
                      />
                    ),
                  )}
                </Stack>
              )}
            </Box>

            {/* Bosted */}

            <Box sx={{ width: "100%" }}>
              <Typography
                sx={{
                  color: "text.secondary",
                  mb: 0.5,
                }}
              >
                Bosted
              </Typography>

              {editing ? (
                <TextField
                  fullWidth
                  label="Bosted"
                  value={draftProfile.location}
                  onChange={(event) =>
                    updateDraftProfile(
                      "location",
                      event.target.value,
                    )
                  }
                />
              ) : (
                <Typography
                  sx={{
                    color: "text.primary",
                  }}
                >
                  {profile.location}
                </Typography>
              )}
            </Box>

            {/* Buttons */}

            {editing && (
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                }}
              >
                <Button
                  type="button"
                  variant="contained"
                  onClick={saveProfile}
                >
                  Lagre profil
                </Button>

                <Button
                  type="button"
                  variant="outlined"
                  onClick={cancelEditing}
                >
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