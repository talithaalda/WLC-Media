import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "react-bootstrap";
import Link from "next/link";
import Sidebar from "@/components/dashboardLayouts/SideBar";
import ShowPortfolio from "@/components/dashboard/portfolio/show";
import DashboardPortfolio from "@/components/dashboard/portfolio";
import EditPortfolio from "@/components/dashboard/portfolio/edit";
import CreateTalents from "@/components/dashboard/talents/create";

const CreateTalentsPage = () => {
  return (
    <Sidebar>
      <CreateTalents />
    </Sidebar>
  );
};

export default CreateTalentsPage;
