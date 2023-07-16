import React, { useState, useEffect } from "react";

import Tag from "./Tag";
// import TagBox from "./TagBox";

import QuickAxiosApi from "../../api/QuickAddAxiosAPI";

const QuickAdd = ({ isBasic }) => {
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

  // onClick 하면, 일정 이름과 색을 받아 줌 .
  const onclickChangeScValue = () => {};

  // onClick 하면, 근무 이름과 색 그 외 필요한 전부를 모두 받아 줌 .
  const onclickChangeWkValue = () => {};

  return (
    <>
      {isBasic ? (
        <>
          {myPageList.myScheduleDtoList &&
            myPageList.myScheduleDtoList.map((data1) => (
              <Tag
                width={"20%"}
                color={data1.myColor}
                detail={data1.myScName}
                onclick={onclickChangeScValue}
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
                onclick={onclickChangeWkValue}
              />
            ))}
        </>
      )}
    </>
  );
};
export default QuickAdd;
