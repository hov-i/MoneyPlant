import React from "react";

import styled from "styled-components";
import BlockLine from "../Common/BlockLine";
import Box from "../Common/Box";
import QuickAdd from "./QuickAdd";
import ClickButton from "../Common/ClickButton";

const QuickView = ({ isBasic }) => {
  const onChangeValue = async () => {};

  return (
    <>
      <Title>간편 등록</Title>
      <BlockLine />
      <Box height={"60%"}>
        {isBasic ? <QuickAdd isBasic={true} /> : <QuickAdd isBasic={false} />}
      </Box>

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
  margin: 20px 10px;

`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
