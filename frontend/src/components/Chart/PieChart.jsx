import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ResponsivePie } from "@nivo/pie";
import CategoryIcon from "../MyBudget/CategoryIcon";
import categoryList from "../../styles/categoryExpenseColor";
import crown from "../../assets/crown.png";
import AxiosApi from "../../api/ListAxiosAPI";
import ClickButton from "../Common/ClickButton";
import Modal from "../Common/Modal";
import CardRecommend from "../Statistics/CardRecommend";

//퍼센테이지 반환을 백에서 할지 프론트에서 할지 아직 모르겠음
const formatData = (data) => {
  const sortedData = data.sort((a, b) => b.value - a.value); // value 값을 기준으로 내림차순 정렬
  const total = sortedData.reduce((sum, item) => sum + item.value, 0);
  return sortedData.map((item) => ({
    ...item,
    value: `${((item.value / total) * 100).toFixed(2)}%`,
    originalValue: item.value,
  }));
};

const Legends = ({ data }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const formattedData = formatData(data);

  return (
    <>
      <LegendsContainer>
        <ul>
          <ClickButton width={"90px"} onClick={openModal}>
            카드 추천
          </ClickButton>
          <img
            src={crown}
            alt="Crown"
            style={{
              display: "block",
              width: "20px",
              height: "20px",
              marginLeft: "2px",
            }}
          />
          {formattedData.map((item) => (
            <li key={item.id} className="legendsList">
              <CategoryIcon name={item.category} className={"category-icon"} />

              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                  width: "12px",
                  height: "12px",
                  //backgroundColor: "none",//item.color,
                  margin: "15px 0px 15px -3px",
                }}
              />
              <div className="valueList">{`${item.label}  ${item.value}  ${item.originalValue}원`}</div>
            </li>
          ))}
        </ul>
        {modalOpen && (
          <Modal open={modalOpen} close={closeModal}>
            <CardRecommend></CardRecommend>
          </Modal>
        )}
      </LegendsContainer>
    </>
  );
};

const PieChart = () => {
  const [colors, setColors] = useState([]);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const fetchedData = await AxiosApi.getPieChart();
      const transformedData = fetchedData.map((item) => ({
        value: item.value,
        label: item.label,
        id: item.id,
        category: item.category,
      }));

      const matchedColors = transformedData.map((item) => {
        const matchedCategory = categoryList.find(
          (category) => category.Name === item.category
        );
        return matchedCategory ? matchedCategory.Color : "";
      });

      setData(transformedData);
      setColors(matchedColors);
    } catch (error) {
      console.error("조회 실패", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data.length) {
    return (
      <>
        <NotUse>이번 달 지출 내역이 존재하지 않습니다.😢</NotUse>
      </>
    );
  }

  return (
    <>
      <StyledPieChartContainer>
        <ResponsivePie
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderColor={{
            from: "item.Color",
            modifiers: [["darker", 0.2]],
          }}
          colors={colors}
          enableArcLabels={false}
          enableArcLinkLabels={false}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
          }}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
        />
      </StyledPieChartContainer>
      <Legends data={data} />
    </>
  );
};

export default PieChart;

const StyledPieChartContainer = styled.div`
  width: 70%;
  padding: 10px;
  @media (max-width: 768px) {
    width: 60%;
  }
`;

const LegendsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: none;
  width: 30%;
  font-weight: 700;
  font-size: 1vw;
  justify-content: center;
  align-content: center;
  white-space: pre;

  .legendsList {
    display: flex;
    align-items: center;
    white-space: pre-wrap;
  }

  .valueList {
    width: 200px;
  }

  @media (max-width: 768px) {
    width: 40%;
    font-weight: 700;
    font-size: 10px;

    .valueList {
      width: 80px;
    }
  }
`;

const NotUse = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;
