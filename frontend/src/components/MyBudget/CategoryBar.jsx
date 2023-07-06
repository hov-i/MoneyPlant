import React from "react";
import styled, { keyframes } from "styled-components";
import categoryList from "../../styles/categoryExpenseColor";
import useViewport from "../../hooks/viewportHook";

const CategoryBar = ({ name, money, totalMoney }) => {
  const { isMobile } = useViewport();
  // 카테고리 이름(name)을 받아 카테고리 이름별 색코드 파일(categoryList)에서 해당 카테고리 이름에 해당하는 색 코드를 찾아옴
  const selectedItem = categoryList.find((item) => item.Name === name);

  // 카테고리 별 금액(money)와 총 예산 금액(totalMoney)를 받아와 몇 퍼센트 인지 계산해줌
  const percent = (money / totalMoney) * 100 + "%";
  return (
    <TotalBar isMobile={isMobile}>
      <BarWrapper>
        <Bar
          color={selectedItem ? selectedItem.Color : "#FF7076"}
          width={percent}
        />
      </BarWrapper>
    </TotalBar>
  );
};

export default CategoryBar;

const moveInAnimation = keyframes`
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  `;

const BarWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 5px;
`;

const Bar = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  background-color: ${(props) => props.color};
  border-radius: 100px;
  position: absolute;
  top: 0;
  animation: ${moveInAnimation} 0.5s forwards;
`;

const TotalBar = styled.div`
  width: ${(props) => (props.isMobile ? "100%" : "80%")};
  margin: ${(props) => (props.isMobile ? "10px" : "")};
  margin-left: 0px;
  height: 5px;
  background-color: #d6d6d6;
  border-radius: 100px;
`;
