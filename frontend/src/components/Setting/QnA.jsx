import React, { useState } from 'react';
import styled from 'styled-components';

const QnA = () => {
  const [showContent, setShowContent] = useState({});

  const handleButtonClick = (id) => {
    setShowContent((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <QnAContainer>
        <Title>Q&A</Title>
      <Button onClick={() => handleButtonClick(1)}>간편 등록이란?</Button>
      <Content show={showContent[1]}>반복적으로 실행되는 일정을 한 번에 등록할 수 있는 시스템으로 메인 달력에 일정과 근무를 간단하게 등록하실 수 있습니다.</Content>
      <Button onClick={() => handleButtonClick(2)}> 회원 탈퇴는 어떻게 하나요?</Button>
      <Content show={showContent[2]}>"회원 탈퇴 페이지 연결"로 들어가시면 됩니다!</Content>
      <Button onClick={() => handleButtonClick(3)}>다른 질문이 있으시다면?</Button>
      <Content show={showContent[3]}>moneyplantmanager@gmail.com으로 메일 남겨주세요!</Content>
    </QnAContainer>
  );
};

export default QnA;

const QnAContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin: 10px;
`;

const Button = styled.button`
  margin-bottom: 10px;
  background-color: #f1f1f1;
  color: #333;
  padding: 10px;
  border: none;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
`;

const Content = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
  background-color: #f9f9f9;
  padding: 10px;
  font-size: 1.2rem;
`;
