import React, { useState } from "react";
import styled from "styled-components";
import CategoryInput from "../Common/CategoryInput";
import categoryList from "../../styles/categoryExpenseColor";
import categoryIncomeList from "../../styles/categoryIncomeColor";
import CategoryIncomeInput from "../Common/CategoryIncomeInput";
import ClickButton from "../Common/ClickButton";
import LedgerAxiosAPI from "../../api/LedgerAxiosAPI";
// import moment from "moment";

const CreateScheduleInner = ({ isIncome, value }) => {
  const [categoryId, setCategoryId] = useState(1);
  const [categoryIncomeId, setCategoryIncomeId] = useState(15);
  const [date, setDate] = useState({ value });
  const [amount, setAmount] = useState("");
  const [content, setContent] = useState("");

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

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

  const onCreateExpense = async () => {
    try {
      const parsedAmount = parseInt(amount);
      const createExpense = await LedgerAxiosAPI.createExpense(
        categoryId,
        parsedAmount,
        date,
        content
      );

      if (createExpense.data === "지출을 성공적으로 생성했습니다.") {
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

  const onCreateIncome = async () => {
    try {
      const parsedAmount = parseInt(amount);
      const createIncome = await LedgerAxiosAPI.createIncome(
        categoryIncomeId,
        parsedAmount,
        date,
        content
      );

      if (createIncome.data === "수입을 성공적으로 생성했습니다.") {
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
      <CreateScheduleContainer>
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
              value={date}
              onChange={handleDateChange}
            />
            <p className="label">금액</p>
            <Input id="amount" value={amount} onChange={handleAmountChange} />
            <p className="label">내용</p>
            <Input
              id="content"
              value={content}
              onChange={handleContentChange}
            />
          </InputContainer>
        </Container>
        <ButtonContainer>
          {isIncome ? (
            <ClickButton onClick={onCreateIncome}>수입 추가</ClickButton>
          ) : (
            <ClickButton onClick={onCreateExpense}>지출 추가</ClickButton>
          )}
        </ButtonContainer>
      </CreateScheduleContainer>
    </>
  );
};
export default CreateScheduleInner;

const CreateScheduleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  position: relative;

  .SMSBox {
    position: absolute;
    right: 1vw;
    margin-top: 10px;
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
