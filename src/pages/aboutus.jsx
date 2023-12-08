import { Container, Row, Col } from "react-bootstrap";
import PhilosophyComponets from "../components/PhilosophyComponets";
import { aboutList } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
const AbouUsPage = () => {
  return (
    <div className="aboutus">
      {/* HEADER */}
      <header className="header-aboutus">
        <Container>
          <Row className="header-box w-100 min-vh-100">
            <Col lg="4" className="d-flex flex-column justify-content-center">
              <p>WE ARE</p>
              <h1>WLC MEDIA</h1>
            </Col>
            <Col lg="8" className="end-column pt-lg-0 pt-5">
              <img
                className="img-header"
                src="/images/header-aboutus.png"
                alt="header aboutus"
              />
            </Col>
          </Row>
        </Container>
      </header>

      {/* PHILOSOPHY */}
      <PhilosophyComponets></PhilosophyComponets>

      {/* DETAIL */}

      <div className="w-100 p-5 bg-grey mt-5">
        <div className="d-flex gap-5 justify-content-center pt-5 pb-5 flex-wrap">
          {aboutList.map((item) => (
            <div key={item.id}>
              <div className="aboutlist pb-lg-0 pb-5">
                <div>
                  <h1>{item.count}++</h1>
                  <p>{item.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CONTACT US */}
      <div className="w-100 " style={{ marginTop: "70px" }}>
        <Container>
          <Row className="justify-content-center ">
            <Col
              lg="5"
              className="pt-lg-0 pt-md-5 d-flex flex-column align-items-end text-end g-0 justify-content-center pb-lg-0 pb-4 pe-lg-0 pe-4"
            >
              <div className="title-contact">Get In Touch</div>
              <div className="line-text align-self-end mt-0 mb-4"></div>
              <div className="d-flex flex-column gap-4 ">
                <div className="d-flex align-items-center gap-3 justify-content-end">
                  <div className="desc-contact">
                    Rasuna Complex Epiwalk Building Epicentrum 5th Floor, Karet
                    Kuningan, Setiabudi - South Jakarta
                  </div>
                  <div className="icon-contact">
                    <FontAwesomeIcon icon={faLocationDot} />
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3 justify-content-end">
                  <div className="desc-contact">0812128219028</div>
                  <div className="icon-contact">
                    <FontAwesomeIcon icon={faPhone} />
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3 justify-content-end">
                  <div className="desc-contact">wlcmedia@gmail.com</div>
                  <div className="icon-contact">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                </div>
              </div>
            </Col>

            <Col
              lg="6"
              className="d-flex justify-content-start align-items-center ps-lg-5 flex-wrap "
            >
              <iframe
                className="img-contact"
                title="Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1983.1687329274912!2d106.83148264442747!3d-6.219152999999992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3f687547467%3A0x36e9611cdaa17aa5!2sKawasan%20Rasuna%20Epicentrum!5e0!3m2!1sid!2sid!4v1700491784393!5m2!1sid!2sid"
                width="600"
                height="450"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* <img
                className="img-contact"
                src="/images/location.png"
                alt="philoshophy"
              /> */}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default AbouUsPage;
