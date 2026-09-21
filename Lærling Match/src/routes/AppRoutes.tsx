import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import AppPage from "../pages/appPage"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/app" element={<AppPage />} />
    </Routes>
  )
}
