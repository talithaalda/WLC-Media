import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ButtonComponents from "@/components/ButtonComponents";

const ShowPortfolio = () => {
  const router = useRouter();
  const { id } = router.query;
  const [portfolio, setPortfolio] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  let isMounted = true;

  useEffect(() => {
    // Set isMounted to false when the component is unmounted
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    // Hanya fetch data jika ID ada
    if (id) {
      fetchDataById();
    }
  }, [id]);

  const fetchDataById = async () => {
    try {
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

  const handleDelete = async (id) => {
    try {
      const imageInfoResponse = await fetch(
        `/api/portfolio/image/${portfolio.filename}`
      );
      if (imageInfoResponse.ok) {
        const deleteImageResponse = await fetch(
          `/api/portfolio/image/edit/${id}`,
          {
            method: "DELETE",
          }
        );
        if (!deleteImageResponse.ok) {
          throw new Error("Failed to delete image");
        }
      }

      const deletePortfolioResponse = await fetch(`/api/portfolio/${id}`, {
        method: "DELETE",
      });

      if (!deletePortfolioResponse.ok) {
        throw new Error("Failed to delete portfolio data");
      }
      setDeleteSuccess(true);
      if (isMounted) {
        setPortfolio([]);
      }

      // Redirect ke /dashboard/portfolio dengan parameter query deleteSuccess=true
      router.push({
        pathname: "/dashboard/portfolio",
        query: { deleteSuccess: true },
      });
    } catch (error) {
      console.error("Error deleting portfolio data:", error);
    }
  };
  function isImage(filename) {
    const extension = filename.split(".").pop().toLowerCase();
    return ["jpg", "jpeg", "png", "gif"].includes(extension);
  }

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
          {portfolio.path && (
            <>
              {isImage(portfolio.filename) ? (
                <Card.Img
                  variant="top"
                  src={`/api/portfolio/image/${portfolio.filename}`}
                  width="100%"
                  className="img-porto-admin"
                />
              ) : (
                <video
                  controls
                  className="video-porto-admin"
                  style={{ maxHeight: "500px" }}
                >
                  <source
                    src={`/api/portfolio/image/${portfolio.filename}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              )}
            </>
          )}
          <Card.Body className="card-body-porto">
            <div className="card-text">
              <div className="title-portfolio">{portfolio.title}</div>
<<<<<<< HEAD
              <div className="desc-portfolio">{portfolio.sow}</div>
              <div className="created-portfolio">{portfolio.talent}</div>
=======
              <div className="desc-portfolio">{portfolio.brand}</div>
>>>>>>> d5d238922f38ae72b7f928186aaadf98511b822a
            </div>
          </Card.Body>
        </Card>
        <br />
      </div>
      <div className="d-flex justify-content-center mt-4">
        <div className="d-flex justify-content-center">
          <Link href="/dashboard/portfolio">
            <ButtonComponents textButton="Back"></ButtonComponents>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ShowPortfolio;
