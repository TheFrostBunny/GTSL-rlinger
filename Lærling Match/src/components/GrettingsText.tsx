import Typography from "@mui/material/Typography";
import { useGreeting } from "../hooks/useGreeting";

const GrettingsText = () => {
  const greeting = useGreeting();
  return (
    <div>
      <Typography
        sx={{
          mb: 2,
          color: "#8fa1b8",
          fontSize: "1rem",
        }}
      >
        {greeting}
      </Typography>
    </div>
  );
};

export default GrettingsText;
