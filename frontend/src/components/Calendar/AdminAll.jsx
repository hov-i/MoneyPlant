import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import CreateSchedule from "../../components/Calendar/CreateLedger";
import Modal from "../Common/Modal";
import { ReactComponent as Plus } from "../../assets/plus.svg";
import BlockLine from "../Common/BlockLine";

const AdminAll = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <AdminAllContainer>
      <BlockLine />
      <Header>
        <BlinkingButton onClick={openModal} />
      </Header>

      {/* 일정 */}

      <BlockLine />

      <Header>
        <BlinkingButton onClick={openModal} />
      </Header>
      {/* 가계부 */}


      {modalOpen && (
        <Modal open={modalOpen} close={closeModal} width={"20%"}>
          <CreateSchedule />
        </Modal>
      )}
      <svg width="0" height="0">
        <defs>
          <linearGradient id="gradientId" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(90, 243, 167, 0.7)" />
            <stop offset="100%" stopColor="rgba(47, 155, 161, 0.7)" />
          </linearGradient>
        </defs>
      </svg>
    </AdminAllContainer>
  );
};

export default AdminAll;

const AdminAllContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const blinkingAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const BlinkingButton = styled(Plus)`
  width: 22px;
  height: 22px;
  margin-top: 10px;
  fill: url(#gradientId);

  &:hover {
    animation: ${blinkingAnimation} 1s infinite;
  }
`;

const Header = styled.div`
  width: 85%;
  margin: 0 auto;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  /* background-color: aquamarine; */
`;
