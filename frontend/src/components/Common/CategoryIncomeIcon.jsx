import React from "react";
import styled from "styled-components";
import { ReactComponent as Salary } from "../../assets/categoryIncome/급여.svg";
import { ReactComponent as Bonus } from "../../assets/categoryIncome/보너스.svg";
import { ReactComponent as PocketMoney } from "../../assets/categoryIncome/용돈.svg";
import { ReactComponent as ExtraIncome } from "../../assets/categoryIncome/부수입.svg";
// import { ReactComponent as - } from '../../assets/category/.svg';
// import { ReactComponent as -- } from '../../assets/category/.svg';
import { ReactComponent as Etc } from "../../assets/categoryIncome/기타.svg";
import categoryIncomeList from "../../styles/categoryIncomeColor";

//왜 카테고리가 존재하는데 없다고 하는가...
const CategoryIncomeIcon = ({ name, onClick }) => {
  // 카테고리 이름을 받아 해당 카테고리의 svg를 리턴
  const getItemSvg = (svgName) => {
    switch (svgName) {
      case "급여":
        return <Salary />;
      case "보너스":
        return <Bonus />;
      case "용돈":
        return <PocketMoney />;
      case "부수입":
        return <ExtraIncome />;
      // case '-':
      //     return < />;
      // case '--':
      //     return < />;
      case "기타":
        return <Etc />;
      default:
        return "無";
    }
  };

  // 카테고리 이름(name)을 받아 카테고리 이름별 색코드 파일(categoryList)에서 해당 카테고리 이름에 해당하는 색 코드를 찾아옴
  const selectedItem = categoryIncomeList.find((item) => item.Name === name);

  return (
    <Icon
      color={selectedItem ? selectedItem.Color : "#FF7076"}
      onClick={onClick}>
      {getItemSvg(name)}
    </Icon>
  );
};

export default CategoryIncomeIcon;

const Icon = styled.div`
  width: ${({ width }) => width || "25px"};
  height: ${({ height }) => height || "25px"};
  background-color: ${(props) => props.color};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
