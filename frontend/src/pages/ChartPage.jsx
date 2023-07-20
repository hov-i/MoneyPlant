import styled from "styled-components";
import Header from "../components/Common/Header";
import Navbar from "../components/Common/Navbar";
import LineBarChart from "../components/Chart/LineBarChart";
import Container from "../components/Common/Container";
import ListBox from "../components/Common/ListBox";
import PieChart from "../components/Chart/PieChart";
import YearButton from "../components/Chart/YearButton";
import React, { useState, useEffect } from "react";

import ListAxiosAPI from "../api/ListAxiosAPI";
// import moment from "moment/moment";

// 버튼 년도 단위로 변경 필요
const Chart = () => {
  const [chartData, setChartData] = useState([]);

  const handleYearChange = (year) => {
    // 연도 변경 시 데이터 업데이트
    fetchData(year);
  };

  const fetchData = async (year) => {
    try {
      const lineChartData = await ListAxiosAPI.getLineChart();
      console.log("lineChartData:", lineChartData);

      const barIncomeChartData = await ListAxiosAPI.getBarIncomeChart();
      console.log("barIncomeChartData:", barIncomeChartData);

      const barExpenseChartData = await ListAxiosAPI.getBarExpenseChart();
      console.log("barExpenseChartData:", barExpenseChartData);

      // Combine and update the data
      const transformedData = combineData(lineChartData, barIncomeChartData, barExpenseChartData, year);
      console.log("transformedData:", transformedData);

      setChartData(transformedData);
    } catch (error) {
      console.error("조회 실패", error);
    }
  };


  const combineData = (lineData, incomeData, expenseData, year) => {
    const combinedChartData = [];
    const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));

    months.forEach((month) => {
      const xValue = `${year}-${parseInt(month, 10)}`;
      const lineItem = lineData.find((item) => item.x === xValue) || { x: xValue, l: "" };
      const barIncomeItem = incomeData.find((item) => item.x === xValue) || { x: xValue, v: "" };
      const barExpenseItem = expenseData.find((item) => item.x === xValue) || { x: xValue, v1: "" };

      combinedChartData.push({
        x: `${parseInt(month, 10)}월`,
        l: lineItem.l,
        v: barIncomeItem.v,
        v1: barExpenseItem.v1,
      });
    });

    console.log("combinedChartData:", combinedChartData);

    return combinedChartData;
  };

  useEffect(() => {
    fetchData(new Date().getFullYear()); // 현재 연도로 초기 데이터 가져오기
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <Navbar />
      <Container>
        <ListBox mobileHeight={"350px"}>
          <ButtonContainer>
            <YearButton onChangeYear={handleYearChange} />
          </ButtonContainer>
          <ChartContainer>
            <InBox>
              <LineBarChart data={chartData} />
            </InBox>
          </ChartContainer>
        </ListBox>

        <ListBox>
          <ChartContainer2>
            <PieChart />
          </ChartContainer2>
        </ListBox>
      </Container>
    </>
  );
};

export default Chart;

const ButtonContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  background-color: none;
  margin-top: 10px;
`;

const ChartContainer = styled.div`
  display: flex;
  height: 500px;
  align-content: center;
  justify-content: center;
  background-color: none;
  padding-bottom: 10px;

  @media (max-width: 768px) {
    width: 100%;
    height: 95%;
  }
`;

//Pie Chart
const ChartContainer2 = styled.div`
  display: flex;
  height: 500px;
  width: 100%;
  align-content: center;
  justify-content: center;
  background-color: none;
  @media (max-width: 768px) {
    width: 100%;
    height: 280px;
  }
`;

const InBox = styled.div`
  justify-content: center;
  overflow-x: scroll;
  overflow-y: hidden;
  scroll-behavior: smooth;

  /* 스크롤바는 안 보이고 역할은 하게 만듦 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  @media (max-width: 768px) {
    height: 90%;
    padding: 20px;
  }
`;
