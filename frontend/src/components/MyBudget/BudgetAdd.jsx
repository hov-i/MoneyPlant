import styled from "styled-components";
import BudgetCalendar from "./BudgetCalendar";
import CategoryIcon from "./CategoryIcon";
import BlockLine from "../Common/BlockLine";
import ClickButton from "../Common/ClickButton";
import categoryList from "../../styles/categoryExpenseColor";
import { useState } from "react";
import BudgetAxiosApi from "../../api/BudgetAxiosAPI";

const BudgetAdd = ({ categoryData }) => {
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const selectedMonth = selectedDate.substring(0, 7);

  const filteredCategoryData = categoryData.filter((data) => {
    const dataMonth = data.budgetMonth.substring(0, 7); // 데이터의 월 값만 추출
    return dataMonth === selectedMonth;
  });

  const [inputValues, setInputValues] = useState([]);

  const onCreateBudget = async () => {
    console.log(inputValues);
    try {
      const createMyBudget = await BudgetAxiosApi.createMyBudget(inputValues);
      if (createMyBudget.data === "예산을 성공적으로 생성했습니다.") {
        console.log("입력 성공");
        window.location.reload();
      } else {
        console.log("입력 실패");
        window.location.reload();
      }
    } catch (error) {
      console.log("에러:", error);
      alert("😢숫자만 입력 가능해요 ㅠ.ㅠ");
    }
  };

  const onChangeInputMoney = (e) => {
    const { name, value } = e.target;
    const existingValueIndex = inputValues.findIndex(
      (item) => item.categoryId === name
    );

    if (existingValueIndex !== -1) {
      const updatedValues = [...inputValues];
      updatedValues[existingValueIndex] = {
        ...updatedValues[existingValueIndex],
        budgetMoney: value,
      };
      setInputValues(updatedValues);
    } else {
      const newValue = {
        budgetMoney: value,
        budgetMonth: selectedDate,
        categoryId: name,
      };
      setInputValues((prevValues) => [...prevValues, newValue]);
    }
  };

  return (
    <>
      <Block>
        <BudgetCalendar onChangeDate={handleDateChange} />
      </Block>
      <BlockLine />
      <Block>
        {categoryList.map((category) => {
          const data = filteredCategoryData.find(
            (item) => item.categoryId === category.categoryId
          );
          const defaultValue = data ? Number(data.budgetMoney) : "";

          return (
            <Label key={category.categoryId}>
              <CategoryIcon name={category.Name} />{" "}
              <p className="categoryName">{category.Name}</p>
              <Input
                defaultValue={defaultValue}
                type="text"
                name={category.categoryId}
                onChange={onChangeInputMoney}
              />
            </Label>
          );
        })}
      </Block>
      <ClickButtonWrapper>
        <ClickButton onClick={onCreateBudget}>예산 추가</ClickButton>
      </ClickButtonWrapper>
    </>
  );
};

export default BudgetAdd;

const Block = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 10px;
`;

const Input = styled.input`
  margin: 10px;
  width: 40%;
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

const Label = styled.div`
  display: flex;
  margin: 10px;
  margin-left: 0px;
  align-items: center;
  justify-content: center;

  .categoryName {
    margin-left: 4px;
    width: 80px;
  }
`;

const ClickButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;
