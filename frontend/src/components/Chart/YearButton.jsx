import React, { useState } from "react";
import { ReactComponent as Right } from "../../assets/right.svg";
import { ReactComponent as Left } from "../../assets/left.svg";
import styled from "styled-components";


const YearButton = ({ onChangeYear }) => {
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear()); // 현재 년도로 초기화

  // 버튼 클릭 시 다음 해로 값을 넘김
  const handleNextYear = () => {
    setYear(year + 1);
    onChangeYear(year + 1); // 연도 변경 시 콜백 호출
  };

  // 버튼 클릭 시 이전 해로 값을 넘김
  const handlePreviousYear = () => {
    setYear(year - 1);
    onChangeYear(year - 1); // 연도 변경 시 콜백 호출
  };

  return (
    <>
            <Calendar>
                <div className="clickbutton" onClick={handlePreviousYear}>
                    <Left />
                </div>

                <div className="calbox">
                    <span className="date">
                        {year}년
                    </span>
                </div>
                <div className="clickbutton" onClick={handleNextYear}>
                    <Right />
                </div>
            </Calendar>
        </>
  );
};

export default YearButton;

const Calendar = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    .calbox {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 140px;
    }
    .date {
        font-style: normal;
        font-weight: bolder;
        font-size: 18px;
    }

    .clickbutton {
        border-radius: 50%;
        width: 30px;
        height: 30px;
        background-color: #ffffff00;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
            background-color: ${({ theme }) => theme.menuBgColor};
        }
        > svg {
            fill: ${({ theme }) => theme.budgetButton};
        }
    }
`;
