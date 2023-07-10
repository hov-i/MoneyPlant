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
      const transformedLineChartData = lineChartData
        .map((item) => {
          const itemYear = item.x.split("-")[0]; // yyyy-MM에서 yyyy 부분 추출
          if (itemYear === year.toString()) {
            // 년도 비교
            return {
              x: item.x,
              l: item.l,
            };
          }
          return null;
        })
        .filter(Boolean); // null인 요소 제거

      const barIncomeChartData = await ListAxiosAPI.getBarIncomeChart();
      const transformedBarIncomeChartData = barIncomeChartData.map((item) => ({
        x: item.x,
        v: item.v,
      }));

      const barExpenseChartData = await ListAxiosAPI.getBarExpenseChart();
      const transformedBarExpenseChartData = barExpenseChartData.map(
        (item) => ({
          x: item.x,
          v1: item.v1,
        })
      );

      // 데이터 결합
      const combinedChartData = transformedLineChartData.map((lineItem) => {
        const barIncomeItem = transformedBarIncomeChartData.find(
          (barItem) => barItem.x === lineItem.x
        );
        const barExpenseItem = transformedBarExpenseChartData.find(
          (barItem) => barItem.x === lineItem.x
        );

        return {
          x: lineItem.x,
          l: lineItem.l,
          v: barIncomeItem ? barIncomeItem.v : 0,
          v1: barExpenseItem ? barExpenseItem.v1 : 0,
        };
      });

      // 결합 데이터 분배
      setChartData(combinedChartData);
    } catch (error) {
      console.error("조회 실패", error);
    }
  };

  useEffect(() => {
    fetchData(new Date().getFullYear()); // 현재 연도로 초기 데이터 가져오기
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

  @media (max-width: 768px) {
    height: 100%;
  }
`;
