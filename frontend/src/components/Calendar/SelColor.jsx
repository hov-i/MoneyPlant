import React, { useState } from "react";
import styled from "styled-components";
import contentList from "../../styles/contentColor";

const SelColor = ({ isBasic, onContentIdChange }) => {
  const [activeScContentId, setActiveScContentId] = useState(1); // 초기값 1 으로 설정
  const [activeWkContentId, setActiveWkContentId] = useState(1); // 초기값 5 으로 설정

  const handleScColorClick = (contentId) => {
    const color = contentList.schedule.find(
      (item) => item.contentId === contentId
    );
    if (color) {
      onContentIdChange(color.categoryId);
      setActiveScContentId(color.categoryId);
    }
  };

  const handleWkColorClick = (contentId) => {
    const color = contentList.work.find((item) => item.contentId === contentId);
    if (color) {
      onContentIdChange(color.categoryId);
      setActiveWkContentId(color.categoryId);
    }
  };

  // 컨텐츠 이름을 받아오고, 콘텐츠별 설정된 색 코드를 contentList에서 해당하는 색 코드 찾아오기
  // const setColor = contentList.find((item) => item.contentId === color);
  const colorSc = contentList.schedule.map((content) => content.Color);
  const colorWork = contentList.work.map((content) => content.Color);

  // const ColorScId = contentList.schedule.map((content) => content.contentId);
  // const ColorWorkId = contentList.work.map((content) => content.contentId);

  return (
    <SelBoxContainer>
      {isBasic ? (
        <div>
          {colorSc.map((color, index) => (
            <div
              className="color-box"
              key={index}
              style={{ backgroundColor: color }}
            >
              <Click
                color={color.Color}
                active={color.contentId === activeScContentId}
                onClick={() => handleScColorClick(color.contentId)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div>
          {colorWork.map((color, index) => (
            <div
              className="color-box"
              key={index}
              style={{ backgroundColor: color }}
            >
              <Click
                color={color.Color}
                active={color.contentId === activeWkContentId}
                onClick={() => handleWkColorClick(color.contentId)}
              />
            </div>
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
    border-radius: 100%;
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
`;
