import axiosInstance from "./axiosInstance";

const ListAxiosAPI = {
  // ListPage
  getListIncome: async () => {
    try {
      const response = await axiosInstance.get("/check/income/category");
      const data = response.data.map((item) => ({
        money: item.incomeAmount,
        date: item.incomeDate,
        category: item.categoryIncomeName,
        detail: item.incomeContent,
        deal: "수입",
      }));
      return data;
    } catch (error) {
      console.error("Income List 조회가 불가능합니다.");
      throw error;
    }
  },

  getListExpense: async () => {
    try {
      const response = await axiosInstance.get("/check/expense/category");
      const data = response.data.map((item) => ({
        money: item.expenseAmount,
        date: item.expenseDate,
        category: item.categoryName,
        detail: item.expenseContent,
        deal: "지출",
      }));
      return data;
    } catch (error) {
      console.error("Expense List 조회가 불가능합니다.");
      throw error;
    }
  },

  // ChartPage
  getLineChart: async () => {
    try {
      const response = await axiosInstance.get("/ledger/statistics/monthly");
      const transformedData = Object.entries(response.data).map(
        ([date, value]) => ({
          x: date,
          l: value,
        })
      );
      return transformedData;
    } catch (error) {
      console.error("월간 합계 조회가 불가능합니다.", error);
      throw error;
    }
  },

  getBarIncomeChart: async () => {
    try {
      const response = await axiosInstance.get("/ledger/income/monthly");

      const transformedData = Object.entries(response.data).map(
        ([date, value]) => ({
          v: value !== null ? value : 0, // value 값이 null인 경우 0으로 처리
          x: date,
        })
      );

      return transformedData;
    } catch (error) {
      console.error("월간 수입 합계 조회가 불가능 합니다.");
      throw error;
    }
  },

  getBarExpenseChart: async () => {
    try {
      const response = await axiosInstance.get("/ledger/expense/monthly");
      const transformedData = Object.entries(response.data).map(
        ([date, value]) => ({
          v1: value !== null ? value : 0, // value 값이 null인 경우 0으로 처리
          x: date,
        })
      );
      return transformedData;
    } catch (error) {
      console.error("월간 지출 합계 조회가 불가능 합니다.");
      throw error;
    }
  },

  getPieChart: async () => {
    try {
      const response = await axiosInstance.get(
        "/check/expense/sum-by-category"
      );
      const data = Object.entries(response.data).map(([key, value]) => ({
        value: value,
        label: key.split("_")[0], // 카테고리명만 보여주기 위함
        id: key.split("_")[0],
        category: key.split("_")[0],
      }));
      return data;
    } catch (error) {
      console.error("pieChart 조회가 불가능합니다.");
      throw error;
    }
  },
};

export default ListAxiosAPI;
