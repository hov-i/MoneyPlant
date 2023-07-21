import React, { useState } from "react";
import styled from "styled-components";
import CategoryInput from "../Common/CategoryInput";
import categoryList from "../../styles/categoryExpenseColor";
import categoryIncomeList from "../../styles/categoryIncomeColor";
import CategoryIncomeInput from "../Common/CategoryIncomeInput";
import ClickButton from "../Common/ClickButton";
import LedgerAxiosAPI from "../../api/LedgerAxiosAPI";
import { ReactComponent as Delete } from "../../assets/delete.svg";
// import moment from "moment";

const LedgerChange = ({
  isIncome,
  defaultCategoryId,
  value,
  defaultContent,
  defaultamount,
  Id,
}) => {
  const [categoryId, setCategoryId] = useState(defaultCategoryId);
  const [categoryIncomeId, setCategoryIncomeId] = useState(defaultCategoryId);
  const [amount, setAmount] = useState(defaultamount);
  const [content, setContent] = useState(defaultContent);
  const [inPutDate, setDate] = useState(value);

  const setvalue = new Date(inPutDate);
  setvalue.setDate(setvalue.getDate() + 1);
  const date = setvalue.toISOString().split("T")[0];

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleCategoryIdChange = (id) => {
    setCategoryId(id);
  };

  const handleCategoryIncomeIdChange = (id) => {
    setCategoryIncomeId(id);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const onChangeExpense = async () => {
    try {
      const parsedAmount = parseInt(amount);
      const changeExpense = await LedgerAxiosAPI.changeExpense(
        categoryId,
        parsedAmount,
        date,
        content,
        Id
      );

      if (changeExpense.data === "지출 정보가 성공적으로 수정되었습니다.") {
        console.log("수정 성공");
        window.location.reload();
      } else {
        console.log("수정 실패");
        window.location.reload();
      }
    } catch (error) {
      console.log("에러:", error);
    }
  };

  const onChangeIncome = async () => {
    try {
      const parsedAmount = parseInt(amount);
      const changeIncome = await LedgerAxiosAPI.changeIncome(
        categoryIncomeId,
        parsedAmount,
        date,
        content,
        Id
      );

      if (changeIncome.data === "수입 정보가 성공적으로 수정되었습니다.") {
        console.log("수정 성공");
        window.location.reload();
      } else {
        console.log("수정 실패");
        window.location.reload();
      }
    } catch (error) {
      console.log("에러:", error);
    }
  };

  const onDeleteExpense = async () => {
    try {
      const deleteExpense = await LedgerAxiosAPI.deleteExpense(Id);
      if (deleteExpense.data === "지출 정보가 삭제되었습니다.") {
        console.log("삭제 성공");
        window.location.reload();
      } else {
        console.log("삭제 실패");
        window.location.reload();
      }
    } catch (error) {
      console.log("에러:", error);
    }
  };

  const onDeleteIncome = async () => {
    try {
      const deleteExpense = await LedgerAxiosAPI.deleteIncome(Id);
      if (deleteExpense.data === "수입 정보가 삭제되었습니다.") {
        console.log("삭제 성공");
        window.location.reload();
      } else {
        console.log("삭제 실패");
        window.location.reload();
      }
    } catch (error) {
      console.log("에러:", error);
    }
  };

  return (
    <>
      <CreateScheduleContainer>
        <div className="delete">
          <Delete onClick={isIncome ? onDeleteIncome : onDeleteExpense} />
        </div>

        <Container>
          {isIncome ? (
            <CategoryIncomeInput
              categoryIncomeList={categoryIncomeList}
              categoryIncomeId={categoryIncomeId}
              onCategoryIncomeIdChange={handleCategoryIncomeIdChange}
            />
          ) : (
            <CategoryInput
              categoryList={categoryList}
              categoryId={categoryId}
              onCategoryIdChange={handleCategoryIdChange}
            />
          )}
          <InputContainer>
            <p className="label">날짜</p>
            <Input
              type="date"
              id="date"
              defaultValue={date}
              onChange={handleDateChange}
            />
            <p className="label">금액</p>
            <Input
              id="amount"
              defaultValue={defaultamount}
              onChange={handleAmountChange}
            />
            <p className="label">내용</p>
            <Input
              id="content"
              defaultValue={defaultContent}
              onChange={handleContentChange}
            />
          </InputContainer>
        </Container>
        <ButtonContainer>
          {isIncome ? (
            <ClickButton onClick={onChangeIncome}>수입 수정</ClickButton>
          ) : (
            <ClickButton onClick={onChangeExpense}>지출 수정</ClickButton>
          )}
        </ButtonContainer>
      </CreateScheduleContainer>
    </>
  );
};
export default LedgerChange;

const CreateScheduleContainer = styled.div`
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

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 10px;
  .label {
    margin: 10px;
    font-size: 15px;
  }
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

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 200px;
  margin: 20px;
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
