import React, { Fragment } from "react";
import styled from "styled-components";
import { ResponsiveBar } from "@nivo/bar";
import { Axes } from "@nivo/axes";
import { line } from "d3-shape";
import { computeXYScalesForSeries } from "@nivo/scales";
import { useTooltip, TableTooltip } from "@nivo/tooltip";

const barColor = "#3fdaae";
const lineColor = "#ffa947";

// `v` and `v1` are used for bars
// `l` is used for line

const LineBarChart = ({ data }) => {
  const Line = ({ bars, xScale, yScale, innerWidth, innerHeight }) => {
    // scale 최댓값 입력
    const maxValue = Math.max(...data.map((item) => Math.max(item.v, item.v1)));

    computeXYScalesForSeries(
      [
        {
          id: "only",
          data: data.map((it) => ({ x1: it.d, y: it.l })),
        },
      ],
      { type: "linear" },
      { type: "linear" },
      innerWidth,
      innerHeight
    );

    const lineGenerator = line()
      .x((d) => xScale(d.x) + xScale.bandwidth() / 2)
      .y((d) => yScale(d.y)); // 막대 그래프의 Y축 값으로 변경

    const lineData = data
      .filter((d) => d.l !== undefined)
      .map((d) => ({
        x: d.x,
        y: d.l,
      }));

    const linePath = lineGenerator(lineData);

    const tip = useTooltip();

    function renderTip(e, idx) {
      const barData = bars[idx].data.data;
      if (barData) {
        return tip.showTooltipFromEvent(
          <CustomTooltip
            barValue={barData["수입"]}
            barValue1={barData["지출"]}
            lineValue={barData.l}
          />,
          e
        );
      }
    }

    function CustomTooltip({ barValue, barValue1, lineValue }) {
      return (
        <TableTooltip
          rows={[
            ["수입", `${barValue}`],
            ["지출", `${barValue1}`],
            ["합계", `${lineValue}`],
          ]}
        />
      );
    }

    return (
      <Fragment>
        {/* y좌표 전부 안 보이게!
      <div className="AxesWrapper" style={{ display: "none" }}>
  <Axes
    yScale={yScale}
    xScale={xScale}
    width={innerWidth}
    height={innerHeight}
    right={{
      ticksPosition: "after"
    }}
  />
</div> */}

        <Axes
          yScale={yScale}
          xScale={xScale}
          width={innerWidth}
          height={innerHeight}
          right={{
            ticksPosition: "after",
            tickSize: 5, // y축 눈금 크기
            tickPadding: 1, // y축 눈금과 텍스트 간 간격
            tickRotation: 0, // y축 눈금 텍스트 회전 각도
            format: ",", // y축 눈금 텍스트 형식
            textColor: "#000", // y축 눈금 텍스트 색상
            fontSize: 10, // y축 눈금 텍스트 폰트 크기
          }}
          bottom={{
            legendOffset: 100, // 밑 축과 그래프 사이의 간격 조정
            tickSize: 5, // x축 눈금 크기
            tickPadding: 1, // x축 눈금과 텍스트 간 간격
            tickRotation: 0, // x축 눈금 텍스트 회전 각도
            textColor: "#000", // x축 눈금 텍스트 색상
            fontSize: 12, // x축 눈금 텍스트 폰트 크기
          }}
        />

        <text
          x={innerWidth} // 오른쪽 끝에 위치
          y={yScale(maxValue) - 12} // yScale의 최댓값에 해당하는 y 좌표에서 약간 위로 이동
          textAnchor="start" // 시작 부분에 정렬
          style={{ fontSize: "10px" }}
        >
          (원)
        </text>
        <path
          d={linePath}
          fill="none"
          stroke={lineColor}
          style={{ pointerEvents: "none" }}
        />
        {bars.map((bar) => (
          <circle
            key={`circle-${bar.key}`}
            cx={xScale(bar.data.data.x) + xScale.bandwidth() / 2}
            cy={yScale(bar.data.data.l)}
            r={4}
            fill="white"
            stroke={lineColor}
            style={{ pointerEvents: "none" }}
          />
        ))}

        {bars.map((bar, idx) => (
          <Fragment key={bar.key}>
            <rect
              key={`rect-${bar.key}`}
              x={bar.x}
              y={0}
              height={innerHeight}
              width={bar.width}
              fill="transparent"
              onMouseEnter={(e) => renderTip(e, idx)}
              onMouseMove={(e) => renderTip(e, idx)}
              onMouseLeave={tip.hideTooltip}
            />
            <text
              x={
                xScale(bar.data.data.x) + xScale.bandwidth() / 2 - bar.width / 2
              }
              y={yScale(bar.data.data["수입"])} // v 값 텍스트의 y 좌표 수정
              textAnchor="middle"
              style={{ fontSize: "12px" }}
            >
              {bar.data.data["수입"]}
            </text>
            <text
              x={
                xScale(bar.data.data.x) + xScale.bandwidth() / 2 + bar.width / 2
              }
              y={yScale(bar.data.data["지출"])} // v1 값 텍스트의 y 좌표 수정
              textAnchor="middle"
              style={{ fontSize: "12px" }}
            >
              {bar.data.data["지출"]}
            </text>
            <text
              x={xScale(bar.data.data.x) + xScale.bandwidth() / 2}
              y={yScale(bar.data.data.l) - 10}
              textAnchor="middle"
              style={{ fontSize: "12px" }}
            >
              {bar.data.data.l}
            </text>
          </Fragment>
        ))}
      </Fragment>
    );
  };

  const transformedData = data.map((item) => ({
    x: item.x || "0",
    수입: item.v || "0",
    지출: -item.v1 || "0",
    l: item.l || "0",
  }));

  // transformedData 배열을 월(month) 기준으로 정렬
  transformedData.sort((a, b) => {
    const aMonth = parseInt(a.x.split("-")[1]);
    const bMonth = parseInt(b.x.split("-")[1]);
    return aMonth - bMonth;
  });


  // scale 최댓값 입력
  const maxValue = Math.max(...data.map((item) => Math.max(item.v, item.v1)));
  const minValue = Math.min(
    ...data.map((item) => Math.min(item.l, item.v, item.v1, 0))
  );

  if (!data.length) {
    return (
      <>
        <NotUseContainer>
          <NotUse>현재 수입, 지출 내역이 존재하지 않습니다.</NotUse>
        </NotUseContainer>
      </>
    );
  }

  return (
    <LineBarChartContainer>
      <div className="lineBarChart">
        <ResponsiveBar
          data={transformedData}
          keys={["수입", "지출"]}
          groupMode="grouped" // 그룹 모드를 'grouped'로 설정
          maxValue={maxValue}
          minValue={minValue}
          padding={0.5} // 각 막대 그래프 사이의 거리
          margin={{
            top: 20,
            right: 70,
            bottom: 30,
            left: 30,
          }}
          indexBy="x"
          enableLabel={false}
          colors={[barColor, "#ff3e85"]}
          borderRadius={2}
          axisLeft={false} // 왼쪽 y좌표
          axisBottom={false} // x축 숨기기
          enableGridY={false}
          layers={["grid", "axes", "bars", Line, "markers", "legends"]}
          //범례
          legends={[
            {
              anchor: "top-left", // 범례 위치 (top-left, top-right, bottom-left, bottom-right 등)
              direction: "row", // 범례 방향 (row, column 등)
              justify: false,
              translateX: -5,
              translateY: -20,
              itemsSpacing: 7,
              itemWidth: 50,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              itemTextColor: "#000",
              symbolSize: 15,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </LineBarChartContainer>
  );
};

// const root = createRoot(document.getElementById("root"));
// root.render(<LineBarChart />);

export default LineBarChart;

const LineBarChartContainer = styled.div`
  width: 800px;
  height: 100%;
  display: flex;

  .lineBarChart {
    margin-top: 10px;
    width: 100%;
    height: 90%;
  }
`;

const NotUseContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1000px;
  height: 100%;
  background: linear-gradient(137deg, rgba(167, 255, 201, 0.13) 1.63%, rgba(70, 137, 175, 0.17) 100%, rgba(0, 255, 133, 0.51) 100%);
`;

const NotUse = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  color: white;
  font-size: 20px;
`;
