import React, { useState, useEffect } from "react";
import ListContainer from "./ListContainer";
import ListAxiosAPI from "../../api/ListAxiosAPI";

const ExpenseList = () => {

  const [expenseListData, setExpenseListData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ListAxiosAPI.getListExpense();
        const transformedData = data.map((item) => ({
          money: item.money,
          date: item.date,
          category: item.category,
          detail: item.detail,
          deal: "지출",
        }));
        setExpenseListData(transformedData);
      } catch (error) {
        console.error("조회 실패", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <ListContainer listData={expenseListData} />
    </>
  );
};
export default ExpenseList;
