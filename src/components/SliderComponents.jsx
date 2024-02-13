// import React from "react";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container } from "react-bootstrap";
import { useRef } from "react";
import { useEffect } from "react";
import Link from "next/link";
function SliderComponents({ talentsData }) {
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
        {/* <div>{setCurrentSlide}</div> */}
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
    <Container className="mt-4" style={{ marginBottom: "5rem" }}>
      <div className="carousel-btn">
        <Slider {...settings} ref={sliderRef} arrows={true}>
          {talentsData.map((talent, index) => (
            <Link key={index} href={`/talents/${talent.id}`}>
              <div
                key={index}
                className="card-slider d-flex justify-content-center"
              >
                <div>
                  <div className="card-slider-portfolio">
                    <img
                      src={`/api/talent/image/${talent.filename}`}
                      alt={`img-${talent.name}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "20px",
                      }}
                    />
                  </div>
                  <div className="mt-3">
                    <div className="slider-title">{talent.name}</div>
                    <div className="slider-desc">{`@${talent.userIG}`}</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
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
