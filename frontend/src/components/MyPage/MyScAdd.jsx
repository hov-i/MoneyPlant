import styled from "styled-components";
import BlockLine from "../Common/BlockLine";
import ClickButton from "../Common/ClickButton";
import { useState } from "react";
import MyPageAxiosApi from "../../api/MyPageAxiosAPI";
import SelColor from "../../components/Calendar/SelColor";

const MyScAdd = (width) => {
  const [contentId, setContentId] = useState(1);
  const [myScName, setMyScName] = useState("");
  const [myScBudget, setMyScBudget] = useState("");

  const handleMyScNameChange = (event) => {
    setMyScName(event.target.value);
  };

  const handleMyScBudgetChange = (event) => {
    setMyScBudget(event.target.value);
  };

  const handleContentIdChange = (id) => {
    setContentId(id);
  };

  // const handleMyColorChange = (event) => {
  //   setDefaultMyColor(event.target.value);
  // };

  const onCreateMySc = async () => {
    try {
      const amount = parseInt(myScName);
      const createMySc = await MyPageAxiosApi.createMySchedule(
        contentId.toExponential,
        amount,
        myScBudget
      );
      if (createMySc.data === "일정을 성공적으로 생성했습니다.") {
        console.log("입력 성공");
        window.location.reload();
      } else {
        console.log("입력 실패");
        window.location.reload();
      }
    } catch (error) {
      console.log("에러:", error);
    }
  };

  return (
    <>
      <Container width={width}>
        <Title>일정 등록</Title>
        <BlockLine />

        <InputContainer>
          <p className="label">일정</p>
          <Input value={myScName} onChange={handleMyScNameChange} />
          <p className="label">예산</p>
          <Input value={myScBudget} onChange={handleMyScBudgetChange} />
          {/* <p className="label">color</p> */}
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

export default MyScAdd;

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
    width: ${({ width }) => width || "auto"};
    margin: 10px;
    font-size: 15px;
    align-items: center;
    justify-content: center;
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
