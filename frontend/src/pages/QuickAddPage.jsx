import React from "react";
import styled from "styled-components";
import Header from "../components/Common/Header";
import Navbar from "../components/Common/Navbar";
import Container from "../components/Common/Container";
import Box from "../components/Common/Box";
import TagBox from "../components/MyPage/TagBox";
import useViewport from "../hooks/viewportHook";
import QuickAdd from "../components/MyPage/QuickAdd";

const Mypage = () => {
  const { isMobile } = useViewport();

  return (
    <>
      <Header />
      <Navbar />
      <Container>
        <Box titleMargin={"30px"}>
          <p className="title">간편 입력</p>

          <Display isMobile={isMobile}>
            <TagBox tag={"일정"}>
              <QuickAdd isBasic={true} />
            </TagBox>

            <TagBox tag={"근무"}>
              <QuickAdd isBasic={false} />
            </TagBox>
          </Display>
        </Box>
      </Container>
    </>
  );
};

export default Mypage;

const Display = styled.div`
  display: ${(props) => (props.isMobile ? "block" : "flex")};
`;
