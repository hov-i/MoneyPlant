import styled from "styled-components";
import CategoryIcon from '../MyBudget/CategoryIcon';
import CategoryIncomeIcon from '../Common/CategoryIncomeIcon';
import { useState } from "react";
import Modal from "../Common/Modal";
import LedgerChange from "./LedgerChange";

const Account = ({ account, content, amount, categoryName }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const color = account === "지출" ? "#ff005c" : "#3fcea5";
  const sign = account === "지출" ? "-" : "+";

  return (
    <>
      <AccountContainer color={color} onClick={openModal}>
        <div className="amount">
        {account === '지출' ? <CategoryIcon name={categoryName} /> : <CategoryIncomeIcon name={categoryName} />}
        <p className="item">{content}</p>
        </div>
        <p className="money">
          {sign}
          {amount}
        </p>
      </AccountContainer>
      {modalOpen && (
        <Modal open={modalOpen} close={closeModal} width={'300px'}>
        {account === '지출' ? <LedgerChange /> : <LedgerChange isIncome={1} />}
      </Modal>
      )}
    </>
  );
};
export default Account;

const AccountContainer = styled.div`
    display: flex;
    width: 90%;
    align-items: center;
    justify-content: space-between;
    padding-left: 2%;
    padding-right: 2%;
    color: ${({ color }) => color};
    height: 45px;
    margin: 10px;
    margin-top: 0px;
    border-radius: 5px;
    &:hover {
        background-color: ${({ theme }) => theme.menuBgColor};
    }

    .item {
        text-align: left;
        width: 200px;
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
