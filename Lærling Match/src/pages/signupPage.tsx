import { useState } from "react";
import type { FormEvent, SyntheticEvent } from "react";
import { useTranslation } from "react-i18next"; 
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

type AccountType = "apprentice" | "company";

export default function SignUp() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [searchParams, setSearchParams] =
    useSearchParams();

  const accountType: AccountType =
    searchParams.get("type") === "company"
      ? "company"
      : "apprentice";

  const isCompany = accountType === "company";

  const [name, setName] = useState("");
  const [companyName, setCompanyName] =
    useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [error, setError] = useState("");

  const handleTabChange = (
    _: SyntheticEvent,
    newValue: AccountType,
  ) => {
    setSearchParams({
      type: newValue,
    });

    setError("");
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError(
        "Passordene må være like.",
      );

      return;
    }

    if (
      isCompany &&
      !companyName.trim()
    ) {
      setError(
        "Bedriftsnavn må fylles ut.",
      );

      return;
    }

    localStorage.setItem(
      "isAuthenticated",
      "true",
    );

    localStorage.setItem(
      "accountType",
      accountType,
    );

    localStorage.setItem(
      "userName",
      name.trim(),
    );

    localStorage.setItem(
      "userEmail",
      email.trim(),
    );

    if (isCompany) {
      localStorage.setItem(
        "companyName",
        companyName.trim(),
      );
    } else {
      localStorage.removeItem(
        "companyName",
      );
    }

    navigate("/app");
  };

  const fieldSx = {
    mb: 2,
    "& .MuiInputLabel-root": {
      color: "#b8c7dc",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#c084fc",
    },
    "& .MuiOutlinedInput-root": {
      color: "#ffffff",
      backgroundColor: "#202b3b",
      borderRadius: 2,
      "& fieldset": {
        borderColor: "#40506a",
      },
      "&:hover fieldset": {
        borderColor: "#a05fc0",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#c084fc",
        borderWidth: 2,
      },
    },
    "& .MuiInputBase-input": {
      color: "#ffffff",
      WebkitTextFillColor: "#ffffff",
    },
    "& .MuiInputBase-input::placeholder": {
      color: "#9fb0c7",
      opacity: 1,
    },
    "& input:-webkit-autofill": {
      WebkitTextFillColor: "#ffffff",
      WebkitBoxShadow: "0 0 0 100px #202b3b inset",
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",

        display: "grid",
        placeItems: "center",

        bgcolor:
          "background.default",

        px: 2,
        py: 5,
      }}
    >
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: 440,

          p: {
            xs: 3,
            sm: 5,
          },

          bgcolor:
            "background.paper",

          color: "text.primary",

          border: "1px solid",
          borderColor: "divider",

          borderRadius: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            mb: 1,
          }}
        >
          {isCompany ? t("Opprett konto for bedrifter") : t("Opprett konto")}
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            mb: 3,
          }}
        >
          {isCompany
            ? t("Registrer bedriften din på LærlingMatch")
            : t("Opprett en lærlingprofil på LærlingMatch")}
        </Typography>

        <Tabs
          value={accountType}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            mb: 4,

            borderBottom:
              "1px solid",

            borderColor:
              "divider",

            "& .MuiTab-root": {
              textTransform: "none",

              fontWeight: 700,

              fontSize:
                "0.95rem",
            },
          }}
        >
          <Tab
            value="apprentice"
            label={t("For lærlinger")}
          />

          <Tab
            value="company"
            label={t("For bedrifter")}
          />
        </Tabs>

        {isCompany && (
          <TextField
            fullWidth
            required
            label={t("Bedriftsnavn")}
            value={companyName}
            onChange={(event) =>
              setCompanyName(
                event.target.value,
              )
            }
            sx={fieldSx}
          />
        )}

        <TextField
          fullWidth
          required
          label={
            isCompany
              ? t("signup.NavnOn")
              : t("Navn")
          }
          value={name}
          onChange={(event) =>
            setName(
              event.target.value,
            )
          }
          sx={fieldSx}
        />

        <TextField
          fullWidth
          required
          type="email"
          label={t("signup.epost")}
          value={email}
          onChange={(event) =>
            setEmail(
              event.target.value,
            )
          }
          sx={fieldSx}
        />

        <TextField
          fullWidth
          required
          type="password"
          label={t("signup.passord")}
          value={password}
          onChange={(event) =>
            setPassword(
              event.target.value,
            )
          }
          sx={fieldSx}
        />

        <TextField
          fullWidth
          required
          type="password"
          label={t("signup.bekreftPassord")}
          value={confirmPassword}
          onChange={(event) =>
            setConfirmPassword(
              event.target.value,
            )
          }
          error={Boolean(error)}
          helperText={error}
          sx={fieldSx}
        />

        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{
            mt: 3,
            py: 1.4,

            textTransform: "none",
            fontWeight: 700,
          }}
        >
          {isCompany
            ? t("signup.opprettBedriftskonto")
            : t("signup.opprettLærlingkonto")}
        </Button>

        <Button
          fullWidth
          type="button"
          variant="text"
          sx={{
            mt: 1,
            textTransform: "none",
          }}
          onClick={() =>
            navigate("/login")
          }
        >
          {t("signup.harDuAlleredeKonto")}
          {t("signup.loggInn")}
        </Button>
      </Paper>
    </Box>
  );
}