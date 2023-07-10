import React, { useState } from "react";
//import styled from "styled-components";
import Modal from "../Common/Modal";
import BlinkingButton from "../Common/BlinkingButton";
import ScAdd from "./ScAdd";
import WorkAdd from "./WorkAdd";

const AdminContents = ({ isBasic }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {/* 일정 */}
      <BlinkingButton clickOn={openModal} />

      {/* 모달 */}
      {modalOpen && (
        <Modal open={modalOpen} close={closeModal} width={"300px"}>
          {isBasic ? <ScAdd isMypage={false} /> : <WorkAdd isMypage={false} />}
        </Modal>
      )}
    </>
  );
};

export default AdminContents;

// const AdminScheduleContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
// `;
