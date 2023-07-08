import React, { useState } from "react";
import styled from "styled-components";
import CreateLedger from "../../components/Calendar/CreateLedger";
import Modal from "../Common/Modal";
import BlinkingButton from "../Common/BlinkingButton";

const AdminLedger = ({ setValue }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {/* 가계부 */}
      <Title>수입/지출</Title>
      <BlinkingButton clickOn={openModal} />

      {/* 모달 */}
      {modalOpen && (
        <Modal open={modalOpen} close={closeModal} width={"300px"}>
          <CreateLedger value={setValue} />
        </Modal>
      )}
    </>
  );
};

export default AdminLedger;

// const AdminLedgerContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
// `;

const Title = styled.div`
  display: flex;
  width: 100%;
`;
