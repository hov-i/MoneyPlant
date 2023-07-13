import React, { useState } from "react";

import styled from "styled-components";
import BlockLine from "../Common/BlockLine";
import Modal from "../Common/Modal";
import ClickButton from "../Common/ClickButton";
import CalendarAxiosApi from "../../api/CalendarAxiosAPI";
import SelColor from "./SelColor";
import SelType from "./SelType";

import { ReactComponent as Post } from "../../assets/Post.svg";

const WorkAdd = ({ isQuick }) => {
  const [contentId, setContentId] = useState(5);
  const [workDate, setDate] = useState("");
  const [workName, setWorkName] = useState("");
  const [payType, setPayType] = useState(1);
  const [workMoney, setWorkMoney] = useState("");
  const [workStart, setWorkStart] = useState("");
  const [workEnd, setWorkEnd] = useState("");
  const [workRest, setWorkRest] = useState("");
  const [workCase, setWorkCase] = useState("");
  const [workTax, setWorkTax] = useState("");
  const [payday, setPayday] = useState("");

  const [isHourly, setIsHourly] = useState(true);
  const [isCase, setIsCase] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleWkDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleWorkNameChange = (event) => {
    setWorkName(event.target.value);
  };

  // 카테고리 값 가져오기
  const onChangePayType = (selectedItem) => {
    setPayType(parseInt(selectedItem));

    switch (parseInt(selectedItem)) {
      case 1: // 시급
        setIsHourly(true);
        setIsCase(false);
        break;

      case 2: // 건별
        setIsHourly(false);
        setIsCase(true);
        break;

      case 3: // 일급
        setIsHourly(false);
        setIsCase(false);
        break;

      case 4: // 월급
        setIsHourly(false);
        setIsCase(false);
        break;

      default:
    }
  };

  const handleWorkMoneyChange = (event) => {
    setWorkMoney(event.target.value);
  };

  const handleWorkStartChange = (event) => {
    setWorkStart(event.target.value);
  };

  const handleWorkEndChange = (event) => {
    setWorkEnd(event.target.value);
  };

  const handleWorkRestChange = (event) => {
    setWorkRest(event.target.value);
  };

  const handleWorkCaseChange = (event) => {
    setWorkCase(event.target.value);
  };

  const handleWorkTaxChange = (event) => {
    setWorkTax(event.target.value);
  };

  const handlePaydayChange = (event) => {
    setPayday(event.target.value);
  };

  const handleContentIdChange = (event) => {
    setContentId(event);
  };

  const onCreateWork = async () => {
    try {
      const createWork = await CalendarAxiosApi.createWork({
        workDate,
        workName,
        payType,
        workStart,
        workEnd,
        payday,
        colorId: contentId,
      });

      if (createWork.data === "근무를 성공적으로 생성했습니다.") {
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
        <Title>근무 등록</Title>
        <BlockLine />

        <InputContainer>
          <div className="quick" onClick={openModal}>
            <Post width="15" height="15" fill="#575757" />
            <p className="label">간편 등록</p>
          </div>

          <div>
            {isQuick ? (
              <></>
            ) : (
              <>
                <p className="label">날짜</p>
                <Input
                  type="date"
                  id="date"
                  value={workDate}
                  onChange={handleWkDateChange}
                />
              </>
            )}
          </div>

          <div>
            <p className="label">근무이름</p>
            <Input value={workName} onChange={handleWorkNameChange} />
          </div>

          <p className="label">급여</p>
          <div>
            {/* <MyType value={myPayType.toString()} onChange={onChangeMyPayType} /> */}
            <SelType
              value={payType}
              myPayType={payType}
              onChange={onChangePayType}
            />
            <Input value={workMoney} onChange={handleWorkMoneyChange} />

            <p className="text">원</p>
          </div>

          {isHourly ? (
            <>
              <p className="label">근무시간</p>
              <div>
                <Input
                  type="time"
                  value={workStart}
                  onChange={handleWorkStartChange}
                />
                <p className="label"> - </p>
                <Input
                  type="time"
                  value={workEnd}
                  onChange={handleWorkEndChange}
                />
              </div>

              <div>
                <p className="label">휴게시간</p>
                <Input
                  type="number"
                  min="0"
                  value={workRest}
                  onChange={handleWorkRestChange}
                />
                <p className="text">분</p>
              </div>
            </>
          ) : (
            <></>
          )}

          {isCase ? (
            <div>
              <p className="label">건 수</p>
              <Input value={workCase} onChange={handleWorkCaseChange} />
              <p className="text">건</p>
            </div>
          ) : (
            <></>
          )}

          <div>
            <p className="label">세 금</p>
            <Input value={workTax} onChange={handleWorkTaxChange} />
            <p className="text">%</p>
          </div>

          <div>
            <p className="label">급여일</p>
            <Input type="date" value={payday} onChange={handlePaydayChange} />
          </div>

          {/* <p className="label">color</p> */}
          <SelColor
            // value={myColor}
            contentId={contentId}
            onContentIdChange={handleContentIdChange}
          />

          {modalOpen && (
            <Modal open={modalOpen} close={closeModal} width={"300px"}></Modal>
          )}
        </InputContainer>
      </Container>
      <ButtonContainer>
        <ClickButton onClick={onCreateWork}>근무 등록</ClickButton>
      </ButtonContainer>
    </>
  );
};

export default WorkAdd;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 55%;
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
    margin: 5px;
    margin-top: 10px;
    font-size: 15px;
    align-items: center;
    justify-content: center;
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
