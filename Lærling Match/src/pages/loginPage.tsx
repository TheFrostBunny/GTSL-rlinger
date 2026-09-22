import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useCreateStudentMutation } from "../generated/graphql";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [{ fetching }, createStudent] = useCreateStudentMutation();
  const handleSubmit =  async () => {
    await createStudent({
        input: {
          email: email,
          password: password,
        },
    })

    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userEmail", email);
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
        <Typography
          variant="h4"
          sx={{ fontWeight: 800, mb: 1 }}
        >
          Logg inn
        </Typography>

        <Typography
          sx={{ color: "text.secondary", mb: 3 }}
        >
          Logg inn på Lærling Link
        </Typography>

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

        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{ mt: 3, py: 1.4 }}
        >
          Logg inn
        </Button>

        <Button
          fullWidth
          variant="text"
          sx={{ mt: 1 }}
          onClick={() => navigate("/registrer")}
          loading={fetching}
        >
          Opprett konto
        </Button>
      </Paper>
    </Box>
  );
}