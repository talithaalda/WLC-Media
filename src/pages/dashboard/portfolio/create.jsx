import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "react-bootstrap";
import Link from "next/link";
import Sidebar from "@/components/dashboardLayouts/SideBar";
import ShowPortfolio from "@/components/dashboard/portfolio/show";
import DashboardPortfolio from "@/components/dashboard/portfolio";
import CreatePortfolio from "@/components/dashboard/portfolio/create";

const CreatePortfolioPage = () => {
  return (
    <Sidebar>
      <CreatePortfolio />
    </Sidebar>
  );
};

export default CreatePortfolioPage;
