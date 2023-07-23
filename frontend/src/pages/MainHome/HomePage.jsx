import React, { useState, useRef } from "react";
import styled from "styled-components";
import moment from "moment";

import Header from "../../components/Common/Header";
import Navbar from "../../components/Common/Navbar";

import Container from "../../components/Common/Container";
import ToggleButtonLarge from "../../components/Common/ToggleButtonLarge";
import Button from "../../components/Common/ClickButton";
import MyCal from "../../components/Calendar/MyCal";
import Calculate from "../../components/Calendar/Calculate";
// import CreateSchedule from "../../components/Calendar/CreateLedger";

const Home = () => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn((prevState) => !prevState);
  };

  // 컴포넌트에 Useref사용 설정
  const calendarRef = useRef();

  const onClickTodayHandler = () => {
    const calendar = calendarRef.current;
    const firstDayOfTodaysMonth = moment().date(1).toDate();
    calendar.setActiveStartDate(firstDayOfTodaysMonth);
  };

  return (
    <>
      <Header />
      <Navbar />

      <Container>
        <CalendarContainer>
          <div className="header">
            <ToggleButtonLarge
              onText="일 정"
              offText="가계부"
              isOn={isOn}
              handleToggle={handleToggle}
            />
            {/* <Plus width="25px" height="25px" onClick={openModal} /> */}
            <Button onClick={onClickTodayHandler} width={'60px'} height={'35px'} marginBottom={"0px"}>
                오늘
            </Button>
          </div>

          <div className="calendar">
            {isOn ? (
              <MyCal isBasic={false} ref={calendarRef} />
            ) : (
              <MyCal isBasic={true} ref={calendarRef} />
            )}
          </div>
        </CalendarContainer>
        <Calculate />
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
    width: 95%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 20px;
    > svg {
      fill: ${({ theme }) => theme.menuColor};
    }
  }
`;
