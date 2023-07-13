import React from "react";
import styled from "styled-components";
import CategoryIcon from "./CategoryIcon";
import CategoryBar from "./CategoryBar";
import useViewport from "../../hooks/viewportHook";

const BudgetChart = ({ name, money, totalMoney }) => {
  const { isMobile } = useViewport();
  return (
    <>
      <Chart isMobile={isMobile}>
        <div className="size">
          <CategoryIcon name={name}></CategoryIcon>
          <p className="name">{name}</p>
        </div>

        <CategoryBar name={name} money={money} totalMoney={totalMoney} />
        <p className="money">￦{money}</p>
      </Chart>
    </>
  );
};
export default BudgetChart;
const Chart = styled.div`
  display: ${(props) => (props.isMobile ? "block" : "flex")};
  align-items: center;
  justify-content: center;
  padding: 3%;
  .size {
    display: flex;
    align-items: center;
  }

  .name {
    width: ${(props) => (props.isMobile ? "80%" : "80px")};
    padding-left: ${(props) => (props.isMobile ? "1%" : "5%")};
    margin-top: ${(props) => (props.isMobile ? "5px" : "")};
    text-align: left;
  }
  .money {
    width: 10%;
    padding-left: 1%;
    text-align: right;
  }
`;
