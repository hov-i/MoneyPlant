import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import NotoSansRefular from '../assets/fonts/NotoSansKR-Regular.woff2';

// 전역스타일링: 모든 곳에 쓰이는 style입니다.
const GlobalStyle = createGlobalStyle`
  ${reset}

  *, *::before, *::after {
    box-sizing: border-box;
  }

  @font-face {
    font-family: "Noto Sans KR";
    src: url(${NotoSansRefular}) format("woff2");
  }
  
  html {
    font-size: 62.5%; // 10px = 1rem;
    font-family: "Noto Sans KR";// 폰트 설정
  }  

  button{
    font-family: "Noto Sans KR";// 폰트 설정
  }

  div{
    font-family: "Noto Sans KR";// 폰트 설정
  }

  input{
    font-family: "Noto Sans KR";// 폰트 설정
  }

  Avatar{
    font-family: "Noto Sans KR";// 폰트 설정
  }
  
  body {
    font-family: "Noto Sans KR";// 폰트 설정
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.textColor};
    width: 100%;
    min-height: 100vh;
    margin: 0 auto;
  }
`;

export default GlobalStyle;
