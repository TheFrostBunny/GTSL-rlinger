import { useState } from "react";
import type { FormEvent, SyntheticEvent } from "react";
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
    mb: 1,

    "& .MuiInputLabel-root": {
      color: "text.secondary",
    },

    "& .MuiInputLabel-root.Mui-focused":
      {
        color: "primary.main",
      },

    "& .MuiOutlinedInput-root": {
      color: "text.primary",

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

    "& .MuiInputBase-input": {
      color: "text.primary",
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
          Opprett konto
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            mb: 3,
          }}
        >
          {isCompany
            ? "Registrer bedriften din på LærlingMatch"
            : "Opprett en lærlingprofil på LærlingMatch"}
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
            label="For lærlinger"
          />

          <Tab
            value="company"
            label="For bedrifter"
          />
        </Tabs>

        {isCompany && (
          <TextField
            fullWidth
            required
            label="Bedriftsnavn"
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
              ? "Navn på kontaktperson"
              : "Navn"
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
          label="E-post"
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
          label="Passord"
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
          label="Bekreft passord"
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
            ? "Opprett bedriftskonto"
            : "Opprett lærlingkonto"}
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
          Har du allerede konto?
          Logg inn
        </Button>
      </Paper>
    </Box>
  );
}