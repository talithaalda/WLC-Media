import { Routes, Route } from "react-router-dom";
import HomePages from "./pages/HomePages";
import NavbarComponents from "./components/NavbarComponents";
import FooterComponents from "./components/FooterComponents";

function App() {
  return (
    <div>
      <NavbarComponents />
      <Routes>
        <Route path="/" element={<HomePages />} />
      </Routes>
      <FooterComponents />
    </div>
  );
}

export default App;
