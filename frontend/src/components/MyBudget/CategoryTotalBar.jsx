import React, { useEffect, useState } from "react";
import styled from "styled-components";
import categoryList from "../../styles/categoryExpenseColor";

const CategoryTotalBar = ({ categoryData, totalData }) => {
  const [isBarVisible, setIsBarVisible] = useState(false);

  useEffect(() => {
    setIsBarVisible(true);
  }, []);

  return (
    <TotalBar>
      {categoryData.map((data, index) => {
        const selectedItem = categoryList.find(
          (item) => item.Name === data.categoryName
        );
        const percent = `${(data.budgetMoney / totalData[0].Money) * 100}%`;
        const color = selectedItem ? selectedItem.Color : "#FF7076";

        return (
          <Bar
            key={data.categoryId}
            width={percent}
            color={color}
            animationDelay={index * 0.1}
            isBarVisible={isBarVisible}
          />
        );
      })}
    </TotalBar>
  );
};

export default CategoryTotalBar;

const Bar = styled.div`
  width: ${(props) => props.width};
  height: 5px;
  background-color: ${(props) => props.color};
  border-radius: 100px;
  opacity: ${(props) => (props.isBarVisible ? 1 : 0)};
  transform: ${(props) =>
    props.isBarVisible ? "translateX(0)" : "translateX(-20px)"};
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  transition-delay: ${(props) => props.animationDelay}s;
`;

const TotalBar = styled.div`
  width: 100%;
  height: 5px;
  background-color: #d6d6d6;
  border-radius: 100px;
  margin-bottom: 20px;
  display: flex;
`;
