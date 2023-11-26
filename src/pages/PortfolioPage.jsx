// import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ButtonComponents from "../components/ButtonComponents";
import Masonry from "react-masonry-css";
const PortfolioPage = () => {
  const breakpoints = {
    default: 3,
    1200: 2,
    700: 2,
    500: 1,
  };
  return (
    <div>
      {/* HEADER */}
      <header className="header-portfolio">
        <Container>
          <Row className="header-box w-100 min-vh-100">
            <Col lg="5" className="d-flex flex-column justify-content-center">
              <h1>PORTFOLIO & GALLERY</h1>
              <p>Lorem ipsum dolor sit amet.</p>
            </Col>
            <Col lg="7" className="end-column pt-lg-0 pt-5">
              <img
                className="img-header"
                src="/images/header-portfolio.png"
                alt="header aboutus"
              />
            </Col>
          </Row>
        </Container>
      </header>
      <Container className="d-flex flex-column justify-content-center">
        <div className="w-100 d-flex justify-content-center list-category ">
          <div className="category-portfolio">CATEGORY 1</div>
          <div className="category-portfolio">CATEGORY 2</div>
          <div className="category-portfolio">CATEGORY 3</div>
        </div>
        <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          <div className="card-porto">
            <img src="/images/img-lanscape.png" alt="img-lanscape" />
            <div className="title-portfolio">Project ADS Video Instagram</div>
            <div className="desc-portfolio">Unnpack</div>
          </div>
          <div className="card-porto">
            <img src="/images/img-potrait.png" alt="img-potrait" />
            <div className="title-portfolio">Project ADS Video Instagram</div>
            <div className="desc-portfolio">Unnpack</div>
          </div>
          <div className="card-porto">
            <img src="/images/img-lanscape.png" alt="img-lanscape" />
            <div className="title-portfolio">Project ADS Video Instagram</div>
            <div className="desc-portfolio">Unnpack</div>
          </div>
          <div className="card-porto">
            <img src="/images/img-potrait.png" alt="img-potrait" />
            <div className="title-portfolio">Project ADS Video Instagram</div>
            <div className="desc-portfolio">Unnpack</div>
          </div>
          <div className="card-porto">
            <img src="/images/img-lanscape.png" alt="img-lanscape" />
            <div className="title-portfolio">Project ADS Video Instagram</div>
            <div className="desc-portfolio">Unnpack</div>
          </div>
          <div className="card-porto">
            <img src="/images/img-potrait.png" alt="img-potrait" />
            <div className="title-portfolio">Project ADS Video Instagram</div>
            <div className="desc-portfolio">Unnpack</div>
          </div>
          <div className="card-porto">
            <img src="/images/img-lanscape.png" alt="img-lanscape" />
            <div className="title-portfolio">Project ADS Video Instagram</div>
            <div className="desc-portfolio">Unnpack</div>
          </div>
          <div className="card-porto">
            <img src="/images/img-potrait.png" alt="img-potrait" />
            <div className="title-portfolio">Project ADS Video Instagram</div>
            <div className="desc-portfolio">Unnpack</div>
          </div>
          <div className="card-porto">
            <img src="/images/img-lanscape.png" alt="img-lanscape" />
            <div className="title-portfolio">Project ADS Video Instagram</div>
            <div className="desc-portfolio">Unnpack</div>
          </div>
          <div className="card-porto">
            <img src="/images/img-potrait.png" alt="img-potrait" />
            <div className="title-portfolio">Project ADS Video Instagram</div>
            <div className="desc-portfolio">Unnpack</div>
          </div>
          <div className="card-porto">
            <img src="/images/img-lanscape.png" alt="img-lanscape" />
            <div className="title-portfolio">Project ADS Video Instagram</div>
            <div className="desc-portfolio">Unnpack</div>
          </div>
          <div className="card-porto">
            <img src="/images/img-potrait.png" alt="img-potrait" />
            <div className="title-portfolio">Project ADS Video Instagram</div>
            <div className="desc-portfolio">Unnpack</div>
          </div>
        </Masonry>
        <div className="d-flex justify-content-center">
          <ButtonComponents textButton="View More"></ButtonComponents>
        </div>
      </Container>
    </div>
  );
};

export default PortfolioPage;
