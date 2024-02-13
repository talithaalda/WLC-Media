import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import { usePortfolio } from "@/utils/portfolioContext";

const PortfolioPage = () => {
  const router = useRouter();
  const { page } = router.query;
  const [dataLoaded, setDataLoaded] = useState(false);
  const {
    isImage,
    fetchDataUser,
    portfolio,
    // fetchImageDimensions,
    currentPage,
    setCurrentPage,
    totalPages,
  } = usePortfolio();
  useEffect(() => {
    fetchDataUser();
  }, [currentPage]);

  // useEffect(() => {
  //   if (!dataLoaded) {
  //     fetchImageDimensions();
  //     setDataLoaded(true);
  //   }
  // }, []); // useEffect with empty dependency array to ensure it runs only once on component mount

  useEffect(() => {
    setCurrentPage(parseInt(page) || 1); // Mengubah currentPage menjadi nilai dari "page" di URL
  }, [page]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      router.push(`/portfolio/${currentPage + 1}`);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      router.push(`/portfolio/${currentPage - 1}`);
    }
  };

  return (
    <div>
      <header className="header-portfolio">
        <Container>
          <Row className="header-box w-100 min-vh-100">
            <Col lg="4" className="d-flex flex-column justify-content-center">
              <h1>PORTFOLIO & GALLERY</h1>
              <p>Lorem ipsum dolor sit amet.</p>
            </Col>
            <Col
              lg="8"
              className="end-column d-flex align-items-center pt-lg-0 pt-5"
            >
              <img
                className="img-header"
                src="/images/header-portfolio.png"
                alt="header aboutus"
              />
            </Col>
          </Row>
        </Container>
      </header>
      <Container className="d-flex flex-column justify-content-center mt-4">
        {portfolio.length > 0 &&
          portfolio.map((item) => (
            <div key={item.id}>
              <div className="card card-porto2 mb-3 mt-5">
                <div className="row g-0">
                  <div
                    className={
                      item.width < item.height
                        ? "col-md-6 d-flex justify-content-center"
                        : "col-md-6"
                    }
                  >
                    {isImage(item.filename) ? (
                      <div
                        style={{
                          height: item.width < item.height ? "450px" : "350px",
                        }}
                      >
                        <img
                          src={`/api/portfolio/image/${item.filename}`}
                          className={
                            item.width < item.height
                              ? "img-fluid img-porto-potrait"
                              : "img-fluid img-porto-horizontal"
                          }
                          alt="..."
                        />
                      </div>
                    ) : (
                      <div className="d-flex justify-content-center">
                        <video
                          className="img-fluid vid-porto"
                          style={{
                            maxHeight: "450px",
                          }}
                          preload="metadata"
                          src={`/api/portfolio/image/${item.filename}`}
                          type="video/mp4"
                          controls
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )}
                  </div>
                  <div className="col-md-5 justify-content-center d-flex">
                    <div className="card-body card-body2">
                      <h5 className="desc-portfolio2">{item.sow}</h5>
                      <p className="title-portfolio2">{item.title}</p>
                      <p className="created-portfolio2">by: {item.talent}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </Container>

      <div className="pagination d-flex gap-2 justify-content-center mt-5">
        <button
          className="btn btn-wlc"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          className="btn btn-wlc"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PortfolioPage;
