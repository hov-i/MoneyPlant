import React from "react";

import styled from "styled-components";
import Container from "../Common/Container";
import BlockLine from "../Common/BlockLine";
import Box from "../Common/Box";
import QuickAdd from "../MyPage/QuickView";
import ClickButton from "../Common/ClickButton";

const QuickView = () => {
  const onChangeValue = async () => {};

  return (
    <>
      <Container>
        <Title>간편 등록</Title>
        <BlockLine />
        <Box><QuickAdd isBasic={true} /></Box>
      </Container>

      <ButtonContainer>
        <ClickButton onClick={onChangeValue} width={"100px"} height={"35px"}>
          선택
        </ClickButton>
      </ButtonContainer>
    </>
  );
};

export default QuickView;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
