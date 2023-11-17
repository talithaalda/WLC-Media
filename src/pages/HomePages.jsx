import { Container, Row, Col } from "react-bootstrap";
import ButtonComponents from "../components/ButtonComponents";
import { serviceList } from "../utils";
import TitleTextComponents from "../components/TitleTextComponents";
import Masonry from "react-masonry-css";
import SliderComponents from "../components/SliderComponents";

const HomePages = () => {
  const breakpoints = {
    default: 3,
    1200: 2,
    700: 2,
    500: 1,
  };

  return (
    <div className="homepage">
      {/* HEADER */}

      <header className="header">
        <Container>
          <Row className="header-box w-100 min-vh-100 ">
            <Col lg="4" className="centered-column">
              <h1>Your One Call Away Solutions</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Accusamus quos neque provident non pariatur eum!
              </p>
              {/* <button className="btn btn-wlc">Join With Us</button> */}
              <ButtonComponents textButton="Join With Us" />
            </Col>
            <Col lg="8" className="end-column pt-lg-0 pt-5">
              <img
                className="img-header"
                src="/images/header-home.png"
                alt="header home"
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

      <div className="w-100 philosophy">
        <Container>
          <Row className="justify-content-center ">
            <Col lg="7" className=""></Col>
            <img
              className="img-philosophy mb-4"
              src="/images/philosophy.png"
              alt="philoshophy"
            />
            <Col
              lg="5"
              className="pt-lg-0 pt-md-5 d-flex flex-column justify-content-center"
            >
              <div className="title-philosophy">Our Philosophy</div>
              <p className="desc-philosophy">
                WLC is a creative digital agency built by couple a team of
                professionals with lot of experiences in digital and marketing
                field.
              </p>
              <p className="desc-philosophy">
                WLC is established by PT NDN Media Indonesia with the aim to be
                “Your One Call Away Solutions” for everything related to
                marketing & creative
              </p>
            </Col>
          </Row>
        </Container>
      </div>

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
        </Container>
      </div>

      {/* OUR TALENTS */}
      <SliderComponents></SliderComponents>
    </div>
  );
};

export default HomePages;
