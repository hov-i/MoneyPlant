import React, { useState } from "react";
import styled from "styled-components";

import Modal from "../Common/Modal";
import BlinkingButton from "../Common/BlinkingButton";
import ScAdd from "./ScAdd";
import WorkAdd from "./WorkAdd";

const AdminContents = ({ isBasic, setValue }) => {
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
      <CenterButton>
        <BlinkingButton clickOn={openModal} />
      </CenterButton>

      {/* 모달 */}
      {modalOpen && (
        <Modal open={modalOpen} close={closeModal} width={"300px"}>
          {isBasic ? <ScAdd value={setValue} /> : <WorkAdd value={setValue} />}
        </Modal>
      )}
    </>
  );
};
const CenterButton = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
  padding-top: 10px;
`;

export default AdminContents;

// const AdminScheduleContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
// `;
