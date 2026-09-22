import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import HomePage from "../pages/homePage";
import FindApprenticeship from "../pages/findApprenticeship";
import MyApplications from "../pages/MyApplications";
import History from "../pages/History";
import Profile from "../pages/profilePage";
import Login from "../pages/loginPage";
import SignUp from "../pages/signupPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/app" element={<HomePage />} />
      <Route
        path="/application"
        element={<MyApplications />}
      />
      <Route
        path="/stillinger"
        element={<FindApprenticeship />}
      />
      <Route
        path="/historikk"
        element={<History />}
      />
      <Route
        path="/profil"
        element={<Profile />}
      />
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/registrer"
        element={<SignUp />}
      />
    </Routes>
  );
}
