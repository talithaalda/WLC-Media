import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useProfile } from "@/utils/profileContext";
const FooterComponents = () => {
  const { profile, fetchData } = useProfile();
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="footer w-100 mt-5">
      <Container
        className="footer-container mb-5"
        style={{ paddingTop: "50px" }}
      >
        <Row>
          <Col lg="5" className="footer-center-1">
            <div>
              <img src="/images/logo-horizontal.png" alt="logo-footer" />
              <div className="footer-desc mt-3">{profile.location}</div>
            </div>
          </Col>
          <Col lg="3 " className="footer-center pt-lg-3 pt-5">
            <div>
              <div className="footer-title mb-3 ">Company</div>
              <ul className="footer-desc company">
                <li className="mb-3 unlist">Portfolio</li>
                <li className="mb-3 unlist">Talents</li>
                <li className="mb-3 unlist">About Us</li>
              </ul>
            </div>
          </Col>
          <Col lg="4 " className="footer-center pt-lg-3 pt-4">
            <div>
              <div className="footer-title mb-3">Contact Us</div>
              <ul className="fa-ul footer-desc contactus ">
                <li className="mb-3 ">
                  <span className="fa-li">
                    <FontAwesomeIcon icon={faPhone} />
                  </span>
                  <span className="ms-2">{profile.phone}</span>
                </li>
                <li className="mb-3">
                  <span className="fa-li">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23"
                      height="23"
                      viewBox="0 0 23 23"
                      fill="none"
                    >
                      <path
                        d="M6.67 0H16.33C20.01 0 23 2.99 23 6.67V16.33C23 18.099 22.2973 19.7955 21.0464 21.0464C19.7955 22.2973 18.099 23 16.33 23H6.67C2.99 23 0 20.01 0 16.33V6.67C0 4.90101 0.70273 3.20447 1.9536 1.9536C3.20447 0.70273 4.90101 0 6.67 0ZM6.44 2.3C5.342 2.3 4.28898 2.73618 3.51258 3.51258C2.73618 4.28898 2.3 5.342 2.3 6.44V16.56C2.3 18.8485 4.1515 20.7 6.44 20.7H16.56C17.658 20.7 18.711 20.2638 19.4874 19.4874C20.2638 18.711 20.7 17.658 20.7 16.56V6.44C20.7 4.1515 18.8485 2.3 16.56 2.3H6.44ZM17.5375 4.025C17.9187 4.025 18.2844 4.17645 18.554 4.44603C18.8236 4.71562 18.975 5.08125 18.975 5.4625C18.975 5.84375 18.8236 6.20938 18.554 6.47897C18.2844 6.74855 17.9187 6.9 17.5375 6.9C17.1562 6.9 16.7906 6.74855 16.521 6.47897C16.2514 6.20938 16.1 5.84375 16.1 5.4625C16.1 5.08125 16.2514 4.71562 16.521 4.44603C16.7906 4.17645 17.1562 4.025 17.5375 4.025ZM11.5 5.75C13.025 5.75 14.4875 6.3558 15.5659 7.43414C16.6442 8.51247 17.25 9.97501 17.25 11.5C17.25 13.025 16.6442 14.4875 15.5659 15.5659C14.4875 16.6442 13.025 17.25 11.5 17.25C9.97501 17.25 8.51247 16.6442 7.43414 15.5659C6.3558 14.4875 5.75 13.025 5.75 11.5C5.75 9.97501 6.3558 8.51247 7.43414 7.43414C8.51247 6.3558 9.97501 5.75 11.5 5.75ZM11.5 8.05C10.585 8.05 9.70748 8.41348 9.06048 9.06048C8.41348 9.70748 8.05 10.585 8.05 11.5C8.05 12.415 8.41348 13.2925 9.06048 13.9395C9.70748 14.5865 10.585 14.95 11.5 14.95C12.415 14.95 13.2925 14.5865 13.9395 13.9395C14.5865 13.2925 14.95 12.415 14.95 11.5C14.95 10.585 14.5865 9.70748 13.9395 9.06048C13.2925 8.41348 12.415 8.05 11.5 8.05Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                  <span className="ms-2">{profile.instagram}</span>
                </li>
                <li className="mb-3">
                  <span className="fa-li">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                  <span className="ms-2">{profile.email}</span>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="copyright">
        <div>WLC MEDIA</div>
      </div>
    </div>
  );
};

export default FooterComponents;
