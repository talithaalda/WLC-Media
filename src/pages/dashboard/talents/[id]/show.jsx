import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "react-bootstrap";
import Link from "next/link";
import Sidebar from "@/components/dashboardLayouts/SideBar";
import ShowTalents from "@/components/dashboard/talents/show";

const ListPortfolioPage = () => {
  return (
    <Sidebar>
      <ShowTalents />
    </Sidebar>
  );
};

export default ListPortfolioPage;
