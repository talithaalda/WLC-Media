// import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import TitleTextComponents from "../../components/TitleTextComponents";
import SliderComponents from "@/components/SliderComponents";

const TalentsPage = () => {
  return (
    <div>
      <header className="header-aboutus">
        <Container>
          <Row className="header-box w-100 min-vh-100">
            <Col lg="5" className="d-flex flex-column justify-content-center">
              <h1>TALENTS</h1>
              <p>Lorem ipsum dolor sit amet.</p>
            </Col>
            <Col lg="7" className="end-column pt-lg-0 pt-5">
              <img
                className="img-header"
                src="/images/header-talents.png"
                alt="header aboutus "
                width={"85%"}
              />
            </Col>
          </Row>
        </Container>
      </header>
      <div>
        <div className="mt-5">
          <TitleTextComponents textTitle="Our Talents" />
        </div>
        <SliderComponents></SliderComponents>
        <br />
        <br />
        <SliderComponents></SliderComponents>
      </div>
    </div>
  );
};

export default TalentsPage;
