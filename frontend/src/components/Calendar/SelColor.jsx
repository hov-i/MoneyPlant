import React, { useState } from "react";
import styled from "styled-components";
import contentList from "../../styles/contentColor";

const SelColor = ({ isBasic, value, onChange }) => {
  const handleColorClick = (colorId) => {
   const newValue = parseInt(colorId);
   onChange(newValue);
  };

  return (
    <SelBoxContainer>
      {isBasic ? (
        <div>
          {contentList.schedule.map((content, index) => (
            <Click
              className="color-box"
              key={index}
              color={content.Color}
              active={content.contentId === value}
              style={{ backgroundColor: content.Color }}
              onClick={() => handleColorClick(content.contentId)}
            />
          ))}
        </div>
      ) : (
        <div>
          {contentList.work.map((content, index) => (
            <Click
              className="color-box"
              key={index}
              color={content.Color}
              active={content.contentId === value}
              style={{ backgroundColor: content.Color }}
              onClick={() => handleColorClick(content.contentId)}
            />
          ))}
        </div>
      )}
    </SelBoxContainer>
  );
};
export default SelColor;

const SelBoxContainer = styled.div`
  .color-box {
    width: 25px;
    height: 25px;
    background: ${(props) => props.backgroundColor};
    border-radius: 50%;
  }
`;

const Click = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  box-shadow: ${(props) =>
    props.active ? `0px 0px 10px 2px ${props.color}` : ""};
  display: flex;
  align-items: center;
  justify-content: center;
  .color-box {
    width: 25px;
    height: 25px;
    background: ${(props) => props.backgroundColor};
    border-radius: 50%;
  }
`;
