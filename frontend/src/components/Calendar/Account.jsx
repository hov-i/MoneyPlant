import styled from "styled-components";
import CategoryIcon from '../MyBudget/CategoryIcon';
import CategoryIncomeIcon from '../Common/CategoryIncomeIcon';

const Account = ({ account, content, amount, categoryName }) => {
  const color = account === "지출" ? "#ff005c" : "#3fcea5";
  const sign = account === "지출" ? "-" : "+";

  return (
    <>
      <AccountContainer color={color}>
        <div className="amount">
        {account === '지출' ? <CategoryIcon name={categoryName} /> : <CategoryIncomeIcon name={categoryName} />}
        <p className="item">{content}</p>
        </div>
        <p className="money">
          {sign}
          {amount}
        </p>
      </AccountContainer>
    </>
  );
};
export default Account;

const AccountContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 2%;
    padding-right: 4%;
    color: ${({ color }) => color};
    padding-bottom: 20px;
    padding-top: 20px;
    margin: 10px;
    border-radius: 5px;
    &:hover {
        background-color: ${({ theme }) => theme.menuBgColor};
    }

    .item {
        text-align: left;
        width: 80px;
        margin-left: 10px;
    }

    .amount {
        display: flex;
        align-items: center;
        > svg {
            fill: ${({ theme }) => theme.menuColor};
        }
    }
    .money {
    }
`;