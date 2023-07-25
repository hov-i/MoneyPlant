import { useState } from "react";

import styled from "styled-components";
import BlockLine from "../Common/BlockLine";
import Modal from "../Common/Modal";
import ClickButton from "../Common/ClickButton";
import QuickView from "../MyPage/QuickView";
import CalendarAxiosApi from "../../api/CalendarAxiosAPI";
import SelColor from "./SelColor";

import { ReactComponent as Delete } from "../../assets/delete.svg";
import { ReactComponent as Post } from "../../assets/Post.svg";

const ScAdd = ({ isBasic, isUpdate, isQuick, value, data }) => {
  const [schedule, setSchedule] = useState({
    scId: data ? data.scId : null,
    scDate: data ? data.scDate : "",
    scName: data ? data.scName : "",
    scBudget: data ? data.scBudget : "",
    colorId: data ? data.colorId : 1,
  });

  const handleScheduleChange = (key, value) => {
    setSchedule((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  // const setvalue = new Date(value);
  // setvalue.setDate(setvalue.getDate() + 1);
  // const scDate = setvalue.toISOString().split("T")[0];

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleScDateChange = (event) => {
    handleScheduleChange("scDate", event.target.value);
  };

  const handleScNameChange = (event) => {
    handleScheduleChange("scName", event.target.value);
  };

  const handleScBudgetChange = (event) => {
    handleScheduleChange("scBudget", event.target.value);
  };

  const handleColorIdChange = (newValue) => {
    handleScheduleChange("colorId", newValue);
  };

  const onCreateSc = async () => {
    try {
      const createSc = await CalendarAxiosApi.createSchedule(isQuick, schedule);

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

  const onUpdateSc = async () => {
    try {
      const createSc = await CalendarAxiosApi.updateSchedule(schedule);

      if (createSc.data === "일정을 성공적으로 수정했습니다.") {
        console.log("일정 삭제 성공");
        window.location.reload();
      } else {
        console.log("일정 삭제 실패");
        window.location.reload();
      }
    } catch (error) {
      console.log("에러:", error);
    }
  };

  const onDeleteSc = async () => {
    try {
      const deleteSchedule = await CalendarAxiosApi.deleteSchedule(data.scId);
      if (deleteSchedule.data === "일정을 성공적으로 삭제헸습니다.") {
        console.log("일정 삭제 성공");
        window.location.reload();
      } else {
        console.log("일정 삭제 실패");
        window.location.reload();
      }
    } catch (error) {
      console.log("에러:", error);
    }
  };

  return (
    <ScAddContainer>
      {isUpdate ? (
        <div className="icon">
          <Delete onClick={onDeleteSc} />
        </div>
      ) : (
        <>
          {isQuick ? (
            <></>
          ) : (
            <div className="icon">
              <Post width="18" height="18" onClick={openModal} />
            </div>
          )}
        </>
      )}

      {isUpdate ? <Title>일정 수정</Title> : <Title>일정 등록</Title>}
      <BlockLine />

      <InputContainer>
        {isBasic ? (
          <>
            <div>
              <p className="label">날짜</p>
              <Input
                type="date"
                id="date"
                value={schedule.scDate}
                onChange={handleScDateChange}
              />
            </div>
          </>
        ) : (
          <></>
        )}

        {isUpdate ? (
          <>
            <div>
              <p className="label">날짜</p>
              <Input
                type="date"
                id="date"
                value={schedule.scDate}
                onChange={handleScDateChange}
              />
            </div>
          </>
        ) : (
          <></>
        )}

        <div>
          <p className="label">일정</p>
          <Input value={schedule.scName} onChange={handleScNameChange} />
        </div>

        <div>
          <p className="label">예산</p>
          <Input value={schedule.scBudget} onChange={handleScBudgetChange} />
        </div>

        <SelColor
          value={schedule.colorId}
          onChange={handleColorIdChange}
          isBasic={true}
        />
      </InputContainer>

      {isUpdate ? (
        <>
          <ButtonContainer>
            <ClickButton onClick={onUpdateSc}>수정하기</ClickButton>
          </ButtonContainer>
        </>
      ) : (
        <>
          <ButtonContainer>
            <ClickButton onClick={onCreateSc}>등록하기</ClickButton>
          </ButtonContainer>
        </>
      )}

      {modalOpen && (
        <Modal open={modalOpen} close={closeModal} width={"300px"}>
          <QuickView
            isBasic={true}
            data={schedule}
            setData={setSchedule}
            close={closeModal}
          />
          {/*<QuickView isBasic={true} data={data} changeData={changeData}/>*/}
        </Modal>
      )}
    </ScAddContainer>
  );
};

export default ScAdd;

const ScAddContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  position: relative;
  font-size: 15px;
  .icon {
    position: absolute;
    left: 1vw;
    margin: 15px;
    margin-top: 20px;
    cursor: pointer;

    > svg {
      fill: ${({ theme }) => theme.menuColor};
    }
  }
`;

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
    color: ${({ theme }) => theme.menuColor};
    font-size: 10px;
    margin-bottom: 20px;
    > svg {
      fill: ${({ theme }) => theme.menuColor};
    }
  }
  .quick-text {
    font-size: 15px;
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
