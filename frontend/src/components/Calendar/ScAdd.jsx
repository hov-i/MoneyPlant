import { useState } from "react";

import styled from "styled-components";
import BlockLine from "../Common/BlockLine";
import Modal from "../Common/Modal";
import QuickAdd from "../MyPage/QuickView";
import ClickButton from "../Common/ClickButton";
import CalendarAxiosApi from "../../api/CalendarAxiosAPI";
import SelColor from "./SelColor";

import { ReactComponent as Post } from "../../assets/Post.svg";

const ScAdd = ({ isQuick }) => {
  const [contentId, setContentId] = useState(1);
  const [scDate, setScDate] = useState("");
  const [scName, setScName] = useState("");
  const [scBudget, setScBudget] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleScDateChange = (event) => {
    setScDate(event.target.value);
  };

  const handleScNameChange = (event) => {
    setScName(event.target.value);
  };

  const handleScBudgetChange = (event) => {
    setScBudget(event.target.value);
  };

  const handleContentIdChange = (event) => {
    setContentId(event);
    // setContentId(event.target.contentId);
  };

  const onCreateSc = async () => {
    try {
      const createSc = await CalendarAxiosApi.createSchedule(isQuick, {
        scDate,
        scName,
        scBudget,
        colorId: contentId,
      });

      if (createSc.data === "일정을 성공적으로 생성했습니다.") {
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
      <Container>
        <Title>일정 등록</Title>
        <BlockLine />

        <InputContainer>
          {isQuick ? (
            <></>
          ) : (
            <>
              <div className="quick" onClick={openModal}>
                <Post width="12" height="12" fill="#575757" />
                <p className="quick-text">간편 등록</p>
              </div>
              <div>
                <p className="label">날짜</p>
                <Input
                  // className="date"
                  type="date"
                  id="date"
                  value={scDate}
                  onChange={handleScDateChange}
                />
                <p> ㅤ </p>
              </div>
            </>
          )}

          <div>
            <p className="label">일정</p>
            <Input value={scName} onChange={handleScNameChange} />
            <p> ㅤ </p>
          </div>

          <div>
            <p className="label">예산</p>
            <Input
              className="budget-size"
              value={scBudget}
              onChange={handleScBudgetChange}
            />
            <p className="text">원</p>
          </div>

          <SelColor
            // value={myColor}
            contentId={contentId}
            onContentIdChange={handleContentIdChange}
            isBasic={true}
          />
        </InputContainer>
      </Container>
      <ButtonContainer>
        <ClickButton onClick={onCreateSc}>일정 등록</ClickButton>
      </ButtonContainer>

      {modalOpen && (
        <Modal open={modalOpen} close={closeModal} width={"300px"}>
          <QuickAdd />
        </Modal>
      )}
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
  width: 60%;
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
  .text {
    font-size: 12px;
    align-items: center;
    justify-content: center;
    margin: 3px;
    margin-top: 9px;
    color: gray;
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 200px;
  margin: 20px;
  padding-left: 5px;

  div {
    display: flex;
    flex-direction: row;
    margin: 5px;
    align-items: center;
    width: 90%;
    align-items: center;
    justify-content: center;
    vertical-align: center;
  }
  .quick {
    margin: 10px;
    align-items: center;
    color: #575757;
    font-size: 10px;
  }
  .quick-text {
    font-size: 12px;
    margin: 3px;
    cursor: pointer;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
