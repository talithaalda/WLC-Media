import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { navList } from "../utils/index.js";
import { NavLink } from "react-router-dom";
import "../styles/style.css";
export const NavbarComponents = () => {
  return (
    <Navbar expand="lg" style={{ backgroundColor: "white" }}>
      <Container>
        <Navbar.Brand href="#home" className="me-0">
          <img
            src="/images/logo-horizontal-color.png"
            alt="logo"
            width="160px"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="custom-collapse">
          <Nav className="ms-auto me-0 text-center">
            {navList.map((link) => (
              <div key={link.id}>
                <NavLink
                  to={link.path}
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                  end
                >
                  {link.text}
                </NavLink>
              </div>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponents;
