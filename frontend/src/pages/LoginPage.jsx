import * as React from "react";

import logo1 from "../assets/logo1.png";
import styled from "styled-components";
import { useState } from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

const LoginAndRegister = () => {
  const [value, setValue] = useState("login");
  const handleButtonClick = (newValue) => {
    setValue(newValue);
  };

  return (
    <LoginContainer>
      <div className="loginbox">
        {/* Temporary logo will be changed */}
        <div className="loginbox-top">
          <Img className="logo" src={logo1} alt="logo1" />
          <div className="tabs">
            <button
              onClick={() => handleButtonClick("login")}
              className={value === "login" ? "button-active" : ""}>
              Login
            </button>
            <button
              onClick={() => handleButtonClick("signup")}
              className={value === "signup" ? "button-active" : ""}>
              Sign Up
            </button>
          </div>
        </div>
        {value === "login" && <LoginForm />}
        {value === "signup" && <SignupForm value={value} setValue={setValue} />}
      </div>
    </LoginContainer>
  );
};

export default LoginAndRegister;

const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .loginbox {
    background-color: ${({ theme }) => theme.bgColor};
    border-radius: 10px;
    width: 450px;
    height: 520px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border: 1px solid #87eec5;
  }

  .tabs {
    margin-top: 10px;
    width: 100%;
    > button {
      background-color: ${({ theme }) => theme.bgColor};
      color: ${({ theme }) => theme.textColor};
      border: none;
      cursor: pointer;
      width: 50%;
      height: 40px;
      font-size: 1.5rem;
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
`;

const Img = styled.img`
  max-width: 400px;
  display: block;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 80%;
  }
`;
