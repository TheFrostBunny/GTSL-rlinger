import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

type Person = {
  id: number;
  name: string;
  role: string;
  country: string;
  imageUrl: string;
  bio: string;
};

const AdminPeoplePanel = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    role: "",
    country: "",
    imageUrl: "",
    bio: "",
  });

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleAddPerson = () => {
    if (!form.name.trim()) return;

    setPeople((previous) => [
      ...previous,
      {
        id: Date.now(),
        ...form,
      },
    ]);

    setForm({
      name: "",
      role: "",
      country: "",
      imageUrl: "",
      bio: "",
    });

    setOpen(false);
  };

  const handleDelete = (id: number) => {
    setPeople((previous) => previous.filter((person) => person.id !== id));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: { xs: 2, md: 4 },
        background: "#08101d",
        color: "#edf2ff",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        mb={4}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            gap: 2,
            mb: 4,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{ fontWeight: 800 }}
            >
              Personer
            </Typography>

            <Typography sx={{ color: "#99a6c7", mt: 1 }}>
              Legg til og administrer personer i bedriften.
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
            sx={{ borderRadius: 999, px: 3 }}
          >
            Legg til person
          </Button>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
          sx={{ borderRadius: 999, px: 3 }}
        >
          Legg til person
        </Button>
      </Stack>

      {people.length === 0 ? (
        <Box
          sx={{
            p: 5,
            textAlign: "center",
            borderRadius: 4,
            background: "rgba(15, 23, 42, .92)",
            border: "1px solid rgba(164, 80, 195, .18)",
          }}
        >
          <Typography sx={{ color: "#9ca3d1" }}>
            Ingen personer lagt til ennå.
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {people.map((person) => (
            <Card
              key={person.id}
              sx={{
                height: "100%",
                overflow: "hidden",
                borderRadius: 4,
                color: "#edf2ff",
                background: "rgba(15, 23, 42, .94)",
                border: "1px solid rgba(164, 80, 195, .18)",
              }}
            >
              {person.imageUrl ? (
                <CardMedia
                  component="img"
                  height="240"
                  image={person.imageUrl}
                  alt={person.name}
                />
              ) : (
                <Box
                  sx={{
                    height: 240,
                    display: "grid",
                    placeItems: "center",
                    background:
                      "linear-gradient(135deg, #7437b6, #260a24)",
                  }}
                >
                  <Avatar sx={{ width: 90, height: 90, fontSize: 36 }}>
                    {person.name.slice(0, 2).toUpperCase()}
                  </Avatar>
                </Box>
              )}

              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700 }}
                    >
                      {person.name}
                    </Typography>

                    <Typography sx={{ color: "#9ca3d1" }}>
                      {person.role || "Ingen rolle"} ·{" "}
                      {person.country || "Ukjent land"}
                    </Typography>
                  </Box>

                  <IconButton
                    color="error"
                    onClick={() => handleDelete(person.id)}
                    aria-label={`Slett ${person.name}`}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>

                <Typography sx={{ mt: 2, color: "#d3c9ee" }}>
                  {person.bio || "Ingen beskrivelse lagt til."}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Legg til person</DialogTitle>

        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 1,
            }}
          >
            <TextField
              label="Navn"
              value={form.name}
              onChange={(event) => handleChange("name", event.target.value)}
              required
              fullWidth
            />

            <TextField
              label="Rolle"
              value={form.role}
              onChange={(event) => handleChange("role", event.target.value)}
              fullWidth
            />

            <TextField
              label="Land"
              value={form.country}
              onChange={(event) => handleChange("country", event.target.value)}
              fullWidth
            />

            <TextField
              label="Bilde-URL"
              value={form.imageUrl}
              onChange={(event) => handleChange("imageUrl", event.target.value)}
              fullWidth
            />

            <TextField
              label="Beskrivelse"
              value={form.bio}
              onChange={(event) => handleChange("bio", event.target.value)}
              multiline
              minRows={3}
              fullWidth
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Avbryt</Button>
          <Button variant="contained" onClick={handleAddPerson}>
            Lagre person
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminPeoplePanel;