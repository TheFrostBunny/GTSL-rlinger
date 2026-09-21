import { useState } from "react";
import BusinessIcon from "@mui/icons-material/Business";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const companies = [
  {
    id: 1,
    name: "GreenTech AS",
    description: "Søker lærling innen IT og teknologi.",
    location: "Oslo",
  },
  {
    id: 2,
    name: "Nordic Solutions",
    description: "Spennende læreplass innen utvikling.",
    location: "Bergen",
  },
  {
    id: 3,
    name: "Sea Innovation",
    description: "Arbeid med moderne maritime løsninger.",
    location: "Stavanger",
  },
];

export default function CompanyList() {
  const [reactions, setReactions] = useState<
    Record<number, "like" | "dislike">
  >({});

  const handleReaction = (
    companyId: number,
    reaction: "like" | "dislike",
  ) => {
    setReactions((current) => ({
      ...current,
      [companyId]: reaction,
    }));
  };

  return (
    <Stack spacing={2}>
      {companies.map((company) => (
        <Card key={company.id} sx={{ borderRadius: 1 }}>
          <CardContent>
            <BusinessIcon sx={{ fontSize: 42, color: "primary.main", mb: 1 }} />

            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {company.name}
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 1 }}>
              {company.description}
            </Typography>

            <Typography variant="body2" sx={{ mt: 1 }}>
              {company.location}
            </Typography>
          </CardContent>

          <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}>
            <IconButton
              aria-label={`Liker ikke ${company.name}`}
              onClick={() => handleReaction(company.id, "dislike")}
              color={reactions[company.id] === "dislike" ? "error" : "default"}
            >
              <ThumbDownOutlinedIcon />
            </IconButton>

            <IconButton
              aria-label={`Liker ${company.name}`}
              onClick={() => handleReaction(company.id, "like")}
              color={reactions[company.id] === "like" ? "primary" : "default"}
            >
              <ThumbUpOutlinedIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </Stack>
  );
}