import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ShowPortfolio = () => {
  const router = useRouter();
  const { id } = router.query;
  const [portfolio, setPortfolio] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  useEffect(() => {
    const fetchDataById = async () => {
      try {
        if (!id) {
          return;
        }
        const rute = `/api/portfolio/${id}`;
        const response = await fetch(rute);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setPortfolio(data);
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      }
    };
    fetchDataById();
  }, [id, portfolio]);
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/portfolio/${id}`, {
        method: "DELETE",
      });
      setDeleteSuccess(true);
      router.push("/dashboard/portfolio");
      if (!response.ok) {
        throw new Error("Failed to delete data");
      }

      // Update the state to reflect the changes
      setPorto((prevPorto) => prevPorto.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting portfolio data:", error);
    }
  };
  return (
    <main className="">
      <div className="d-flex justify-content-center gap-2">
        <Link href={`/dashboard/portfolio/${portfolio.id}/edit`} legacyBehavior>
          <button className="btn btn-primary" href="">
            <i>
              <FontAwesomeIcon icon={faPenToSquare} />
            </i>
            <span> Edit</span>
          </button>
        </Link>

        <button
          className="btn btn-danger"
          onClick={() => handleDelete(portfolio.id)}
        >
          <i>
            <FontAwesomeIcon icon={faTrash} />
          </i>
          <span> Delete</span>
        </button>
      </div>
      <div className="d-flex justify-content-center">
        <Card className="mt-5 card-porto-admin">
          <Card.Img variant="top" src="/images/img-lanscape.png" width="100%" />
          <Card.Body className="card-body-porto">
            <div className="card-text">
              <div className="title-portfolio">{portfolio.title}</div>
              <div className="desc-portfolio">{portfolio.category?.name}</div>
            </div>
          </Card.Body>
        </Card>
        <br />
      </div>
    </main>
  );
};

export default ShowPortfolio;
