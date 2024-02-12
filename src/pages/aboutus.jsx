import { Container, Row, Col } from "react-bootstrap";
import PhilosophyComponets from "../components/PhilosophyComponets";
import { aboutList } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import TitleTextComponents from "@/components/TitleTextComponents";
const AbouUsPage = () => {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/profile/1");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchData();
  }, []);
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
        <TitleTextComponents textTitle={"Our Testimonial"} />
        <div
          className="d-flex justify-content-center pt-5 pb-5 flex-wrap"
          style={{ gap: "100px" }}
        >
          {/* {aboutList.map((item) => (
            <div key={item.id}>
              <div className="aboutlist pb-lg-0 pb-5">
                <div>
                  <h1>{item.count}++</h1>
                  <p>{item.name}</p>
                </div>
              </div>
            </div>
          ))} */}

          <div className="card-testi">
            <img src="/images/quote.png" alt="testi" className="img-quote" />
            <div className="card-testi2">
              <div className="testi-name">James Pattinson</div>
              <div className="testi-desc">
                “Lobortis leo pretium facilisis amet nisl at nec. Scelerisque
                risus tortor donec ipsum consequat semper consequat adipiscing
                ultrices.”
              </div>
            </div>
          </div>
          <div className="card-testi">
            <img src="/images/quote.png" alt="testi" className="img-quote" />
            <div className="card-testi2">
              <div className="testi-name">James Pattinson</div>
              <div className="testi-desc">
                “Lobortis leo pretium facilisis amet nisl at nec. Scelerisque
                risus tortor donec ipsum consequat semper consequat adipiscing
                ultrices.”
              </div>
            </div>
          </div>
          <div className="card-testi">
            <img src="/images/quote.png" alt="testi" className="img-quote" />
            <div className="card-testi2">
              <div className="testi-name">James Pattinson</div>
              <div className="testi-desc">
                “Lobortis leo pretium facilisis amet nisl at nec. Scelerisque
                risus tortor donec ipsum consequat semper consequat adipiscing
                ultrices.”
              </div>
            </div>
          </div>
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
                  <div className="desc-contact">{profile.location}</div>
                  <div className="icon-contact">
                    <FontAwesomeIcon icon={faLocationDot} />
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3 justify-content-end">
                  <div className="desc-contact">{profile.phone}</div>
                  <div className="icon-contact">
                    <FontAwesomeIcon icon={faPhone} />
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3 justify-content-end">
                  <div className="desc-contact">{profile.email}</div>
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
                src={`${profile.linkMaps}`}
                width="600"
                height="450"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default AbouUsPage;
