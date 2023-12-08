// components/Sidebar.js
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { SidebarData } from "./SidebarData";

const Sidebar = ({ children }) => {
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const [menuLinksVisible, setMenuLinksVisible] = useState([]);
  const mobileViewThreshold = 768;
  const [activeItem, setActiveItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const router = useRouter();

  const handleHover = (index) => {
    setHoveredItem(index);
  };

  useEffect(() => {
    const currentIndex = SidebarData.findIndex(
      (item) =>
        router.pathname === item.path ||
        (router.pathname.startsWith(item.path + "/") &&
          item.path !== "/dashboard")
    );
    setActiveItem(currentIndex);
  }, [router.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < mobileViewThreshold) {
        setSidebarHidden(true);
      } else {
        setSidebarHidden(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSidebarToggle = () => {
    setSidebarHidden(!sidebarHidden);
    setMenuLinksVisible([]);
  };

  const handleProfileDropdown = () => {
    setProfileDropdownVisible(!profileDropdownVisible);
  };

  const handleMenuClick = (index) => {
    setMenuLinksVisible((prev) => {
      const updatedMenuLinksVisible = [...prev];
      updatedMenuLinksVisible[index] = !updatedMenuLinksVisible[index];
      return updatedMenuLinksVisible;
    });
  };

  return (
    <div>
      <section id="sidebar" className={sidebarHidden ? "hide" : ""}>
        <Link href="/" className="brand ps-2">
          <div>
            <i>
              <img src="/images/logo-icon.png" width={"50px"} alt="logo" />
            </i>
            Dashboard
          </div>
        </Link>
        <ul className="side-menu  ">
          {SidebarData.map((item, index) => (
            <li key={index}>
              <Link
                href={item.path}
                className={`${activeItem === index ? "active" : ""}`}
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {activeItem === index || hoveredItem == index
                  ? item.hovericon
                  : item.icon}
                {!sidebarHidden && <span>{item.title}</span>}
              </Link>
            </li>
          ))}
          <li className="" style={{ marginTop: "17rem" }}>
            <a className={`btn btn-logout ${sidebarHidden ? "hide" : ""}`}>
              <FontAwesomeIcon icon={faSignOutAlt} color="white" />
              <span>Sign Out</span>
            </a>
          </li>
        </ul>
      </section>

      <section id="content">
        <nav className="d-flex justify-content-between">
          <i
            className="ps-2 bx bx-menu toggle-sidebar"
            onClick={handleSidebarToggle}
          ></i>
          <div className="mx-4 mt-3 ">
            <b className="header-admin">Hello, Admin!</b>
          </div>
        </nav>

        {children}
      </section>
    </div>
  );
};

export default Sidebar;
