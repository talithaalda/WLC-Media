import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const ShowPortfolio = () => {
  return (
    <main className="">
      <div className="d-flex justify-content-center gap-2">
        <Link to={"/dashboard/talents/edit"}>
          <button className="btn btn-primary" href="">
            <i>
              <FontAwesomeIcon icon={faPenToSquare} />
            </i>
            <span> Edit</span>
          </button>
        </Link>
        <Link to={"/dashboard/talents/delete"}>
          <button className="btn btn-danger" href="">
            <i>
              <FontAwesomeIcon icon={faTrash} />
            </i>
            <span> Delete</span>
          </button>
        </Link>
      </div>
      <div className="d-flex justify-content-center">
        <Card className="mt-5 card-porto-admin">
          <Card.Img variant="top" src="/images/img-lanscape.png" width="100%" />
          <Card.Body className="card-body-porto">
            <Card.Text>
              <div className="title-portfolio">Project ADS Video Instagram</div>
              <div className="desc-portfolio">Unnpack</div>
            </Card.Text>
          </Card.Body>
        </Card>
        <br />
      </div>
    </main>
  );
};

export default ShowPortfolio;
