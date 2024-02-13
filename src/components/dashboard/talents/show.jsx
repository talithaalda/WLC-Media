import { Button, Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import TitleTextComponents from "@/components/TitleTextComponents";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import formatToRupiah from "../../FormatToRp";
import ButtonComponents from "@/components/ButtonComponents";
import { useTalent } from "@/utils/talentContext";

const ShowTalents = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    talent,
    deleteSuccess,
    setDeleteSuccess,
    fetchDataByIdShow,
    handleDeleteShow,
  } = useTalent();
  useEffect(() => {
    // Hanya fetch data jika ID ada
    if (id) {
      fetchDataByIdShow();
    }
  }, [id]);

  return (
    <Container className="">
      <div className="d-flex justify-content-center gap-2">
        <Link href={`/dashboard/talents/${talent.id}/edit`} legacyBehavior>
          <button className="btn btn-primary" href="">
            <i>
              <FontAwesomeIcon icon={faPenToSquare} />
            </i>
            <span> Edit</span>
          </button>
        </Link>
        <button
          className="btn btn-danger"
          onClick={() => handleDeleteShow(talent.id)}
        >
          <i>
            <FontAwesomeIcon icon={faTrash} />
          </i>
          <span> Delete</span>
        </button>
      </div>
      <Row className="py-5 px-5 mb-5">
        <Col lg="5" className="justify-content-center d-flex">
          {talent.path && (
            <img
              src={`/api/talent/image/${talent.filename}`}
              alt="img-detail"
              width={"100%"}
            />
          )}
        </Col>
        <Col lg="7" className="px-2 mt-lg-0 mt-5">
          <h1 className="detail-title">{talent.name}</h1>
          <h3 className="detail-category">{talent.category?.name}</h3>
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
                <div className="username">@{talent.userIG}</div>
              </div>
              <div className="p-3">
                <h1 className="count-foll">{talent.follIG}k</h1>
                <div className="desc-foll">FOLLOWERS</div>
              </div>
              <div>
                <h1 className="count-foll">{talent.ERIG}%</h1>
                <div className="desc-foll">ENGAGEMENT</div>
              </div>
            </div>
            <div className="card-sosmed">
              <div className="d-flex justify-content-center gap-2">
                <img src="/images/logo-tt.svg" alt="tiktok" />
                <div className="username">@{talent.userTikTok}</div>
              </div>
              <div className="p-3">
                <h1 className="count-foll">{talent.follTikTok}k</h1>
                <div className="desc-foll">FOLLOWERS</div>
              </div>
              <div>
                <h1 className="count-foll">{talent.ERTikTok}%</h1>
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
            <div className="text-price">
              {formatToRupiah(talent.startfromIG)}
            </div>
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
            <div className="text-price">
              {formatToRupiah(talent.startfromTikTok)}
            </div>
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
      <div className="d-flex justify-content-center">
        <Link href="/dashboard/talents">
          <ButtonComponents textButton="Back"></ButtonComponents>
        </Link>
      </div>
    </Container>
  );
};

export default ShowTalents;
