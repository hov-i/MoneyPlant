import React from "react";
import styled from "styled-components";
import { ReactComponent as Food } from "../../assets/category/식비.svg";
import { ReactComponent as Oil } from "../../assets/category/주유.svg";
import { ReactComponent as Car } from "../../assets/category/교통차량.svg";
import { ReactComponent as Culture } from "../../assets/category/문화레저.svg";
import { ReactComponent as Mart } from "../../assets/category/마트편의점.svg";
import { ReactComponent as Fashion } from "../../assets/category/패션미용.svg";
import { ReactComponent as Life } from "../../assets/category/생활용품.svg";
import { ReactComponent as Travel } from "../../assets/category/여행숙박.svg";
import { ReactComponent as House } from "../../assets/category/주거.svg";
import { ReactComponent as Hospital } from "../../assets/category/의료비.svg";
import { ReactComponent as Learn } from "../../assets/category/교육.svg";
import { ReactComponent as Dues } from "../../assets/category/경조사회비.svg";
import { ReactComponent as Pet } from "../../assets/category/반려동물.svg";
import { ReactComponent as Etc } from "../../assets/category/기타.svg";
import categoryList from "../../styles/categoryExpenseColor";

const CategoryIcon = ({ name, onClick }) => {
  // 카테고리 이름을 받아 해당 카테고리의 svg를 리턴
  const getItemSvg = (svgName) => {
    switch (svgName) {
      case "식비":
        return <Food />;
      case "교통/차량":
        return <Car />;
      case "주유":
        return <Oil />;
      case "문화/레저":
        return <Culture />;
      case "마트/편의점":
        return <Mart />;
      case "패션/미용":
        return <Fashion />;
      case "생활용품":
        return <Life />;
      case "여행/숙박":
        return <Travel />;
      case "주거":
        return <House />;
      case "의료비":
        return <Hospital />;
      case "교육":
        return <Learn />;
      case "경조사/회비":
        return <Dues />;
      case "반려동물":
        return <Pet />;
      case "기타":
        return <Etc />;
      default:
        return "없는 카테고리입니다.";
    }
  };

  // 카테고리 이름(name)을 받아 카테고리 이름별 색코드 파일(categoryList)에서 해당 카테고리 이름에 해당하는 색 코드를 찾아옴
  const selectedItem = categoryList.find((item) => item.Name === name);

  return (
    <Icon
      color={selectedItem ? selectedItem.Color : "#FF7076"}
      onClick={onClick}
    >
      {getItemSvg(name)}
    </Icon>
  );
};

export default CategoryIcon;

const Icon = styled.div`
  width: ${({ width }) => width || "25px"};
  height: ${({ height }) => height || "25px"};
  background-color: ${(props) => props.color};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
