import axios from "axios";
const MPT_DOMAIN = "https://localhost:8888";

const AxiosApi = {
  createSchedule: async (inputValues) => {
    try {
      const response = await axios.post(
        MPT_DOMAIN + "/calendar/create/schedule",
        inputValues,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Request Error:", error);
      throw error;
    }
  },

  createWork: async (inputValues) => {
    try {
      const response = await axios.post(
        MPT_DOMAIN + "/calendar/create/work",
        inputValues,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Request Error:", error);
      throw error;
    }
  },

  getCalendarView: async () => {
    return await axios.get(MPT_DOMAIN + "/calendar", {
      withCredentials: true,
    });
  },
};

export default AxiosApi;
