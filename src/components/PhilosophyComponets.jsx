import { Container, Row, Col } from "react-bootstrap";

const PhilosophyComponets = () => {
  return (
    <div className="w-100 " style={{ marginTop: "100px" }}>
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
              “Your One Call Away Solutions” for everything related to marketing
              & creative
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PhilosophyComponets;
