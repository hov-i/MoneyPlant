import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BudgetCalendar from "../MyBudget/BudgetCalendar";
import CategoryIcon from "../MyBudget/CategoryIcon";
import CategoryIncomeIcon from "../Common/CategoryIncomeIcon";
import ListBox from "../Common/ListBox";

const ListContainer = ({ listData }) => {
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    setShowList(true);
  }, []);

  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (date) => {
    console.log("선택된 날짜:", date);
    setSelectedDate(date);
  };

  // 선택된 날짜에 따라 필터링된 데이터를 가져오는 함수
  const getFilteredDataByDate = () => {
    if (!selectedDate) {
      return listData; // 선택된 날짜가 없으면 전체 데이터 반환
    }

    const selectedYear = new Date(selectedDate).getFullYear(); // 선택된 년도
    const selectedMonth = new Date(selectedDate).getMonth() + 1; // 선택된 월

    const filteredData = listData.filter((data) => {
      const dataDate = new Date(data.date);
      const dataYear = dataDate.getFullYear();
      const dataMonth = dataDate.getMonth() + 1;

      return dataYear === selectedYear && dataMonth === selectedMonth; // 선택된 년도와 월의 데이터만 필터링
    });

    return filteredData;
  };

  const filteredData = getFilteredDataByDate();

  const getGroupedDataByMonth = () => {
    const groupedData = {};

    // 데이터를 월별로 그룹화
    filteredData.forEach((data) => {
      const month = new Date(data.date).getMonth() + 1;

      if (!groupedData[month]) {
        groupedData[month] = [];
      }

      groupedData[month].push(data);
    });

    return groupedData;
  };

  const groupedData = getGroupedDataByMonth();

  return (
    <>
      <ListBox>
        <ListContainerStyled>
          <BudgetCalendar onChangeDate={handleDateChange} />
          <table className="table">
            <thead>
              <tr>
                <th className="table-header">날짜</th>
                <th className="table-header">카테고리</th>
                <th className="table-header">내용</th>
                <th className="table-header">금액</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(groupedData).map((month) => (
                <React.Fragment key={month}>
                  {groupedData[month].map((data, index) => (
                    <ListRow
                      key={index}
                      show={showList}
                      index={index}
                      listData={data}
                    />
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </ListContainerStyled>
      </ListBox>
    </>
  );
};

const ListRow = ({ show, index, listData }) => {
  const [showRow, setShowRow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowRow(true);
    }, index * 100); // 각 항목을 200ms 간격으로 보여줍니다.

    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <StyledRow show={show && showRow}>
      <td className="table-cell">{listData.date}</td>
      <td className="table-cell category-cell">
        <div className="category-cell-content">
          {listData.deal === "지출" ? (
            <>
              <CategoryIcon name={listData.category} />
              <p className="category">{listData.category}</p>
            </>
          ) : (
            <>
              <CategoryIncomeIcon name={listData.category} />
              <p className="category">{listData.category}</p>
            </>
          )}
        </div>
      </td>
      <td className="table-cell content-cell">{listData.detail}</td>
      <td
        className={
          listData.deal === "지출" ? "table-cell red" : "table-cell blue"
        }>
        ￦{listData.money}
      </td>
    </StyledRow>
  );
};

const StyledRow = styled.tr`
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  ${({ show }) => show && "opacity: 1;"}
`;

const ListContainerStyled = styled.div`
  width: 100%;
  margin-top: 30px;
  padding: 40px;

  .table {
    width: 100%;
    margin-top: 40px;
    text-align: center;
  }
  .table .table-header {
    padding: 10px;
    width: auto;
    font-weight: bolder;
    font-size: 1rem;
  }

  .table-cell {
    padding: 10px;
  }
  .red {
    color: #ff005c;
  }

  .blue {
    color: #3fdaae;
  }

  .category-cell {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .category-cell-content {
    display: flex;
    align-items: center;
  }

  .category {
    margin-left: 0px;
    width: 80px;
  }

  .content-cell {
    width: 40%;
  }
`;

export default ListContainer;
