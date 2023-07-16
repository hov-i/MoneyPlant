import React from "react";
import Box from "../components/Common/Box";
import Header from "../components/Common/Header";
import Navbar from "../components/Common/Navbar";
import EditMyInfo from "../components/Setting/EditMyInfo";
import Container from "../components/Common/Container";
import useViewport from "../hooks/viewportHook";
import styled from "styled-components";
import CalChart from "../components/Chart/CalChart"

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
        <Box titleMargin={"20px"} height={"300px"} width={"45%"}>
          <CalChart/>
        </Box>
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
