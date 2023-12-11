// import React from "react";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container } from "react-bootstrap";
import { useRef } from "react";
import { useEffect } from "react";
function SliderComponents() {
  const getSlidesToShow = () => {
    // Check if window is defined (to avoid SSR issues)
    if (typeof window !== "undefined") {
      const width = window.innerWidth;

      if (width < 480) return 1;
      if (width < 768) return 1;
      if (width < 1024) return 2;
      if (width < 1290) return 3;
    }

    // Default value if window is not defined (SSR)
    return 3;
  };
  const [currentSlide, setCurrentSlide] = useState(0);
  const [numSlidesToShow, setNumSlidesToShow] = useState(getSlidesToShow());
  const sliderRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setNumSlidesToShow(getSlidesToShow());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [currentSlide]);

  // eslint-disable-next-line no-unused-vars
  const CustomDots = (props) => {
    return (
      <div className="custom-dots-container">
        {/* Render your custom dots here */}
        {Array.from({ length: numSlides }).map((_, index) => (
          <div
            key={index}
            className={`custom-dot ${
              currentSlide === index ? "slick-active" : ""
            }`}
            onClick={() => {
              if (sliderRef.current) {
                sliderRef.current.slickGoTo(index * numSlidesToShow);
              }
            }}
          />
        ))}
        <div>{setCurrentSlide}</div>
      </div>
    );
  };
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    beforeChange: (current, next) => {
      const adjustedNext = Math.floor(next / numSlidesToShow);
      setCurrentSlide(adjustedNext);
      console.log(adjustedNext);
    },
    appendDots: (dots) => <CustomDots {...dots} />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  const numItems = 9;
  const numSlides = Math.ceil(numItems / numSlidesToShow);
  const showPrevArrow = currentSlide > 0;
  const showNextArrow = currentSlide + numSlidesToShow < numItems;

  const handlePrevClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const handleNextClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <Container className="mt-4">
      <div className="carousel-btn">
        <Slider {...settings} ref={sliderRef} arrows={true}>
          <div className="card-slider d-flex justify-content-center">
            <div>
              <img src="/images/img-talens.png" alt="img-talens" />
              <div className="mt-3">
                <div className="slider-title">Jenny Wilson</div>
                <div className="slider-desc">@jennywilson</div>
              </div>
            </div>
          </div>
          <div className="card-slider d-flex justify-content-center">
            <div>
              <img src="/images/img-talens.png" alt="img-talens" />
              <div className="mt-3">
                <div className="slider-title">Jenny Wilson</div>
                <div className="slider-desc">@jennywilson</div>
              </div>
            </div>
          </div>
          <div className="card-slider d-flex justify-content-center">
            <div>
              <img src="/images/img-talens.png" alt="img-talens" />
              <div className="mt-3">
                <div className="slider-title">Jenny Wilson</div>
                <div className="slider-desc">@jennywilson</div>
              </div>
            </div>
          </div>
          <div className="card-slider d-flex justify-content-center">
            <div>
              <img src="/images/img-talens.png" alt="img-talens" />
              <div className="mt-3">
                <div className="slider-title">Jenny Wilson</div>
                <div className="slider-desc">@jennywilson</div>
              </div>
            </div>
          </div>
          <div className="card-slider d-flex justify-content-center">
            <div>
              <img src="/images/img-talens.png" alt="img-talens" />
              <div className="mt-3">
                <div className="slider-title">Jenny Wilson</div>
                <div className="slider-desc">@jennywilson</div>
              </div>
            </div>
          </div>
          <div className="card-slider d-flex justify-content-center">
            <div>
              <img src="/images/img-talens.png" alt="img-talens" />
              <div className="mt-3">
                <div className="slider-title">Jenny Wilson</div>
                <div className="slider-desc">@jennywilson</div>
              </div>
            </div>
          </div>
          <div className="card-slider d-flex justify-content-center">
            <div>
              <img src="/images/img-talens.png" alt="img-talens" />
              <div className="mt-3">
                <div className="slider-title">Jenny Wilson</div>
                <div className="slider-desc">@jennywilson</div>
              </div>
            </div>
          </div>
          <div className="card-slider d-flex justify-content-center">
            <div>
              <img src="/images/img-talens.png" alt="img-talens" />
              <div className="mt-3">
                <div className="slider-title">Jenny Wilson</div>
                <div className="slider-desc">@jennywilson</div>
              </div>
            </div>
          </div>
          <div className="card-slider d-flex justify-content-center">
            <div>
              <img src="/images/img-talens.png" alt="img-talens" />
              <div className="mt-3">
                <div className="slider-title">Jenny Wilson</div>
                <div className="slider-desc">@jennywilson</div>
              </div>
            </div>
          </div>
        </Slider>
        <div className="row btn-prev-next">
          <div className="col-lg-1 width-col">
            {showPrevArrow && (
              <button className="btn-prev" onClick={handlePrevClick}></button>
            )}
          </div>
          {/* <div className="col-lg-10"></div> */}
          <div className="col-lg-1 d-flex justify-content-end width-col">
            {showNextArrow && (
              <button className="btn-next" onClick={handleNextClick}></button>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default SliderComponents;
