import { Routes, Route, useLocation } from "react-router-dom";
import HomePages from "./pages/HomePages";
import NavbarComponents from "./components/NavbarComponents";
import FooterComponents from "./components/FooterComponents";
import AbouUsPage from "./pages/AbouUsPage";
import PortfolioPage from "./pages/PortfolioPage";
import TalentsPage from "./pages/TalentsPage";
import DetailTalentsPage from "./pages/DetailTalentsPage";
import SideBar from "./pages/Dashboard/layout/SideBar";
import DashboardAdmin from "./pages/Dashboard/pages/DashboardAdmin";

function App() {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  return (
    <div>
      {/* Conditionally render Navbar and Footer */}
      {!isDashboardRoute && (
        <div>
          <NavbarComponents />
          <Routes>
            <Route path="/" element={<HomePages />} />
            <Route path="/aboutus" element={<AbouUsPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/talent" element={<TalentsPage />} />
            <Route path="/detailtalent" element={<DetailTalentsPage />} />
            <Route path="/dashboard" element={<DashboardAdmin />} />
          </Routes>
          <FooterComponents />
        </div>
      )}
      {isDashboardRoute && (
        <div>
          <SideBar />
          <Routes>
            <Route path="/dashboard" element={<DashboardAdmin />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
