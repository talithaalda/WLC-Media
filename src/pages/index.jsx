import { Container, Row, Col } from "react-bootstrap";
import ButtonComponents from "../components/ButtonComponents";
import { serviceList } from "../utils";
import TitleTextComponents from "../components/TitleTextComponents";
import Masonry from "react-masonry-css";
import SliderComponents from "../components/SliderComponents";
import PhilosophyComponets from "../components/PhilosophyComponets";
import SliderHomeComponents from "@/components/SIiderHomeComponents";
import { useTalent } from "@/utils/talentContext";
import { useEffect, useState } from "react";
import { usePortfolio } from "@/utils/portfolioContext";
import { useRouter } from "next/router";

export default function Home() {
  const { talents, fetchData } = useTalent();
  const router = useRouter();
  const { page } = router.query;
  const [dataLoaded, setDataLoaded] = useState(false);
  const { isImage, fetchDataUser, portfolio, currentPage, setCurrentPage } =
    usePortfolio();

  useEffect(() => {
    fetchDataUser();
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(parseInt(page) || 1); // Mengubah currentPage menjadi nilai dari "page" di URL
  }, [page]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      router.push(`/portfolio/${currentPage - 1}`);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // Function to get 3 random talents
  const getRandomTalents = (count) => {
    if (talents.length <= count) return talents;

    const shuffledTalents = talents.sort(() => 0.5 - Math.random());
    return shuffledTalents.slice(0, count);
  };

  // Get 3 random talents
  const randomTalents = getRandomTalents(6);
  const breakpoints = {
    default: 3,
    1200: 2,
    700: 2,
    500: 1,
  };
  return (
    <div className="homepage">
      {/* HEADER */}

      <header className="header-home">
        <Container>
          <Row className="header-box w-100  " style={{ paddingTop: "1%" }}>
            <Col lg="4" className="centered-column">
              <h1>Your One Call Away Solutions</h1>
              <p>
                We offer top-tier talent, carefully selected to meet your
                project needs, ensuring exceptional quality and results every
                time.
              </p>
              {/* <button className="btn btn-wlc">Join With Us</button> */}
              <ButtonComponents textButton="Join With Us" />
            </Col>
            <Col lg="8" className="end-column pt-lg-0 ">
              <img
                className="img-header"
                src="/images/header-home.png"
                alt="header home"
                width={"100%"}
              />
            </Col>
          </Row>
        </Container>
      </header>

      {/* OUR SERVICES */}

      <div className="w-100 our-services d-flex flex-column">
        <TitleTextComponents textTitle="Our Services " />
        <div className="service-list flex-row d-flex justify-content-center">
          {serviceList.map((item) => (
            <div className="d-flex service-card" key={item.id}>
              <img className="img-service" src={item.path} alt={item.name} />
              <div className="service-name">
                <b>{item.name}</b>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Philosophy */}
      <PhilosophyComponets></PhilosophyComponets>

      {/* PORTOFOLIO */}
      <div>
        <Container className="d-flex flex-column justify-content-center portfolio">
          <Row className="w-100">
            <Col lg="2"></Col>
            <Col lg="8">
              <TitleTextComponents textTitle="Our Portfolio & Gallery" />
            </Col>
            <Col lg="2" className="btn-portfolio">
              <ButtonComponents textButton="View Portfolio" />
            </Col>
          </Row>
          <Masonry
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {portfolio.length > 0 &&
              portfolio.map((item) => (
                <div className="card-porto" key={item.id}>
                  {isImage(item.filename) ? (
                    <img
                      src={`/api/portfolio/image/${item.filename}`}
                      alt={item.title}
                    />
                  ) : (
                    <video
                      className="img-fluid vid-porto"
                      style={{ maxHeight: "450px" }}
                      preload="metadata"
                      src={`/api/portfolio/image/${item.filename}`}
                      type="video/mp4"
                      controls
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                  <div className="title-portfolio">{item.title}</div>
                  <div className="desc-portfolio">{item.talent}</div>
                </div>
              ))}
          </Masonry>
        </Container>
      </div>

      {/* OUR TALENTS */}
      <div>
        <div className="mt-5">
          <TitleTextComponents textTitle="Our Talents" />
        </div>
        <SliderComponents talentsData={randomTalents} />
      </div>

      {/* Brand */}
      <Container>
        <div className="mt-5 pt-5">
          <TitleTextComponents textTitle="Our clients" />
        </div>
        <div
          className="d-flex flex-wrap justify-content-center clients mt-5"
          style={{ gap: "60px" }}
        >
          <img src="/images/brand1.png" alt="brand" />
          <img src="/images/brand2.png" alt="brand" />
          <img src="/images/brand3.png" alt="brand" />
          <img src="/images/brand4.png" alt="brand" />
          <img src="/images/brand5.png" alt="brand" />
          <img src="/images/brand6.png" alt="brand" />
          <img src="/images/brand7.png" alt="brand" />
          <img src="/images/brand8.png" alt="brand" />
          <img src="/images/brand9.png" alt="brand" />
          <img src="/images/brand10.png" alt="brand" />
          <img src="/images/brand11.png" alt="brand" />
          <img src="/images/brand12.png" alt="brand" />
          <img src="/images/brand13.png" alt="brand" />
          <img src="/images/brand14.png" alt="brand" />
          <img src="/images/brand15.png" alt="brand" />
        </div>
      </Container>
    </div>
  );
}
