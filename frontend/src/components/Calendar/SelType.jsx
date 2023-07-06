// import React from "react";
// import styled from "styled-components";

// export const SelType = () => {
//   return (
//     <StyledCategory>
//       <select className="dropBox">
//         <option value="전체">전체</option>
//         <option value="시급">시급</option>
//         <option value="일급">일급</option>
//         <option value="연봉">월급</option>
//         <option value="건별">건별</option>
//       </select>
//     </StyledCategory>
//   );
// };

// const StyledCategory = styled.div`
//   text-align: left;
//   align-items: center;
//   margin-left: 0;

//   .dropBox {
//     width: 70px;
//     height: 30px;
//     margin-left: 0px;
//     margin-right: 50px;
//   }
// `;

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
        <option value="2">월급</option>
        <option value="3">일급</option>
        <option value="4">건별</option>
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
