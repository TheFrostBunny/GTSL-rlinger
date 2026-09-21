import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

type Company = {
  id: number;
  name: string;
  description: string;
  location: string;
  category: string;
  initials: string;
};

const companies: Company[] = [
  {
    id: 1,
    name: "GreenTech AS",
    description: "Søker lærling innen IT og teknologi.",
    location: "Oslo",
    category: "IT",
    initials: "GT",
  },
  {
    id: 2,
    name: "Nordic Solutions",
    description: "Spennende læreplass innen utvikling.",
    location: "Bergen",
    category: "Utvikling",
    initials: "NS",
  },
  {
    id: 3,
    name: "Sea Innovation",
    description: "Arbeid med moderne maritime løsninger.",
    location: "Stavanger",
    category: "Teknologi",
    initials: "SI",
  },
];

export default function CompanyList() {
  const [visibleCompanies, setVisibleCompanies] =
    useState<Company[]>(companies);

  const removeCompany = (id: number) => {
    setVisibleCompanies((current) =>
      current.filter((company) => company.id !== id),
    );
  };

  return (
    <Stack spacing={2}>
      {visibleCompanies.map((company) => (
        <Card
          key={company.id}
          sx={{
            p: 2.5,
            borderRadius: 2,
            backgroundColor: "#18212d",
            border: "1px solid #273445",
            color: "#fff",
            boxShadow: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Avatar
              sx={{
                width: 62,
                height: 62,
                borderRadius: 2,
                backgroundColor: "#c9dfd3",
                color: "#18212d",
                fontWeight: 700,
              }}
            >
              {company.initials}
            </Avatar>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700 }}>
                {company.name}
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  color: "#8fa1b8",
                  fontSize: 15,
                }}
              >
                {company.description}
              </Typography>

              <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                <Chip
                  label={company.location}
                  size="small"
                  sx={{
                    backgroundColor: "#202c3b",
                    color: "#9eafc5",
                  }}
                />

                <Chip
                  label={company.category}
                  size="small"
                  sx={{
                    backgroundColor: "#202c3b",
                    color: "#9eafc5",
                  }}
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                aria-label={`Ikke interessert i ${company.name}`}
                onClick={() => removeCompany(company.id)}
                sx={{
                  width: 48,
                  height: 48,
                  color: "#8fa1b8",
                  backgroundColor: "#202c3b",
                  "&:hover": {
                    color: "#fff",
                    backgroundColor: "#2d3b4d",
                  },
                }}
              >
                <CloseIcon />
              </IconButton>

              <IconButton
                aria-label={`Liker ${company.name}`}
                onClick={() => removeCompany(company.id)}
                sx={{
                  width: 48,
                  height: 48,
                  color: "#ff7052",
                  backgroundColor: "#593126",
                  "&:hover": {
                    backgroundColor: "#743d2d",
                  },
                }}
              >
                <FavoriteBorderIcon />
              </IconButton>
            </Box>
          </Box>
        </Card>
      ))}
    </Stack>
  );
}
