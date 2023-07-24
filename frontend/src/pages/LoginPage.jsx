import * as React from "react";
import logo from "../assets/Logo.png";
import styled, { keyframes } from "styled-components";
import { useState } from "react";
import SignupForm from "../components/Common/SignupForm";
import LoginForm from "../components/Common/LoginForm";
import backGroundBubble from "../assets/backgroundBubble.png";

const LoginAndRegister = () => {
  const [value, setValue] = useState("login");
  const handleButtonClick = (newValue) => {
    setValue(newValue);
  };

  return (
    <BackGroundBox>
      <FloatingBackGround />
      <LoginContainer>
        <div className="loginbox">
          <div className="logo">
            <Logo src={logo} alt="#" />
            <div className="title">당신의 재산 지킴이가 되어 드릴게요!</div>
          </div>
          <div className="tabs">
            <button
              onClick={() => handleButtonClick("login")}
              className={value === "login" ? "button-active" : ""}
            >
              로그인
            </button>
            <button
              onClick={() => handleButtonClick("signup")}
              className={value === "signup" ? "button-active" : ""}
            >
              회원가입
            </button>
          </div>

          {value === "login" && <LoginForm />}
          {value === "signup" && (
            <SignupForm value={value} setValue={setValue} />
          )}
        </div>
      </LoginContainer>
    </BackGroundBox>
  );
};

export default LoginAndRegister;

const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  .logo {
    align-items: left;
    width: 350px;
  }

  .loginbox {
    border-radius: 10px;
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px;
    border-radius: 10px;
    background: url(${backGroundBubble}),
      lightgray 0px -3.768px / 100% 101.044% no-repeat,
      rgba(255, 255, 255, 0.16);
    box-shadow: 4px 4px 116px 0px rgba(97, 120, 201, 0.16),
      2px 2px 16px 0px rgba(255, 255, 255, 0.08) inset;
    backdrop-filter: blur(42px);
  }

  .tabs {
    margin-top: 10px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0);

    > button {
      color: ${({ theme }) => theme.textColor};
      border: none;
      cursor: pointer;
      width: 50%;
      height: 40px;
      background-color: rgba(255, 255, 255, 0);
      font-size: 1.4rem;
    }

    .button-active {
      font-weight: bold;
      color: ${({ theme }) => theme.text};
      border-bottom: 2px solid #87eec6;
    }
  }

  .signUpBox {
    display: flex;
    justify-content: space-between;
    width: 80%;
  }

  .click {
    color: gray;
    font-size: 1.5rem;
  }

  @media (max-width: 768px) {
    .signUpBox {
      width: 70%;
    }
    .loginbox {
      width: 100%;
      height: 100vh;
      border-radius: 0;
      align-items: center;
    }
  }

  .title {
    font-size: 16px;
    color: #575757;
    margin: 14px;
    margin-left: 0px;
    font-weight: bolder;
  }
`;
const BackGroundBox = styled.div`
  width: 100%;
  height: 100vh;
  display: ${(props) => (props.isMobile ? "block" : "flex")};
  justify-content: space-between;
  position: relative; /* Set the position to relative for the pseudo-element */
`;

const Logo = styled.img`
  width: 200px;
  max-height: 100%;
`;

const FloatingBackGround = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${backGroundBubble});
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;