import axiosInstance from "./axiosInstance";

const QuickAddAxiosApi = {
  // 나의 일정 생성
  // createMySchedule: async (inputValues) => {
  //   try {
  //     const response = await axiosInstance.post(
  //       "/mypage/create/schedule",
  //       inputValues
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.error("Request Error:", error);
  //   }
  // },

  // 나의 근무 생성
  // createMyWork: async (inputValues) => {
  //   try {
  //     const response = await axiosInstance.post(
  //       "/mypage/create/work",
  //       inputValues
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.error("Request Error:", error);
  //   }
  // },

  // 마이페이지 전체 조회
  getMyPageList: async () => {
    try {
      return await axiosInstance.get("/mypage");
    } catch (error) {
      throw error;
    }
  },
};

export default QuickAddAxiosApi;
