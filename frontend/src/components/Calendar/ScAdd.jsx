import { useState } from "react";

import styled from "styled-components";
import BlockLine from "../Common/BlockLine";
import Modal from "../Common/Modal";
import ClickButton from "../Common/ClickButton";
import CalendarAxiosApi from "../../api/CalendarAxiosAPI";
import SelColor from "./SelColor";

import { ReactComponent as Post } from "../../assets/Post.svg";

const ScAdd = () => {
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
      const createSc = await CalendarAxiosApi.createSchedule({
        scDate,
        scName,
        scBudget,
        myColor: contentId,
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
          <div className="quick" onClick={openModal}>
            <Post width="15" height="15" fill="#575757" />
            <p className="label">간편 등록</p>
          </div>

          <div>
            <p className="label">날짜</p>
            <Input
              type="date"
              id="date"
              value={scDate}
              onChange={handleScDateChange}
            />
          </div>

          {/* <div>
            {isMypage ? (
              <></>
            ) : (
              <>
                <p className="label">날짜</p>
                <Input
                  type="date"
                  id="date"
                  value={scDate}
                  onChange={handleScDateChange}
                />
              </>
            )}
          </div> */}

          <div>
            <p className="label">일정</p>
            <Input value={scName} onChange={handleScNameChange} />
          </div>

          <div>
            <p className="label">예산</p>
            <Input value={scBudget} onChange={handleScBudgetChange} />
          </div>

          <SelColor
            // value={myColor}
            contentId={contentId}
            onContentIdChange={handleContentIdChange}
            isBasic={true}
          />

          {modalOpen && (
            <Modal open={modalOpen} close={closeModal} width={"300px"}></Modal>
          )}
        </InputContainer>
      </Container>
      <ButtonContainer>
        <ClickButton onClick={onCreateSc}>일정 등록</ClickButton>
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
    align-items: center;
    width: 90%;
    align-items: center;
    justify-content: center;
    vertical-align: center;
  }

  .quick {
    margin: 5px;
    align-items: center;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
