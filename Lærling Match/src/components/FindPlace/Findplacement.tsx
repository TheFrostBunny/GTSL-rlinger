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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const [category, setCategory] = useState("Alle");
  const [removed, setRemoved] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredCompanies = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("nb-NO");

    return companies.filter((company) => {
      const searchableText = [
        company.name,
        company.description,
        company.location,
        company.category,
      ]
        .join(" ")
        .toLocaleLowerCase("nb-NO");

      const matchesSearch =
        query === "" || searchableText.includes(query);

      const matchesCategory =
        category === "Alle" || company.category === category;

      return (
        !removed.includes(company.id) &&
        matchesSearch &&
        matchesCategory
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
        width: "100%",
        minHeight: "100%",
        boxSizing: "border-box",
        backgroundColor: "background.default",
        color: "text.primary",
        px: { xs: 0, sm: 2, md: 3 },
        py: { xs: 1, sm: 2, md: 3 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1100,
          mx: "auto",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "text.primary",
            fontWeight: 800,
            fontSize: { xs: "1.8rem", sm: "2.2rem" },
            mb: 0.5,
          }}
        >
          {t("findplacement.title")}
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            fontSize: { xs: 13, sm: 15 },
            mb: 2,
          }}
        >
          {t("findplacement.description")}
        </Typography>

        <TextField
          fullWidth
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={t("findplacement.searchPlaceholder")}
          sx={{
            mb: 1.5,
            "& .MuiOutlinedInput-root": {
              borderRadius: 8,
              backgroundColor: "background.paper",
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
            "& .MuiInputBase-input::placeholder": {
              color: "text.secondary",
              opacity: 1,
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="inherit" />
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
                color: category === item ? "primary.contrastText" : "text.secondary",
                backgroundColor:
                  category === item ? "primary.main" : "background.paper",
                border: "1px solid",
                borderColor:
                  category === item ? "primary.main" : "divider",
                "&:hover": {
                  backgroundColor:
                    category === item ? "primary.dark" : "action.hover",
                },
              }}
            />
          ))}
        </Stack>

        <Typography sx={{ color: "text.secondary", fontSize: 13, mb: 1 }}>
          {filteredCompanies.length} {t("findplacement.companies")}
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
                  backgroundColor: "background.paper",
                  color: "text.primary",
                  border: "1px solid",
                  borderColor: "divider",
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
                      sx={{
                        color: "text.primary",
                        fontWeight: 700,
                        fontSize: 13,
                      }}
                    >
                      {company.name}
                    </Typography>

                    <Typography
                      sx={{
                        color: "text.secondary",
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
                          color: "secondary.main",
                          backgroundColor: "action.hover",
                          border: "1px solid",
                          borderColor: "divider",
                        }}
                      />
                      <Chip
                        label={company.category}
                        size="small"
                        sx={{
                          height: 19,
                          fontSize: 10,
                          color: "secondary.main",
                          backgroundColor: "action.hover",
                          border: "1px solid",
                          borderColor: "divider",
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
                        width: { xs: 38, sm: 44 },
                        height: { xs: 38, sm: 44 },
                        color: "text.secondary",
                        backgroundColor: "action.hover",
                        border: "1px solid",
                        borderColor: "divider",
                      }}
                    >
                      <CloseIcon sx={{ fontSize: 16 }} />
                    </IconButton>

                    <IconButton
                      aria-label={`Favoritt ${company.name}`}
                      onClick={() => toggleFavorite(company.id)}
                      sx={{
                        width: { xs: 38, sm: 44 },
                        height: { xs: 38, sm: 44 },
                        color: "primary.contrastText",
                        backgroundColor: "primary.main",
                        "&:hover": {
                          backgroundColor: "primary.dark",
                        },
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
