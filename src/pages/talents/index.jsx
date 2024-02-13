// import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import TitleTextComponents from "../../components/TitleTextComponents";
import SliderComponents from "@/components/SliderComponents";
import { useEffect, useState } from "react";
import { useTalent } from "@/utils/talentContext";

const TalentsPage = () => {
  const { talents, fetchData } = useTalent();
  useEffect(() => {
    fetchData();
  }, []);
  const talentsPerPage = 9;

  // Render SliderComponents based on the talents data
  const renderSliderComponents = () => {
    const totalTalents = talents.length;

    // Calculate the number of SliderComponents needed
    const totalSliderComponents = Math.ceil(totalTalents / talentsPerPage);

    const sliderComponents = [];

    for (let i = 0; i < totalSliderComponents; i++) {
      // Calculate the range of talents to pass to each SliderComponent
      const startIdx = i * talentsPerPage;
      const endIdx = startIdx + talentsPerPage;
      const talentsSlice = talents.slice(startIdx, endIdx);

      // Push a SliderComponent with the sliced talents data
      sliderComponents.push(
        <SliderComponents key={i} talentsData={talentsSlice} />
      );
    }

    return sliderComponents;
  };
  return (
    <div>
      <header className="header-talent">
        <Container>
          <Row className="header-box w-100 min-vh-100">
            <Col lg="4" className="d-flex flex-column justify-content-center">
              <h1>TALENTS</h1>
              <p>Lorem ipsum dolor sit amet.</p>
            </Col>
            <Col lg="8" className="end-column pt-lg-0 pt-5">
              <img
                className="img-header"
                style={{ marginRight: "-80px" }}
                src="/images/header-talents.png"
                alt="header aboutus "
              />
            </Col>
          </Row>
        </Container>
      </header>
      <div>
        <div className="mt-5">
          <TitleTextComponents textTitle="Our Talents" />
        </div>
        {renderSliderComponents()}
      </div>
    </div>
  );
};

export default TalentsPage;
