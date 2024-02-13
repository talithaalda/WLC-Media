import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ButtonComponents from "@/components/ButtonComponents";
import { usePortfolio } from "@/utils/portfolioContext";

const ShowPortfolio = () => {
  const router = useRouter();
  const { id } = router.query;

  const { isImage, porto, fetchDataById, handleDeleteShow } = usePortfolio();

  useEffect(() => {
    // Hanya fetch data jika ID ada
    if (id) {
      fetchDataById();
    }
  }, [id]);

  return (
    <main className="">
      <div className="d-flex justify-content-center gap-2">
        <Link href={`/dashboard/portfolio/${porto.id}/edit`} legacyBehavior>
          <button className="btn btn-primary" href="">
            <i>
              <FontAwesomeIcon icon={faPenToSquare} />
            </i>
            <span> Edit</span>
          </button>
        </Link>

        <button
          className="btn btn-danger"
          onClick={() => handleDeleteShow(porto.id)}
        >
          <i>
            <FontAwesomeIcon icon={faTrash} />
          </i>
          <span> Delete</span>
        </button>
      </div>
      <div className="d-flex justify-content-center">
        <Card className="mt-5 card-porto-admin">
          {porto.path && (
            <>
              {isImage(porto.filename) ? (
                <Card.Img
                  variant="top"
                  src={`/api/portfolio/image/${porto.filename}`}
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
                    src={`/api/portfolio/image/${porto.filename}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              )}
            </>
          )}
          <Card.Body className="card-body-porto">
            <div className="card-text">
              <div className="title-portfolio">{porto.title}</div>
              <div className="desc-portfolio">{porto.sow}</div>
              <div className="created-portfolio">{porto.talent}</div>
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
