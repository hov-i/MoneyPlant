import axiosInstance from "./axiosInstance";

const BudgetAxiosApi = {
  // 나의 예산 생성
  createMyBudget: async (inputValues) => {
    try {
      const response = await axiosInstance.post("/mybudget", inputValues);

      return response.data;
    } catch (error) {
      console.error("Request Error:", error);
    }
  },

  getMyBudget: async () => {
    try {
      return await axiosInstance.get("/mybudget");
    } catch (e) {
      throw e;
    }
  },
};

export default BudgetAxiosApi;
