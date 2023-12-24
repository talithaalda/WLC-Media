import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import Sidebar from "@/components/dashboardLayouts/SideBar";
import EditUser from "@/components/dashboard/user/edit";

const EditUserPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Sidebar>
      <EditUser id={id} />
    </Sidebar>
  );
};

export default EditUserPage;
