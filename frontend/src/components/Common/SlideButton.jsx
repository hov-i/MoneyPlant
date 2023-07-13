import React, { useState, useRef } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlideButton = ({ slides, onSlideChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => {
      setCurrentIndex(next);
    },
    afterChange: (index) => {
      onSlideChange(index);
    },
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    sliderRef.current.slickGoTo(index);
  };

  return (
    <div>
      <BackBar>
        <div>
          {slides.map((slide, index) => (
            <SlideIndexButton
              key={index}
              className={index === currentIndex ? "active" : ""}
              onClick={() => goToSlide(index)}
            >
              {index === 0 ? "전체" : index === 1 ? "지출" : "수입"}
            </SlideIndexButton>
          ))}
        </div>
      </BackBar>

      <>
        <Slider ref={sliderRef} {...settings}>
          {slides.map((slide, index) => (
            <div key={index}>{slide}</div>
          ))}
        </Slider>
      </>
    </div>
  );
};

export default SlideButton;

const BackBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 224px;
  height: 49px;
  margin: 0 auto;

  background: ${({ theme }) => theme.bgColor};
  box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.1);
  border-radius: 100px;
  cursor: pointer;
`;

const SlideIndexButton = styled.button`
  color: #b7b7b7;
  background: none;
  border: none;
  cursor: pointer;

  width: 62px;
  height: 40px;

  &.active {
    background: linear-gradient(
      103.72deg,
      rgba(66, 230, 149, 0.8) 10.74%,
      rgba(59, 178, 184, 0.8) 85.3%
    );
    color: white;
    box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.1);
    border-radius: 100px;
  }
`;
