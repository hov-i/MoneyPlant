import axios from "axios";

const isLocalEnv = window.location.hostname === 'localhost';

const DOMAIN = isLocalEnv ? 'http://localhost:8888/api' : '/api';

const axiosInstance = axios.create({
  baseURL: DOMAIN,
  withCredentials: true, // 쿠키 포함 설정
});

// 인증이 필요한 api요청들은 axios 말고 axiosInstance를 사용해주세요 (example 참고)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      try {
        await axios.post(`${DOMAIN}/api/auth/refreshtoken`, null, {
          withCredentials: true,
        });
        console.log("쿠키 업데이트 성공");
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        const isMobile = window.innerWidth <= 768; // Replace this with your mobile detection logic
        if (isMobile) {
          window.location.href = "/login";
        } else {
          window.location.href = "/help";
        }

        console.log("Failed to refresh token:", refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
