import React, { useState, useEffect } from "react";
import ListContainer from "./ListContainer";
import ListAxiosAPI from "../../api/ListAxiosAPI";

const ExpenseList = () => {
  // const listData = [
  //     { category: '식비', money: '60000', date: '2023-06', detail: '스타벅스', deal: '지출' },
  //     { category: '교통/차량', money: '90000', date: '2023-06', detail: '스타벅스', deal: '지출' },
  //     { category: '주유', money: '90000', date: '2023-06', detail: '스타벅스', deal: '지출' },
  //     { category: '문화/레저', money: '30000', date: '2023-06', detail: '스타벅스', deal: '지출' },
  //     { category: '마트/편의점', money: '20000', date: '2023-06', detail: '스타벅스', deal: '지출' },
  //     { category: '패션/미용', money: '10000', date: '2023-06', detail: '스타벅스', deal: '지출' },
  // ];
  const [expenseListData, setExpenseListData] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const data = await ListAxiosAPI.getListExpense();
              const transformedData = data.map(item => ({
                  money: item.money,
                  date: item.date,
                  category: item.category,
                  detail: item.detail,
                  deal: "지출"
              }));
              setExpenseListData(transformedData);
          } catch (error) {
              console.error('조회 실패', error);
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
