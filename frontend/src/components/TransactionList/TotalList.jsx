import React, { useState, useEffect } from "react";
import ListContainer from "./ListContainer";
import ListAxiosAPI from "../../api/ListAxiosAPI";

const TotalList = () => {
  const [incomeList, setIncomeList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomeData = await ListAxiosAPI.getListIncome();
        const transformedIncomeData = incomeData.map((item) => ({
          money: item.money,
          date: item.date,
          category: item.category,
          detail: item.detail,
          deal: "수입",
        }));
        setIncomeList(transformedIncomeData);
      } catch (error) {
        console.error("수입 조회 실패", error);
      }

      try {
        const expenseData = await ListAxiosAPI.getListExpense();
        const transformedExpenseData = expenseData.map((item) => ({
          money: item.money,
          date: item.date,
          category: item.category,
          detail: item.detail,
          deal: "지출",
        }));
        setExpenseList(transformedExpenseData);
      } catch (error) {
        console.error("지출 조회 실패", error);
      }
    };

    fetchData();
  }, []);

  const listData = [...incomeList, ...expenseList];

  return (
    <>
      <ListContainer listData={listData} />
    </>
  );
};

export default TotalList;
