import React, { useState } from "react";
import styled from "styled-components";
import ToggleButtonSmall from "../Common/ToggleButtonSmall";
import { ReactComponent as SMS } from "../../assets/SMS.svg";
import SMSAdd from "./SMSAdd";
import Modal from "../Common/Modal";
import BlockLine from "../Common/BlockLine";
import CreateLedgerInner from "./CreateLedgerInner";

const CreateSchedule = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isOn, setIsOn] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleToggle = () => {
    setIsOn((prevState) => !prevState);
  };

  return (
    <>
      <CreateScheduleContainer>
        <CreateScheduleBox>
          <div className="SMSBox">
            <SMS onClick={openModal} />
            {modalOpen && (
              <Modal open={modalOpen} close={closeModal} width={"20%"}>
                <SMSAdd></SMSAdd>
              </Modal>
            )}
          </div>
          <div className="ToggleBox">
            <ToggleButtonSmall
              onText="수 입"
              offText="지 출"
              isOn={isOn}
              handleToggle={handleToggle}
            />
          </div>
        </CreateScheduleBox>
        <BlockLine />
        {isOn ? (
          <CreateLedgerInner isIncome={true} />
        ) : (
          <CreateLedgerInner isIncome={false} />
        )}
      </CreateScheduleContainer>
    </>
  );
};

export default CreateSchedule;

const CreateScheduleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CreateScheduleBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;

  .SMSBox {
    width: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ToggleBox {
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 30px;
  }
`;
