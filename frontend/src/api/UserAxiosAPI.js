import axios from "axios";
const DOMAIN = "";

const UserAxiosAPI = {
  getUserInfo: async () => {
    try {
      return await axios.get(DOMAIN + "/user/me", { withCredentials: true });
    } catch (e) {
      console.log("getUserInfo : " + e);
    }
  },

// 비밀번호 찾기
  postEmailSend: async (inputEmail) => {
    try {
      const response = await axios.post(
        DOMAIN + "/mail/sendmail",
        {
          type: "findPw",
          email: inputEmail,
        },
        { withCredentials: true }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("postEmailSend: " + error);
      throw error;
    }
  },
};

export default UserAxiosAPI;
