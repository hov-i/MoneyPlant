import React, { useState } from "react";
import styled from "styled-components";
import contentList from "../../styles/contentColor";

const SelColor = ({ isBasic, contentId, onContentIdChange }) => {
  const [scContentId, setScContentId] = useState(1); // 초기값 1 으로 설정

  const handleScColorClick = (contentId) => {
    const content = contentList.schedule.find(
      (item) => item.contentId === contentId
    );
    if (content) {
      onContentIdChange(content.contentId);
      setScContentId(content.contentId);
    }
  };

  const [wkContentId, setWkContentId] = useState(5); // 초기값 5 으로 설정

  const handleWkColorClick = (contentId) => {
    const content = contentList.work.find(
      (item) => item.contentId === contentId
    );
    if (content) {
      onContentIdChange(content.contentId);
      setWkContentId(content.contentId);
    }
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
              active={content.contentId === scContentId}
              style={{ backgroundColor: content.Color }}
              onClick={() => handleScColorClick(content.contentId)}
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
              active={content.contentId === wkContentId}
              style={{ backgroundColor: content.Color }}
              onClick={() => handleWkColorClick(content.contentId)}
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
