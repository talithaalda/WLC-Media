import { Routes, Route, useLocation } from "react-router-dom";
import HomePages from "./pages/HomePages";
import NavbarComponents from "./components/NavbarComponents";
import FooterComponents from "./components/FooterComponents";
import AbouUsPage from "./pages/AbouUsPage";
import PortfolioPage from "./pages/PortfolioPage";
import TalentsPage from "./pages/TalentsPage";
import DetailTalentsPage from "./pages/DetailTalentsPage";
import DashboardAdmin from "./pages/Dashboard/pages/DashboardAdmin";
import DashboardTalents from "./pages/Dashboard/pages/Talents/DashboardTalents";
import SideBar from "./pages/Dashboard/layout/SideBar";
import DashboardPortfolio from "./pages/Dashboard/pages/Portfolio/DashboardPortfolio";
import DashboardProfile from "./pages/Dashboard/pages/DashboardProfile";
import ShowTalents from "./pages/Dashboard/pages/Talents/ShowTalents";
import EditTalents from "./pages/Dashboard/pages/Talents/EditTalents";
import ShowPortfolio from "./pages/Dashboard/pages/Portfolio/ShowPortfolio";
import EditPortfolio from "./pages/Dashboard/pages/Portfolio/EditPortfolio";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

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
          <Routes>
            <Route
              path="/dashboard"
              element={
                <SideBar>
                  <DashboardAdmin />
                </SideBar>
              }
            />
            <Route
              path="/dashboard/talents"
              element={
                <SideBar>
                  <DashboardTalents />
                </SideBar>
              }
            />
            <Route
              path="/dashboard/talents/show"
              element={
                <SideBar>
                  <ShowTalents />
                </SideBar>
              }
            />
            <Route
              path="/dashboard/talents/edit"
              element={
                <SideBar>
                  <EditTalents />
                </SideBar>
              }
            />
            <Route
              path="/dashboard/portfolio"
              element={
                <SideBar>
                  <DashboardPortfolio />
                </SideBar>
              }
            />
            <Route
              path="/dashboard/portfolio/show"
              element={
                <SideBar>
                  <ShowPortfolio />
                </SideBar>
              }
            />
            <Route
              path="/dashboard/portfolio/edit"
              element={
                <SideBar>
                  <EditPortfolio />
                </SideBar>
              }
            />
            <Route
              path="/dashboard/profile"
              element={
                <SideBar>
                  <DashboardProfile />
                </SideBar>
              }
            />
            <Route path="/dashboard/login" element={<LoginPage />} />
            <Route path="/dashboard/register" element={<RegisterPage />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
