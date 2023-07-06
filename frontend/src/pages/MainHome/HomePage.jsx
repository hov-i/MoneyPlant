import React, { useState } from 'react';
import styled from 'styled-components';

import Header from '../../components/Common/Header';
import Navbar from '../../components/Common/Navbar';

import { ReactComponent as Plus } from '../../assets/plus.svg';
import Container from '../../components/Common/Container';
import ToggleButtonLarge from '../../components/Common/ToggleButtonLarge';
import MyCal from '../../components/Calendar/MyCal';
import Modal from '../../components/Common/Modal';
import Calculate from '../../components/Calendar/Calculate';
import CreateSchedule from '../../components/Calendar/CreateLedger';

const Home = () => {
    const [isOn, setIsOn] = useState(false);

    const handleToggle = () => {
        setIsOn((prevState) => !prevState);
    };

    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <Header />
            <Navbar />

            <Container>
                <CalendarContainer>
                    <div className="header">
                        <ToggleButtonLarge onText="일 정" offText="가계부" isOn={isOn} handleToggle={handleToggle} />
                        <Plus width="25px" height="25px" onClick={openModal} />
                    </div>

                    <div className="calendar">{isOn ? <MyCal isBasic={false} /> : <MyCal isBasic={true} />}</div>
                </CalendarContainer>
                <Calculate />
                {isOn
                    ? modalOpen && <Modal open={modalOpen} close={closeModal} width={'20%'}></Modal>
                    : modalOpen && (
                          <Modal open={modalOpen} close={closeModal} width={'20%'}>
                              <CreateSchedule />
                          </Modal>
                      )}
            </Container>
        </>
    );
};

export default Home;

// const HomeContainer = styled.div`
//   width: ${(props) => (props.isMobile ? "768px" : "100%")};
//   /* display: flex; */

//   /* flex-direction: ; */
//   /* flex-direction: column; */
//   /* align-items: center; */
//   /* justify-content: center; */
//   /* vertical-align: center; */
// `;

const CalendarContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    .header {
        width: 85%;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        > svg {
            fill: ${({ theme }) => theme.menuColor};
        }
    }
`;
