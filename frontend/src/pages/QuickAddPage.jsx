import React, { useState, useEffect } from "react";

import styled from "styled-components";
import Header from "../components/Common/Header";
import Navbar from "../components/Common/Navbar";
import Container from "../components/Common/Container";
import Box from "../components/Common/Box";
import Tag from "../components/MyPage/Tag";
import TagBox from "../components/MyPage/TagBox";
import useViewport from "../hooks/viewportHook";

import CalendarAxiosAPI from "../api/CalendarAxiosAPI";

const Mypage = () => {
  const { isMobile } = useViewport();
  const [myPageList, setMyPageList] = useState([]);

  useEffect(() => {
    const getMyPageList = async () => {
      try {
        const rsp = await CalendarAxiosAPI.getMyPageList();
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
      <Header />
      <Navbar />
      <Container>
        <Box titleMargin={"30px"}>
          <p className="title">간편 입력</p>

          <Display isMobile={isMobile}>
            <TagBox tag={"일정"}>
              {myPageList.myScheduleDtoList &&
                myPageList.myScheduleDtoList.map((data1) => (
                  <Tag
                    width={"20%"}
                    color={data1.colorId}
                    detail={data1.scName}
                  />
                ))}
            </TagBox>

            <TagBox tag={"근무"}>
              {myPageList.myWorkDtoList &&
                myPageList.myWorkDtoList.map((data2) => (
                  <Tag
                    width={"20%"}
                    color={data2.colorId}
                    detail={data2.workName}
                  />
                ))}
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
  flex-direction: row;
`;
