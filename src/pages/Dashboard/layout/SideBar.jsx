/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "../../../styles/admin.css";
import "boxicons/css/boxicons.min.css";
import { SidebarData } from "../layout/SidebarData";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
// eslint-disable-next-line react/prop-types
const SideBar = ({ children }) => {
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const [menuLinksVisible, setMenuLinksVisible] = useState([]);
  const mobileViewThreshold = 768;
  const [activeItem, setActiveItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation();

  const handleHover = (index) => {
    setHoveredItem(index);
  };

  useEffect(() => {
    // Set activeItem sesuai dengan rute yang sedang aktif
    const currentIndex = SidebarData.findIndex(
      (item) =>
        location.pathname === item.path ||
        (location.pathname.startsWith(item.path + "/") &&
          item.path !== "/dashboard")
    );
    setActiveItem(currentIndex);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < mobileViewThreshold) {
        setSidebarHidden(true);
      } else {
        setSidebarHidden(false);
      }
    };

    // Initial check on component mount
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSidebarToggle = () => {
    setSidebarHidden(!sidebarHidden);
    setMenuLinksVisible([]); // Reset menu links visibility on sidebar toggle
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
        <a href="#" className="brand ps-2">
          <i>
            <img src="/images/logo-icon.png" width={"50px"} alt="logo" />
          </i>
          Dashboard
        </a>
        <ul className="side-menu  ">
          {SidebarData.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
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
          {/* <ButtonComponents textButton={"Logout"} /> */}
        </ul>
        {/* ... (rest of the sidebar content) */}
      </section>

      <section id="content">
        <nav className="d-flex justify-content-between">
          <i
            className="bx bx-menu toggle-sidebar"
            onClick={handleSidebarToggle}
          ></i>
          {/* <form action="#"> */}
          {/* <div className="form-group">
              <input type="text" placeholder="Search..." />
              <i className="bx bx-search icon"></i>
            </div> */}
          {/* </form> */}
          <div className="mx-4 mt-3 ">
            <b className="header-admin">Hello, Admin!</b>
          </div>
          {/* <a href="#" className="nav-link">
            <i className="bx bxs-bell icon"></i>
            <span className="badge">5</span>
          </a>
          <a href="#" className="nav-link">
            <i className="bx bxs-message-square-dots icon"></i>
            <span className="badge">8</span>
          </a>
          <span className="divider"></span>
          <div className="profile" onClick={handleProfileDropdown}>
          </div> */}
        </nav>

        {children}
      </section>
    </div>
  );
};

export default SideBar;
