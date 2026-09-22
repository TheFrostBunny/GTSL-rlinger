import { useMemo, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchIcon from "@mui/icons-material/Search";

type Company = {
  id: number;
  name: string;
  description: string;
  location: string;
  category: string;
  initials: string;
  color: string;
};

const companies: Company[] = [
  {
    id: 1,
    name: "GreenTech AS",
    description: "Søker lærling innen IT og teknologi.",
    location: "Oslo",
    category: "IT",
    initials: "GT",
    color: "#9858ad",
  },
  {
    id: 2,
    name: "Nordic Solutions",
    description: "Spennende læreplass innen utvikling.",
    location: "Bergen",
    category: "Utvikling",
    initials: "NS",
    color: "#ae82c4",
  },
  {
    id: 3,
    name: "Fjord Industri",
    description: "Lærlingplass innen mekanisk fagretning.",
    location: "Ålesund",
    category: "Mekanikk",
    initials: "FJ",
    color: "#452461",
  },
  {
    id: 4,
    name: "Omsorg Pluss",
    description: "Læreplass innen helsearbeidfag ved sykehjem og bofellesskap.",
    location: "Trondheim",
    category: "Helse",
    initials: "OP",
    color: "#9858ad",
  },
  {
    id: 5,
    name: "Byggmester Nord",
    description: "Søker tømrerlærling til boligprosjekter i regionen.",
    location: "Tromsø",
    category: "Bygg og anlegg",
    initials: "BN",
    color: "#ae82c4",
  },
  {
    id: 6,
    name: "Studio Nord Media",
    description: "Læreplass innen medieproduksjon og innholdsskaping.",
    location: "Oslo",
    category: "Medieproduksjon",
    initials: "SM",
    color: "#452461",
  },
];

const categories = [
  "Alle",
  "IT",
  "Bygg og anlegg",
  "Helse",
  "Mekanikk",
  "Medieproduksjon",
];

export default function Findplacement() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Alle");
  const [removed, setRemoved] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredCompanies = useMemo(() => {
    const query = search.toLowerCase();

    return companies.filter((company) => {
      const matchesSearch =
        company.name.toLowerCase().includes(query) ||
        company.description.toLowerCase().includes(query) ||
        company.location.toLowerCase().includes(query) ||
        company.category.toLowerCase().includes(query);

      const matchesCategory =
        category === "Alle" || company.category === category;

      return (
        !removed.includes(company.id) && matchesSearch && matchesCategory
      );
    });
  }, [search, category, removed]);

  const toggleFavorite = (id: number) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id],
    );
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f1eff0",
        px: { xs: 2, sm: 4 },
        py: 4,
      }}
    >
      <Box sx={{ maxWidth: 640, mx: "auto" }}>
        <Typography
          variant="h4"
          sx={{ color: "#342052", fontWeight: 800, mb: 0.5 }}
        >
          Finn læreplass
        </Typography>

        <Typography sx={{ color: "#7d7185", mb: 2 }}>
          Bla gjennom lærebedrifter som matcher din fagretning.
        </Typography>

        <TextField
          fullWidth
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Søk etter bedrift, fagretning eller sted..."
          sx={{
            mb: 1.5,
            "& .MuiOutlinedInput-root": {
              borderRadius: 8,
              backgroundColor: "#fff",
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#888" }} />
                </InputAdornment>
              ),
            },
          }}
        />

        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{ flexWrap: "wrap", mb: 2.5 }}
        >
          {categories.map((item) => (
            <Chip
              key={item}
              label={item}
              onClick={() => setCategory(item)}
              sx={{
                px: 0.5,
                color: category === item ? "#fff" : "#786b7d",
                backgroundColor: category === item ? "#452461" : "#fff",
                border: category === item ? "none" : "1px solid #ddd6df",
                "&:hover": {
                  backgroundColor: category === item ? "#452461" : "#eee9ef",
                },
              }}
            />
          ))}
        </Stack>

        <Typography sx={{ color: "#857889", fontSize: 13, mb: 1 }}>
          {filteredCompanies.length} lærebedrifter
        </Typography>

        <Stack spacing={1.25}>
          {filteredCompanies.map((company) => {
            const isFavorite = favorites.includes(company.id);

            return (
              <Card
                key={company.id}
                sx={{
                  p: 2,
                  borderRadius: 2.5,
                  backgroundColor: "#fff",
                  border: "1px solid #ddd9dd",
                  boxShadow: "none",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Avatar
                    variant="rounded"
                    sx={{
                      width: 36,
                      height: 36,
                      backgroundColor: company.color,
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {company.initials}
                  </Avatar>

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      sx={{ color: "#111", fontWeight: 700, fontSize: 13 }}
                    >
                      {company.name}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#887b8b",
                        fontSize: 12,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {company.description}
                    </Typography>

                    <Stack
                      direction="row"
                      spacing={0.75}
                      sx={{ mt: 0.75 }}
                    >
                      <Chip
                        label={company.location}
                        size="small"
                        sx={{
                          height: 19,
                          fontSize: 10,
                          color: "#a052ad",
                          backgroundColor: "#f5edf6",
                          border: "1px solid #e5d7e8",
                        }}
                      />
                      <Chip
                        label={company.category}
                        size="small"
                        sx={{
                          height: 19,
                          fontSize: 10,
                          color: "#a052ad",
                          backgroundColor: "#f5edf6",
                          border: "1px solid #e5d7e8",
                        }}
                      />
                    </Stack>
                  </Box>

                  <Stack direction="row" spacing={0.75}>
                    <IconButton
                      aria-label={`Fjern ${company.name}`}
                      onClick={() =>
                        setRemoved((current) => [...current, company.id])
                      }
                      sx={{
                        width: 32,
                        height: 32,
                        color: "#999",
                        backgroundColor: "#f1eff1",
                        border: "1px solid #ddd9dd",
                      }}
                    >
                      <CloseIcon sx={{ fontSize: 16 }} />
                    </IconButton>

                    <IconButton
                      aria-label={`Favoritt ${company.name}`}
                      onClick={() => toggleFavorite(company.id)}
                      sx={{
                        width: 32,
                        height: 32,
                        color: "#fff",
                        backgroundColor: "#452461",
                        "&:hover": { backgroundColor: "#342052" },
                      }}
                    >
                      {isFavorite ? (
                        <FavoriteIcon sx={{ fontSize: 16 }} />
                      ) : (
                        <FavoriteBorderIcon sx={{ fontSize: 16 }} />
                      )}
                    </IconButton>
                  </Stack>
                </Box>
              </Card>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
}
