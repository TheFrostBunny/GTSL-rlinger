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
import SettingsIcon from "@mui/icons-material/Settings";
import NavbarAPP from "../components/layout/NavbarApp";
import { StudentFragment, useGetMeQuery } from "../generated/graphql";


export default function Profile() {
  const { t } = useTranslation();

  const [{ data }] = useGetMeQuery();
  const me: StudentFragment | undefined = data?.me ?? undefined;

  const [profile, setProfile] =
    useState<StudentFragment | undefined>(undefined);

  const [draftProfile, setDraftProfile] =
    useState<StudentFragment | undefined>(undefined);

  const [editing, setEditing] = useState(false);
  const [interestInput, setInterestInput] = useState("");

  const displayedProfile = profile ?? me;

  const interests = (displayedProfile?.description ?? "")
    .split(",")
    .map((interest) => interest.trim())
    .filter(Boolean);

  const draftInterests = (draftProfile?.description ?? "")
    .split(",")
    .map((interest) => interest.trim())
    .filter(Boolean);

  const updateDraftProfile = (
    field: keyof StudentFragment,
    value: string,
  ) => {
    setDraftProfile((current) =>
      current
        ? {
            ...current,
            [field]: value,
          }
        : current,
    );
  };

  const addInterest = () => {
    const interest = interestInput.trim();

    if (!interest || !draftProfile) return;

    const interests = [
      ...draftInterests,
      interest,
    ];

    updateDraftProfile(
      "description",
      interests.join(", "),
    );

    setInterestInput("");
  };

  const startEditing = () => {
    setDraftProfile(displayedProfile);
    setInterestInput("");
    setEditing(true);
  };

  const cancelEditing = () => {
    setDraftProfile(displayedProfile);
    setInterestInput("");
    setEditing(false);
  };

  const saveProfile = () => {
    if (!draftProfile) return;

    setProfile(draftProfile);
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
    {
      label: t("nav.settings"),
      href: "/settings",
      icon: <SettingsIcon />,
    }
  ];

  return (
    <NavbarAPP
      appName={t("app.name")}
      userName={displayedProfile?.name}
      userRole="Elev"
      profileImage={displayedProfile?.profileImage}
      initials={profile?.name && profile.name
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
          {t("profile.myProfile")}
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            mb: 4,
          }}
        >
          {t("profile.manageYourProfileInformation")}
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
                profile?.profileImage ?? ""
              }
              sx={{
                width: 100,
                height: 100,
                bgcolor: "primary.main",
              }}
            >
              {profile?.name && profile?.name
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
                  {editing ? draftProfile?.name : profile?.name}
                </Typography>

                <Typography
                  sx={{
                    color: "text.secondary",
                  }}
                >
                  {t("profile.student")}
                </Typography>
              </Box>

              {!editing && (
                <Tooltip title={t("profile.editProfile")}>
                  <IconButton
                    aria-label={t("profile.editProfile")}
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
                {t("profile.email")}
              </Typography>

              {editing ? (
                <TextField
                  fullWidth
                  label={t("profile.email")}
                  type="email"
                  value={draftProfile?.email ?? ""}
                  onChange={(event) =>
                    updateDraftProfile("email", event.target.value)
                  }
                />
              ) : (
                <Typography
                  sx={{
                    color: "text.primary",
                    fontWeight: 600,
                  }}
                >
                  {profile?.email}
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
                {t("profile.fieldOfStudy")}
              </Typography>

              {editing ? (
                <TextField
                  fullWidth
                  label={t("profile.fieldOfStudy")}
                  value={draftProfile?.wantedTrade ?? ""}
                  onChange={(event) =>
                    updateDraftProfile("wantedTrade", event.target.value)
                  }
                />
              ) : (
                <Typography
                  sx={{
                    color: "text.primary",
                    fontWeight: 600,
                  }}
                >
                  {profile?.wantedTrade}
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
                {t("profile.aboutMe")}
              </Typography>

              {editing ? (
                <TextField
                  fullWidth
                  multiline
                  minRows={3}
                  label={t("profile.aboutMe")}
                  value={draftProfile?.description ?? ""}
                  onChange={(event) =>
                    updateDraftProfile("description", event.target.value)
                  }
                />
              ) : (
                <Typography
                  sx={{
                    color: "text.primary",
                  }}
                >
                  {profile?.description}
                </Typography>
              )}
            </Box>
            <Box sx={{ width: "100%" }}>
              <Typography
                sx={{
                  color: "text.secondary",
                  mb: 1,
                }}
              >
                {t("profile.interests")}
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
                      "description",
                      newValue
                        .map((interest) => interest.trim())
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
                      label={t("profile.interests")}
                      placeholder={t("profile.addInterest")}
                      helperText={t("profile.pressSpaceToAdd")}
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
                    (interest: string) => (
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
                    ),
                  )}
                </Stack>
              )}
            </Box>

            <Box sx={{ width: "100%" }}>
              <Typography
                sx={{
                  color: "text.secondary",
                  mb: 0.5,
                }}
              >
                {t("profile.residence")}
              </Typography>

              {editing ? (
                <TextField
                  fullWidth
                  label={t("profile.residence")}
                  value={draftProfile?.location ?? ""}
                  onChange={(event) =>
                    updateDraftProfile("location", event.target.value)
                  }
                />
              ) : (
                <Typography
                  sx={{
                    color: "text.primary",
                  }}
                >
                  {profile?.location ?? ""}
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
                  {t("profile.saveProfile")}
                </Button>

                <Button
                  type="button"
                  variant="outlined"
                  onClick={cancelEditing}
                >
                  {t("profile.cancel")}
                </Button>
              </Box>
            )}
          </Box>
        </Paper>
      </Box>
    </NavbarAPP>
  );
}