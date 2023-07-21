import React, { useEffect, useState } from "react";

import styled from "styled-components";
import BlockLine from "../Common/BlockLine";
import Modal from "../Common/Modal";
import QuickView from "../MyPage/QuickView";
import ClickButton from "../Common/ClickButton";
import CalendarAxiosApi from "../../api/CalendarAxiosAPI";
import SelColor from "./SelColor";
import SelType from "./SelType";

import { ReactComponent as Delete } from "../../assets/delete.svg";
import { ReactComponent as Post } from "../../assets/Post.svg";

const WorkAdd = ({ isBasic, isUpdate, isQuick, data, workId }) => {
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const [work, setWork] = useState({
    workId: data ? data.workId : null,
    workDate: data ? data.workDate : "",
    workName: data ? data.workName : "",
    payType: data ? data.payType : 1,
    workMoney: data ? data.workMoney : 0,
    workStart: data ? data.workStart : "",
    workEnd: data ? data.workEnd : "",
    workRest: data ? data.workRest : 0,
    workCase: data ? data.workCase : 0,
    workTax: data ? data.workTax : 0.0,
    payday: data ? data.payday : "",
    colorId: data ? data.colorId : 5,
    workPay: data ? data.workPay : 0,
  });

  const handleWorkChange = (key, value) => {
    setWork((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  // const setvalue = new Date(value);
  // setvalue.setDate(setvalue.getDate() + 1);
  // const workDate = setvalue.toISOString().split("T")[0];

  const [isHourly, setIsHourly] = useState(true);
  const [isCase, setIsCase] = useState(false);
  const [isSalary, setIsSalary] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    switch (work.payType) {
      case 1: // 시급
        setIsHourly(true);
        setIsCase(false);
        setIsSalary(true);
        break;

      case 2: // 건별
        setIsHourly(false);
        setIsCase(true);
        setIsSalary(false);
        break;

      case 3: // 일급
        setIsHourly(false);
        setIsCase(false);
        setIsSalary(false);
        break;

      case 4: // 월급
        setIsHourly(false);
        setIsCase(false);
        setIsSalary(true);
        break;

      default:
    }
  }, [work.payType]);

  // 카테고리 값 가져오기
  const onChangePayType = (newValue) => {
    handleWorkChange("payType", newValue);
    console.log(newValue);
  };

  const onCreateWork = async () => {
    try {
      const createWork = await CalendarAxiosApi.createWork(isQuick, work);

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
  const onUpdateWork = async () => {
    try {
      const response = await CalendarAxiosApi.updateWork(work);

      if (response.data === "근무를 성공적으로 수정했습니다.") {
        window.location.reload();
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.log("에러:", error);
    }
  };

  const onClickDelete = async () => {
    try {
      const deleteWork = await CalendarAxiosApi.deleteWork(data.workId);
      if (deleteWork.data === "근무가 삭제되었습니다.") {
        console.log("근무 삭제 성공");
        window.location.reload();
      } else {
        console.log("근무 삭제 실패");
        window.location.reload();
      }
    } catch (error) {
      console.log("에러:", error);
    }
  };

  return (
    <WorkAddContainer>
      {isUpdate ? (
        <div className="delete">
          <Delete onClick={onClickDelete} />
        </div>
      ) : (
        <></>
      )}
      <Container>
        {isUpdate ? <Title>근무 수정</Title> : <Title>근무 등록</Title>}
        <BlockLine />

        <InputContainer>
          {isBasic ? (
            <>
              <div className="quick" onClick={openModal}>
                <Post width="13" height="13" fill="#575757" />
                <p className="quick-text">간편 등록</p>
              </div>
              <div>
                <p className="label">날짜</p>
                <Input
                  type="date"
                  id="date"
                  required
                  value={work.workDate}
                  onChange={(event) =>
                    handleWorkChange("workDate", event.target.value)
                  }
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
                  required
                  value={work.workDate}
                  onChange={(event) =>
                    handleWorkChange("workDate", event.target.value)
                  }
                />
              </div>
            </>
          ) : (
            <></>
          )}

          <div>
            <p className="label">근무</p>
            <Input
              value={work.workName}
              onChange={(event) =>
                handleWorkChange("workName", event.target.value)
              }
            />
          </div>

          <p className="label">급여</p>
          <div>
            {/* <MyType value={myPayType.toString()} onChange={onChangeMyPayType} /> */}
            <SelType value={work.payType} onChange={onChangePayType} />
            <Input
              className="money"
              value={work.workMoney}
              onChange={(event) =>
                handleWorkChange("workMoney", event.target.value)
              }
            />

            <p className="text">원</p>
          </div>

          {isHourly ? (
            <>
              <p className="label">근무시간</p>
              <div>
                <Input
                  className="time"
                  type="time"
                  value={work.workStart}
                  onChange={(event) =>
                    handleWorkChange("workStart", event.target.value)
                  }
                />
                <p className="time-set"> - </p>
                <Input
                  className="time"
                  type="time"
                  value={work.workEnd}
                  onChange={(event) =>
                    handleWorkChange("workEnd", event.target.value)
                  }
                />
              </div>

              <div>
                <p
                  className="label"
                  // width="150px"
                >
                  휴게시간
                </p>
                <Input
                  className="small"
                  type="number"
                  min="0"
                  value={work.workRest}
                  onChange={(event) =>
                    handleWorkChange("workRest", event.target.value)
                  }
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
              <Input
                className="small"
                type="number"
                min="0"
                value={work.workCase}
                required
                onChange={(event) =>
                  handleWorkChange("workCase", event.target.value)
                }
              />
              <p className="text">건</p>
            </div>
          ) : (
            <></>
          )}

          <div>
            <p className="label">세 금</p>
            <Input
              className="small"
              value={work.workTax}
              onChange={(event) =>
                handleWorkChange("workTax", event.target.value)
              }
            />
            <p className="text">%</p>
          </div>

          <div>
            <p className="label">급여일</p>
            {/* {isSalary ? (
              <>
                <p className="text">매달</p>
                <Input
                  type="number"
                  min="0"
                  max="31"
                  value={payday}
                  onChange={handlePaydayChange}
                />
                <p className="text">일</p>
              </>
            ) : ( */}
            <Input
              type="date"
              value={work.payday}
              onChange={(event) =>
                handleWorkChange("payday", event.target.value)
              }
            />
            {/* )} */}
          </div>

          {/* <p className="label">color</p> */}
          <SelColor
            value={work.colorId}
            onChange={(newValue) => handleWorkChange("colorId", newValue)}
          />
        </InputContainer>
      </Container>

      {isUpdate ? (
        <>
          <div>
            <ButtonContainer>
              <ClickButton onClick={onUpdateWork}>수정하기</ClickButton>
            </ButtonContainer>
          </div>
        </>
      ) : (
        <>
          <ButtonContainer>
            <ClickButton onClick={onCreateWork}>등록하기</ClickButton>
          </ButtonContainer>
        </>
      )}

      {modalOpen && (
        <Modal open={modalOpen} close={closeModal} width={"300px"}>
          <QuickView
            isBasic={false}
            data={work}
            setData={setWork}
            close={closeModal}
          />
        </Modal>
      )}
    </WorkAddContainer>
  );
};

export default WorkAdd;

const WorkAddContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  position: relative;
  .delete {
    position: absolute;
    left: 1vw;
    margin-top: 15px;

    cursor: pointer;
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

  .time-set {
    font-size: 20px;
    margin: 5px;
    color: gray;
  }
  .text {
    font-size: 12px;
    align-items: center;
    justify-content: center;
    margin: 3px;
    margin-top: 8px;
    color: gray;
  }
  .small {
    width: 30%;
  }
  .money {
    margin-left: 10px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 240px;
  margin: 20px;
  padding: 0 10px;

  div {
    width: auto;
    display: flex;
    flex-direction: row;
    margin: 5px;
    align-items: center;
    align-items: center;
    justify-content: center;
    vertical-align: center;
  }
  .quick {
    margin: 10px;
    /* align-items: center; */
    color: gray;
    font-size: 12px;
  }
  .quick-text {
    font-size: 12px;
    margin: 3px;
    cursor: pointer;
  }
  .time {
    width: 100px;
    font-size: 13px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;
