import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passordene må være like.");
      return;
    }

    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);

    navigate("/app");
  };

  const fieldSx = {
    mb: 1,
    "& .MuiInputLabel-root": {
      color: "text.secondary",
    },
    "& .MuiInputLabel-root.Mui-focused": {
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
        bgcolor: "background.default",
        px: 2,
      }}
    >
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: 440,
          p: { xs: 3, sm: 5 },
          bgcolor: "background.paper",
          color: "text.primary",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
          Opprett konto
        </Typography>

        <Typography sx={{ color: "text.secondary", mb: 3 }}>
          Opprett en konto på Lærling Link
        </Typography>

        <TextField
          fullWidth
          required
          label="Navn"
          value={name}
          onChange={(event) => setName(event.target.value)}
          sx={fieldSx}
        />

        <TextField
          fullWidth
          required
          type="email"
          label="E-post"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          sx={fieldSx}
        />

        <TextField
          fullWidth
          required
          type="password"
          label="Passord"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          sx={fieldSx}
        />

        <TextField
          fullWidth
          required
          type="password"
          label="Bekreft passord"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          error={Boolean(error)}
          helperText={error}
          sx={fieldSx}
        />

        <Button fullWidth type="submit" variant="contained" sx={{ mt: 3, py: 1.4 }}>
          Opprett konto
        </Button>

        <Button
          fullWidth
          variant="text"
          sx={{ mt: 1 }}
          onClick={() => navigate("/login")}
        >
          Har du allerede konto? Logg inn
        </Button>
      </Paper>
    </Box>
  );
}