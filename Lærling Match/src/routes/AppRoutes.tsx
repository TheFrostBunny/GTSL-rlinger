import { Route, Routes } from "react-router";
import Home from "../pages/Home";
export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<></>}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}
