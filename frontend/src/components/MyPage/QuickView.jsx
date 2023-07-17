import React, { useState, useEffect } from "react";

import styled from "styled-components";
import BlockLine from "../Common/BlockLine";
import Box from "../Common/Box";
import Tag from "./Tag";
import ClickButton from "../Common/ClickButton";

import QuickAxiosApi from "../../api/QuickAddAxiosAPI";

const QuickView = ({ isBasic }) => {
  const onChangeValue = async () => {};

  const [myPageList, setMyPageList] = useState([]);

  useEffect(() => {
    const getMyPageList = async () => {
      try {
        const rsp = await QuickAxiosApi.getMyPageList();
        if (rsp.status === 200) setMyPageList(rsp.data);
        setMyPageList(rsp.data);
        console.log("마이페이지 list 조회");
      } catch (error) {
        console.error("Request Error:", error);
      }
    };
    getMyPageList();
  }, []);

  return (
    <>
      <Title>간편 등록</Title>
      <BlockLine />
      <Box height={"60%"}>
        {isBasic ? (
          <>
            {myPageList.myScheduleDtoList &&
              myPageList.myScheduleDtoList.map((data1) => (
                <Tag
                  width={"20%"}
                  color={data1.myColor}
                  detail={data1.myScName}
                />
              ))}
          </>
        ) : (
          <>
            {myPageList.myWorkDtoList &&
              myPageList.myWorkDtoList.map((data2) => (
                <Tag
                  width={"20%"}
                  color={data2.myColor}
                  detail={data2.myWkName}
                />
              ))}
          </>
        )}
      </Box>

      <ButtonContainer>
        <ClickButton onClick={onChangeValue} width={"100px"} height={"35px"}>
          선택하기
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
