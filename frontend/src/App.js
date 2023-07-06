import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // 브라우저 라우터 이름 변경
import { ThemeProvider } from "./components/themeProvider";
import Home from "./pages/MainHome/HomePage";
import Login from "./pages/LoginPage";
import MainList from "./pages/MainListPage";
import Mybudget from "./pages/MybudgetPage";
import Chart from "./pages/ChartPage";
import GlobalStyle from "./styles/GlobalStyle";
import Mypage from "./pages/MypagePage";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <>
      <ThemeProvider>
        <GlobalStyle />
        <GoogleOAuthProvider clientId="424508353024-c5edcpeveh5okgqi047k8odsj3vgksa6.apps.googleusercontent.com">
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/mainlist" element={<MainList />} />
              <Route path="/chart" element={<Chart />} />
              <Route path="/mybudget" element={<Mybudget />} />
              <Route path="/mypage" element={<Mypage />} />
            </Routes>
          </Router>
        </GoogleOAuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
