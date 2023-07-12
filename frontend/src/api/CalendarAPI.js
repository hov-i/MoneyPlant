import axiosInstance from "./axiosInstance";

const AxiosApi = {
  createSchedule: async (inputValues) => {
    try {
      const response = await axiosInstance.post("/calendar/create/schedule", inputValues);

      return response.data;
    } catch (error) {
      console.error("Request Error:", error);
      throw error;
    }
  },

  createWork: async (inputValues) => {
    try {
      const response = await axiosInstance.post("/calendar/create/work", inputValues);
      return response.data;
    } catch (error) {
      console.error("Request Error:", error);
      throw error;
    }
  },

  getCalendarView: async () => {
    try {
      const response = await axiosInstance.get("/calendar");
      const { dailyExpenseList, dailyIncomeList } = response.data || {};

      // dailyExpenseList에서 date와 amount 값 가져오기
      const expenseDates = Object.keys(dailyExpenseList);
      const expenseAmounts = Object.values(dailyExpenseList);

      // dailyIncomeList에서 date와 amount 값 가져오기
      const incomeDates = Object.keys(dailyIncomeList);
      const incomeAmounts = Object.values(dailyIncomeList);

      console.log("지출 날짜"+expenseDates); // 응답 데이터 출력
      console.log("수입 날짜"+incomeDates); // 응답 데이터 출력

      return {
        expenseDates,
        expenseAmounts,
        incomeDates,
        incomeAmounts,
        dailyExpenseList,
        dailyIncomeList
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export default AxiosApi;
