import axios from "axios";

const DOMAIN = "https://localhost:8888";

let isLoginAlertShown = false; // 로그인 경고창 1번만 뜨게끔

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
                await axiosInstance.post(`${DOMAIN}/api/auth/refreshtoken`);
                console.log("쿠키 업데이트 성공");
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                if (!isLoginAlertShown) {
                    isLoginAlertShown = true;
                    alert("로그인이 필요합니다");
                    console.log("Failed to refresh token:", refreshError);
                    window.location.href = "/login";
                }
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
