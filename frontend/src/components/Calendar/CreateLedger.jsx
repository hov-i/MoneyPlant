import React, { useState } from 'react';
import styled from 'styled-components';
import ToggleButtonSmall from '../Common/ToggleButtonSmall';
import { ReactComponent as SMS } from '../../assets/SMS.svg';
import SMSAdd from './SMSAdd';
import Modal from '../Common/Modal';
import BlockLine from '../Common/BlockLine';
import CreateLedgerInner from './CreateLedgerInner';

const CreateLedger = ({ setValue }) => {
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
                            <Modal open={modalOpen} close={closeModal} width={'300px'}>
                                <SMSAdd></SMSAdd>
                            </Modal>
                        )}
                    </div>
                    <div className="ToggleBox">
                        <ToggleButtonSmall onText="수 입" offText="지 출" isOn={isOn} handleToggle={handleToggle} />
                    </div>
                </CreateScheduleBox>
                <BlockLine />
                {isOn ? (
                    <CreateLedgerInner isIncome={true} value={setValue} />
                ) : (
                    <CreateLedgerInner isIncome={false} value={setValue} />
                )}
            </CreateScheduleContainer>
        </>
    );
};

export default CreateLedger;

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
    padding: 10px;

    .SMSBox {
        width: 10%;
        display: flex;
        justify-content: center;
        align-items: center;
        > svg {
            fill: ${({ theme }) => theme.menuColor};
        }
    }

    .ToggleBox {
        width: 90%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 30px;
    }
`;
