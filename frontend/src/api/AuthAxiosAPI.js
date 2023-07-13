import axios from "axios";

const DOMAIN = "https://localhost:8888"; // 이거 .env파일에 넣어서 관리하는 건 어떨까요 파일마다 쓰기 귀찮잖아요

const AuthAPI = axios.create({
  baseURL: DOMAIN, // 기본 url 주소 설정
  withCredentials: true, // 쿠키를 받고 전송하기 위한 설정
});

const AuthAxiosAPI = {
  // login
  login: async (email, password) => {
    const loginUser = {
      email: email,
      password: password,
    };
    console.log(loginUser);
    return await AuthAPI.post("/auth/signin", loginUser);
  },
  logout: async () => {
    return await AuthAPI.post("api/auth/signout");
  },
  signup: async (email, name, password, role) => {
    const SignupUser = {
      email,
      name,
      password,
      role: role !== undefined ? role : null,
    };
    try {
      return await axios.post(`${DOMAIN}/auth/signup`, SignupUser);
    } catch (error) {
      throw error;
    }
  },

  SignupAdmin: async (email, name, password) => {
    const SignupAdmin = {
      email,
      name,
      password,
      role: "admin",
    };
    return await axios.post(DOMAIN + "/auth/signup", SignupAdmin);
  },

  // 구글 로그인 주소 리다이렉트
  GoogleLogin: async () => {
    try {
      const url = await axios.get(DOMAIN + "/auth/google");
      console.log(url);
      return url;
    } catch (error) {
      console.log(error);
    }
  },
};

export default AuthAxiosAPI;
