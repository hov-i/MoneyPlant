import axiosInstance from "./axiosInstance";

// axiosInstance 적용예시 입니다. axios랑 비슷하게 쓰면되요
const exampleAPI = {
  getUser: async (userId) => {
    return await axiosInstance.get(`/api/users/${userId}`);
  },

  updateUser: async (userId, data) => {
    return await axiosInstance.put(`/api/users/${userId}`, data);
  },

  deleteUser: async (userId) => {
    return await axiosInstance.delete(`/api/users/${userId}`);
  },
};

export default API;
