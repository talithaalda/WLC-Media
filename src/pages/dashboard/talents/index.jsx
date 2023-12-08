import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "react-bootstrap";
import Link from "next/link";
import Sidebar from "@/components/dashboardLayouts/SideBar";
import ShowPortfolio from "@/components/dashboard/portfolio/show";
import DashboardPortfolio from "@/components/dashboard/portfolio";
import EditPortfolio from "@/components/dashboard/portfolio/edit";
import ShowTalents from "./show";
import DashboardTalents from "@/components/dashboard/talents";

const EditPortfolioPage = () => {
  return (
    <Sidebar>
      <DashboardTalents />
    </Sidebar>
  );
};

export default EditPortfolioPage;
