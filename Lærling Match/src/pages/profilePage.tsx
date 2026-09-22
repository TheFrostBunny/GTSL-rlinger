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
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import NavbarAPP from "../components/layout/NavbarApp";
import { useDemoStudent } from "../data/useDemoStudent";
import type { DemoStudent } from "../data/types";

export default function Profile() {
  const { t } = useTranslation();

  const { student, saveStudent } = useDemoStudent();

  const [draftProfile, setDraftProfile] = useState<DemoStudent | undefined>(
    student,
  );

  const [editing, setEditing] = useState(false);
  const [interestInput, setInterestInput] = useState("");
  const [userRole, setUserRole] = useState<"Elev" | "Bedrift">("Elev");

  const inputSx = {
    "& .MuiInputBase-input": {
      color: "text.primary",
    },
    "& .MuiInputBase-input::placeholder": {
      color: "text.secondary",
      opacity: 1,
    },
    "& .MuiInputLabel-root": {
      color: "text.secondary",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "primary.main",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "divider",
      },
      "&:hover fieldset": {
        borderColor: "primary.main",
      },
      "&.Mui-focused fieldset": {
        borderColor: "primary.main",
      },
    },
  };

  if (!student) {
    return (
      <NavbarAPP
        appName={t("app.name")}
        userRole={userRole}
        onRoleChange={setUserRole}
      >
        <Typography sx={{ color: "text.primary" }}>
          Fant ingen bruker.
        </Typography>
      </NavbarAPP>
    );
  }

  const currentDraft = draftProfile ?? student;

  const interests = student.description
    .split(",")
    .map((interest) => interest.trim())
    .filter(Boolean);

  const draftInterests = currentDraft.description
    .split(",")
    .map((interest) => interest.trim())
    .filter(Boolean);

  const updateDraftProfile = (
    field: keyof DemoStudent,
    value: string,
  ) => {
    setDraftProfile((current) => ({
      ...(current ?? student),
      [field]: value,
    }));
  };

  const addInterest = () => {
    const interest = interestInput.trim();

    if (!interest) return;

    const newInterests = [...draftInterests, interest];

    updateDraftProfile("description", newInterests.join(", "));
    setInterestInput("");
  };

  const startEditing = () => {
    setDraftProfile(student);
    setInterestInput("");
    setEditing(true);
  };

  const cancelEditing = () => {
    setDraftProfile(student);
    setInterestInput("");
    setEditing(false);
  };

  const saveProfile = () => {
    saveStudent(currentDraft);
    setInterestInput("");
    setEditing(false);
  };

  return (
    <NavbarAPP
      appName={t("app.name")}
      userName={student.name}
      userRole={userRole}
      onRoleChange={setUserRole}
      profileImage={student.profileImage}
      initials={student.name
        .split(" ")
        .map((name) => name[0])
        .join("")
        .slice(0, 2)}
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
              src={student.profileImage ?? ""}
              sx={{
                width: 100,
                height: 100,
                bgcolor: "primary.main",
              }}
            >
              {student.name
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
                  {editing ? currentDraft.name : student.name}
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

            {/* Navn */}

            <Box sx={{ width: "100%" }}>
              <Typography
                sx={{
                  color: "text.secondary",
                  mb: 0.5,
                }}
              >
                {t("profile.name")}
              </Typography>

              {editing ? (
                <TextField
                  fullWidth
                  sx={inputSx}
                  label={t("profile.name")}
                  value={currentDraft.name}
                  onChange={(event) =>
                    updateDraftProfile("name", event.target.value)
                  }
                />
              ) : (
                <Typography
                  sx={{
                    color: "text.primary",
                    fontWeight: 600,
                  }}
                >
                  {student.name}
                </Typography>
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
                  sx={inputSx}
                  label={t("profile.email")}
                  type="email"
                  value={currentDraft.email}
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
                  {student.email}
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
                  sx={inputSx}
                  label={t("profile.fieldOfStudy")}
                  value={currentDraft.wantedTrade}
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
                  {student.wantedTrade}
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
                  sx={inputSx}
                  label={t("profile.aboutMe")}
                  value={currentDraft.description}
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
                  {student.description}
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
                  onInputChange={(_, newInputValue) => {
                    setInterestInput(newInputValue);
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
                        color: "secondary.main",
                        backgroundColor: "action.hover",
                        border: "1px solid",
                        borderColor: "divider",
                      },
                    },
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{
                        ...inputSx,
                        "& .MuiFormHelperText-root": {
                          color: "text.secondary",
                        },
                      }}
                      label={t("profile.interests")}
                      placeholder={t("profile.addInterest")}
                      helperText={t("profile.pressSpaceToAdd")}
                      onKeyDown={(event) => {
                        if (event.key === " ") {
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
                  {interests.map((interest: string) => (
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
                  sx={inputSx}
                  label={t("profile.residence")}
                  value={currentDraft.location}
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
                  {student.location}
                </Typography>
              )}
            </Box>

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