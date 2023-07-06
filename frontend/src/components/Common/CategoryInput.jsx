import useViewport from "../../hooks/viewportHook";
import CategoryIcon from "../MyBudget/CategoryIcon";
import styled from "styled-components";
import React, { useState } from "react";

const CategoryInput = ({ categoryList, categoryId, onCategoryIdChange }) => {
  const { isMobile } = useViewport();
  const [activeCategoryId, setActiveCategoryId] = useState(1); // 초기값으로 categoryId 1 설정

  const handleIconClick = (categoryId) => {
    const category = categoryList.find(
      (item) => item.categoryId === categoryId
    );
    if (category) {
      onCategoryIdChange(category.categoryId);
      setActiveCategoryId(category.categoryId);
    }
  };

  return (
    <>
      <TitleMemoized categoryList={categoryList} categoryId={categoryId} />
      <IconBox isMobile={isMobile}>
        {categoryList.map((data, index) => (
          <div className="icon" key={index}>
            <Click
              color={data.Color}
              active={data.categoryId === activeCategoryId}
              onClick={() => handleIconClick(data.categoryId)}
            >
              <CategoryIcon name={data.Name} color={data.Color} />
            </Click>
          </div>
        ))}
      </IconBox>
    </>
  );
};

export default CategoryInput;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: ${(props) => (props.isMobile ? "100px" : "20px")};
  margin-bottom: ${(props) => (props.isMobile ? "40px" : "20px")};
  margin-top: 0px;

  .icon {
    margin: 10px;
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

const Title = styled.div`
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

const TitleMemoized = React.memo(({ categoryList, categoryId }) => {
  const category = categoryList.find((item) => item.categoryId === categoryId);
  const iconName = category ? category.Name : "";
  return <Title>{iconName}</Title>;
});
