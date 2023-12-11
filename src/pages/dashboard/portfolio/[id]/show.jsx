import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "react-bootstrap";
import Link from "next/link";
import Sidebar from "@/components/dashboardLayouts/SideBar";
import ShowPortfolio from "@/components/dashboard/portfolio/show";

const ShowPortfolioPage = () => {
  return (
    <Sidebar>
      <ShowPortfolio />
    </Sidebar>
  );
};

export default ShowPortfolioPage;
