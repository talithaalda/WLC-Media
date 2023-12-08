// import React from "react";
import TitleTextComponents from "@/components/TitleTextComponents";
import { Container, Row, Col } from "react-bootstrap";
const DetailTalentsPage = () => {
  return (
    <Container className="">
      <Row className="img-detail">
        <Col lg="5" className="justify-content-center d-flex">
          <img src="/images/img-detail.png" alt="img-detail" />
        </Col>
        <Col lg="7" className="px-5 mt-lg-0 mt-5">
          <div style={{ fontSize: "24px", color: "#929292" }}>Hello I am </div>
          <h1 className="detail-title">Jenny Wilson Allen</h1>
          <h3 className="detail-category">Sport</h3>
          <div
            className="mt-5 pt-5 pb-3"
            style={{ fontSize: "20px", color: "#414141", fontWeight: 700 }}
          >
            Social Media
          </div>
          <div className="d-flex gap-4 container-sosmed">
            <div className="card-sosmed">
              <div className="d-flex justify-content-center gap-2 pb-2">
                <img src="/images/logo-instagram.svg" alt="instagram" />
                <div className="username">@jennywilson</div>
              </div>
              <div className="p-3">
                <h1 className="count-foll">60.192k</h1>
                <div className="desc-foll">FOLLOWERS</div>
              </div>
              <div>
                <h1 className="count-foll">1,45%</h1>
                <div className="desc-foll">ENGAGEMENTS</div>
              </div>
            </div>
            <div className="card-sosmed">
              <div className="d-flex justify-content-center gap-2">
                <img src="/images/logo-tt.svg" alt="tiktok" />
                <div className="username">@jennywilson</div>
              </div>
              <div className="p-3">
                <h1 className="count-foll">60.192k</h1>
                <div className="desc-foll">FOLLOWERS</div>
              </div>
              <div>
                <h1 className="count-foll">1,45%</h1>
                <div className="desc-foll">ENGAGEMENTS</div>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <TitleTextComponents textTitle="Price List"></TitleTextComponents>
      <div className="d-flex d-flex gap-5 flex-wrap justify-content-center m-5">
        <div className="pricelist-card">
          <div style={{ fontSize: "24px", fontWeight: 700 }}>Instagram</div>
          <div className="d-flex mt-1 justify-content-between ">
            <div>
              <img src="/images/price.svg" alt="price" />
              Start From
            </div>
            <div className="text-price">Rp1.000.000</div>
          </div>
          <div className="line-price"></div>
          <div className="pt-3 d-flex flex-column gap-2">
            <div className="d-flex gap-2">
              <img src="/images/checklist.svg" alt="check" />
              <div>Instragram Story</div>
            </div>
            <div className="ps-4 d-flex gap-2">
              <img src="/images/checklist.svg" alt="check" />
              <div>Instagram Story Session (up to 4 stories)</div>
            </div>
            <div className="d-flex gap-2">
              <img src="/images/checklist.svg" alt="check" />
              <div>Instragram Story</div>
            </div>
            <div className="d-flex gap-2">
              <img src="/images/checklist.svg" alt="check" />
              <div>Instragram Story</div>
            </div>
          </div>
        </div>
        <div className="pricelist-card">
          <div style={{ fontSize: "24px", fontWeight: 700 }}>Tiktok</div>
          <div className="d-flex mt-1 justify-content-between ">
            <div>
              <img src="/images/price.svg" alt="price" />
              Start From
            </div>
            <div className="text-price">Rp1.000.000</div>
          </div>
          <div className="line-price"></div>
          <div className="pt-3 d-flex flex-column gap-2">
            <div className="d-flex gap-2">
              <img src="/images/checklist.svg" alt="check" />
              <div>Instragram Story</div>
            </div>
            <div className="ps-4 d-flex gap-2">
              <img src="/images/checklist.svg" alt="check" />
              <div>Instagram Story Session (up to 4 stories)</div>
            </div>
            <div className="d-flex gap-2">
              <img src="/images/checklist.svg" alt="check" />
              <div>Instragram Story</div>
            </div>
            <div className="d-flex gap-2">
              <img src="/images/checklist.svg" alt="check" />
              <div>Instragram Story</div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ padding: "50px 0" }}>
        <TitleTextComponents textTitle="Gallery"></TitleTextComponents>
      </div>
      <div className="d-flex gap-5 justify-content-center container-sosmed">
        <div className="img-container-gallery">
          <img
            src="/images/img-detail.png"
            alt="img-gallery"
            className="img-gallery"
          />
        </div>
        <div className="img-container-gallery">
          <img
            src="/images/img-detail.png"
            alt="img-gallery"
            className="img-gallery"
          />
        </div>
        <div className="img-container-gallery">
          <img
            src="/images/img-detail.png"
            alt="img-gallery"
            className="img-gallery"
          />
        </div>
      </div>
    </Container>
  );
};

export default DetailTalentsPage;
