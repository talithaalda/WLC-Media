import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import Sidebar from "@/components/dashboardLayouts/SideBar";
import ShowPortfolio from "@/components/dashboard/portfolio/show";
import DashboardPortfolio from "@/components/dashboard/portfolio";
import EditPortfolio from "@/components/dashboard/portfolio/edit";

const EditPortfolioPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Sidebar>
      <EditPortfolio id={id} />
    </Sidebar>
  );
};

export default EditPortfolioPage;
