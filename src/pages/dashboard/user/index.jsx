import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "react-bootstrap";
import Link from "next/link";
import Sidebar from "@/components/dashboardLayouts/SideBar";
import DashboardUser from "@/components/dashboard/user";

const ListUserPage = () => {
  return (
    <Sidebar>
      <DashboardUser />
    </Sidebar>
  );
};

export default ListUserPage;
