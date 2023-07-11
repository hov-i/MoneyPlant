import styled from "styled-components";
import React, { useState } from "react";

const SelType = () => {
  const [category, setCategory] = useState("");

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setCategory(value);
  };

  return (
    <StyledCategory>
      <select
        className="dropBox"
        value={category}
        onChange={handleCategoryChange}
      >
        <option value="1">시급</option>
        <option value="2">건별</option>
        <option value="3">월급</option>
        <option value="4">일급</option>
      </select>
    </StyledCategory>
  );
};

export default SelType;

const StyledCategory = styled.div`
  text-align: left;
  align-items: center;
  margin-left: 0;

  .dropBox {
    background-color: ${({ theme }) => theme.bgColor};
    color: ${({ theme }) => theme.menuColor};
    width: 60px;
    height: 30px;
    margin-left: 0px;
    margin-right: 50px;
  }
`;
