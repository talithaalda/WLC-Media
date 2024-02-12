// components/NavbarComponents.js
import Link from "next/link";
import { Container, Nav, Navbar } from "react-bootstrap";
import { navList } from "../utils/index";
import { useRouter } from "next/router";

const NavbarComponents = () => {
  const router = useRouter();
  console.log(router.pathname);

  return (
    <Navbar expand="lg" style={{ backgroundColor: "white" }}>
      <Container>
        <Link href="/" legacyBehavior>
          <div className="navbar-brand me-0">
            <img
              src="/images/logo-horizontal-color.png"
              alt="logo"
              width="160px"
            />
          </div>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="custom-collapse">
          <Nav className="ms-auto me-0 text-center">
            {navList.map((link) => (
              <div key={link.id}>
                <Link
                  href={link.path}
                  passHref
                  className={
                    router.pathname === link.path
                      ? "active"
                      : router.pathname.startsWith(link.path) &&
                        link.path !== "/"
                      ? "active"
                      : link.path === "/portfolio/1" &&
                        router.pathname.startsWith("/portfolio/") &&
                        link.path !== "/"
                      ? "active"
                      : ""
                  }
                >
                  {link.text}
                </Link>
              </div>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponents;
