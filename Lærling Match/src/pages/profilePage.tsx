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
import { StudentFragment, useGetMeQuery } from "../generated/graphql";


export default function Profile() {
  const { t } = useTranslation();

  const [{data}] = useGetMeQuery();
  const me = data?.me

  const [profile, setProfile] =
    useState<StudentFragment | undefined>(me ?? undefined);

  const [editing, setEditing] = useState(false);

  const [interestInput, setInterestInput] = useState("");

  const interests = profile?.description

  const startEditing = () => {
    setInterestInput("");
    setEditing(true);
  };

  const cancelEditing = () => {
    setInterestInput("");
    setEditing(false);
  };

  const saveProfile = () => {
    const profileToSave = { ...profile };

    setProfile(profileToSave);
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
      userName={profile?.name}
      userRole="Elev"
      profileImage={profile?.profileImage}
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
                  {profile?.name}
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
                  value={profile?.email}
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
                Fagretning
              </Typography>

              {editing ? (
                <TextField
                  fullWidth
                  label="Fagretning"
                  value={profile?.wantedTrade}
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
                Om meg
              </Typography>

              {editing ? (
                <TextField
                  fullWidth
                  multiline
                  minRows={3}
                  label="Om meg"
                  value={profile?.description}
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