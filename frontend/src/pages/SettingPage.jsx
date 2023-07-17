import React from "react";
import Box from "../components/Common/Box";
import Header from "../components/Common/Header";
import Navbar from "../components/Common/Navbar";
import EditMyInfo from "../components/Setting/EditMyInfo";
import Container from "../components/Common/Container";
import useViewport from "../hooks/viewportHook";
import styled from "styled-components";
//import CalChart from "../components/Chart/CalChart";
import Logo from "../assets/Logo.png";

const Setting = () => {
  const { isMobile } = useViewport();

  return (
    <>
      <Header />
      <Navbar />
      <Container>
        <BoxContainer isMobile={isMobile}>
          <Box titleMargin={"20px"} height={"300px"} width={"45%"}>
            <EditMyInfo />
          </Box>
          {/* <Box titleMargin={"20px"} height={"300px"} width={"45%"}>
            <CalChart />
          </Box> */}
          <LogoBox>
            <Img className="logo" src={Logo} alt="logo" />
          </LogoBox>
        </BoxContainer>
      </Container>
    </>
  );
};

export default Setting;

const BoxContainer = styled.div`
  display: ${(props) => (props.isMobile ? "block" : "flex")};
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.isMobile ? "95%" : "90%")};
  margin: 0 auto;
`;

const LogoBox = styled.div`
  display: flex;
  width: 45%;
  /* margin-top: 50px; */
  justify-content: center;
  background-color: none;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Img = styled.img`
  width: 500px;
  opacity: 55%;

  @media (max-width: 768px) {
    width: 80%;
  }
`;
