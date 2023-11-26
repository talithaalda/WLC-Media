// import React, { useState } from "react";
import "../../../styles/admin.css";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData.jsx";
import { IconContext } from "react-icons";
import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

function SideBar() {
  const [sidebar, setSidebar] = useState(true);

  const showSidebar = () => setSidebar(!sidebar);
  useEffect(() => {
    const handleResize = () => {
      // Mengatur sidebar menjadi terbuka jika lebar layar lebih besar dari 768px
      setSidebar(window.innerWidth > 768);
    };

    // Panggil handleResize untuk menetapkan nilai awal
    handleResize();

    // Mendengarkan perubahan ukuran layar
    window.addEventListener("resize", handleResize);

    // Membersihkan event listener saat komponen di-unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <IconContext.Provider value={{ color: "undefined" }}>
        <div className=" navbar-admin">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle ">
              <img
                src="/images/logo-horizontal-color.png"
                alt="logo"
                width="150px"
                className="pt-3 ps-3"
              />
              <Link to="#" className="menu-bars ">
                <FaIcons.FaBars onClick={showSidebar} />
              </Link>
            </li>
            <div className="mt-3">
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </div>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default SideBar;
