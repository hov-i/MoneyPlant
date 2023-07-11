import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import BlockLine from "../Common/BlockLine";
import ClickButton from "../Common/ClickButton";
import MyPageAxiosApi from "../../api/MyPageAxiosAPI";
import SelColor from "./SelColor";

const ScAdd = ({ isMypage, value }) => {
  const navigate = useNavigate();

  const [contentId, setContentId] = useState(1);
  const [myScName, setMyScName] = useState("");
  const [myScBudget, setMyScBudget] = useState("");

  const setvalue = new Date(value);
  setvalue.setDate(setvalue.getDate() + 1);
  const date = setvalue.toISOString().split('T')[0];

  const handleMyScNameChange = (event) => {
    setMyScName(event.target.value);
  };

  const handleMyScBudgetChange = (event) => {
    setMyScBudget(event.target.value);
  };

  const handleContentIdChange = (event) => {
    setContentId(event.target.contentId);
  };

  const onCreateMySc = async () => {
    try {
      const createMySc = await MyPageAxiosApi.createMySchedule({
        date,
        myScName,
        myScBudget,
        myColor: contentId,
      });

      if (createMySc.data === "일정을 성공적으로 생성했습니다.") {
        console.log("입력 성공");
        navigate("/mypage");
      } else {
        console.log("입력 실패");
        navigate("/mypage");
      }
    } catch (error) {
      console.log("에러:", error);
    }
  };

  return (
    <>
      <Container>
        <Title>일정 등록</Title>
        <BlockLine />

        <InputContainer>
          {isMypage ? (
            <></>
          ) : (
            <>
              <p className="label">날짜</p>
              <Input type="date" id="date" value={date} />
            </>
          )}
          <p className="label">일정</p>
          <Input value={myScName} onChange={handleMyScNameChange} />
          <p className="label">예산</p>
          <Input value={myScBudget} onChange={handleMyScBudgetChange} />
          <SelColor
            // value={myColor}
            contentId={contentId}
            onContentIdChange={handleContentIdChange}
            isBasic={true}
          />
        </InputContainer>
      </Container>
      <ButtonContainer>
        <ClickButton onClick={onCreateMySc}>일정 등록</ClickButton>
      </ButtonContainer>
    </>
  );
};

export default ScAdd;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 70%;
  border-top: none;
  border-left: none;
  color: lightgray;
  border-right: none;
  border-bottom: 1px solid lightgray;
  text-align: right;
  outline: none;
  background-color: rgba(255, 255, 255, 0);

  :focus {
    border-bottom: 1px solid ${({ theme }) => theme.menuColor};
    color: ${({ theme }) => theme.menuColor};
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  .label {
    margin: 10px;
    font-size: 15px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 200px;
  margin: 20px;
  div {
    display: flex;
    flex-direction: row;
    margin: 5px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
