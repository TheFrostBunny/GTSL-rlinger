import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import HomePage from "../pages/homePage";
import FindApprenticeship from "../pages/findApprenticeship";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/app" element={<HomePage />} />
      <Route
        path="/application"
        element={<FindApprenticeship />}
      />
      <Route
        path="/stillinger"
        element={<FindApprenticeship />}
      />
    </Routes>
  );
}
