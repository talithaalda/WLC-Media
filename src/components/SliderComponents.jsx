// import React from "react";
import { useState } from "react";
import TitleTextComponents from "./TitleTextComponents";
import { Container } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

function SliderComponents() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div>
      <div className="mt-5">
        <TitleTextComponents textTitle="Our Talents" />
      </div>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item interval={1000}>
          <Container>
            <div className="d-flex gap-5 mt-5 justify-content-center">
              <div className="card-slider card-1">
                <img src="/images/img-talens.png" alt="img-talens" />
                <div className="mt-3">
                  <div className="slider-title">Jenny Wilson</div>
                  <div className="slider-desc">@jennywilson</div>
                </div>
              </div>
              <div className="card-slider card-2">
                <img src="/images/img-talens.png" alt="img-talens" />
                <div className="mt-3">
                  <div className="slider-title">Jenny Wilson</div>
                  <div className="slider-desc">@jennywilson</div>
                </div>
              </div>
              <div className="card-slider card-3">
                <img src="/images/img-talens.png" alt="img-talens" />
                <div className="mt-3">
                  <div className="slider-title">Jenny Wilson</div>
                  <div className="slider-desc">@jennywilson</div>
                </div>
              </div>
            </div>
          </Container>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <Container>
            <div className="d-flex gap-5 mt-5 justify-content-center">
              <div className="card-slider card-1">
                <img src="/images/img-talens.png" alt="img-talens" />
                <div className="mt-3">
                  <div className="slider-title">Jenny Wilson</div>
                  <div className="slider-desc">@jennywilson</div>
                </div>
              </div>
              <div className="card-slider card-2">
                <img src="/images/img-talens.png" alt="img-talens" />
                <div className="mt-3">
                  <div className="slider-title">Jenny Wilson</div>
                  <div className="slider-desc">@jennywilson</div>
                </div>
              </div>
              <div className="card-slider card-3">
                <img src="/images/img-talens.png" alt="img-talens" />
                <div className="mt-3">
                  <div className="slider-title">Jenny Wilson</div>
                  <div className="slider-desc">@jennywilson</div>
                </div>
              </div>
            </div>
          </Container>
        </Carousel.Item>
        <Carousel.Item>
          <Container>
            <div className="d-flex gap-5 mt-5 justify-content-center">
              <div className="card-slider card-1">
                <img src="/images/img-talens.png" alt="img-talens" />
                <div className="mt-3">
                  <div className="slider-title">Jenny Wilson</div>
                  <div className="slider-desc">@jennywilson</div>
                </div>
              </div>
              <div className="card-slider card-2">
                <img src="/images/img-talens.png" alt="img-talens" />
                <div className="mt-3">
                  <div className="slider-title">Jenny Wilson</div>
                  <div className="slider-desc">@jennywilson</div>
                </div>
              </div>
              <div className="card-slider card-3">
                <img src="/images/img-talens.png" alt="img-talens" />
                <div className="mt-3">
                  <div className="slider-title">Jenny Wilson</div>
                  <div className="slider-desc">@jennywilson</div>
                </div>
              </div>
            </div>
          </Container>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default SliderComponents;
