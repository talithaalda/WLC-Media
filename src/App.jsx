import { Routes, Route } from "react-router-dom";
import HomePages from "./pages/HomePages";
import NavbarComponents from "./components/NavbarComponents";
import FooterComponents from "./components/FooterComponents";
import AbouUsPage from "./pages/AbouUsPage";

function App() {
  return (
    <div>
      <NavbarComponents />
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/aboutus" element={<AbouUsPage />} />
      </Routes>
      <FooterComponents />
    </div>
  );
}

export default App;
