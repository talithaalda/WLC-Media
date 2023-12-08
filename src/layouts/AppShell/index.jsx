import FooterComponents from "@/components/FooterComponents";
import NavbarComponents from "@/components/NavbarComponents";
import SideBar from "@/components/dashboardLayouts/SideBar";
import ShowPortfolio from "@/pages/dashboard/portfolio/show";
import { useRouter } from "next/router";
import React from "react";
const AppShell = ({ children }) => {
  const { pathname } = useRouter();
  const isDashboardRoute = pathname.startsWith("/dashboard");
  return (
    <>
      {!isDashboardRoute && (
        <div>
          <NavbarComponents />
          {children}
        </div>
      )}
      {isDashboardRoute && children}

      {/* <FooterComponents /> */}
    </>
  );
};

export default AppShell;
