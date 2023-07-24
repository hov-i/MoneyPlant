import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../Common/Modal";
import UserDelete from "./UserDelete";

const QnA = () => {
  const [showContent, setShowContent] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
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
      <Content show={showContent[1]}>
        반복적으로 실행되는 일정을 한 번에 등록할 수 있는 시스템으로 메인 달력에
        일정과 근무를 간단하게 등록하실 수 있습니다.
      </Content>
      <Button onClick={() => handleButtonClick(2)}>
        {" "}
        회원 탈퇴는 어떻게 하나요?
      </Button>
      <Content show={showContent[2]}>
        <Span onClick={openModal}>여기</Span>를 클릭해주시면 회원탈퇴 창과 연결됩니다.
      </Content>
      <Button onClick={() => handleButtonClick(3)}>
        다른 질문이 있으시다면?
      </Button>
      <Content show={showContent[3]}>
        moneyplantmanager@gmail.com으로 메일 남겨주세요!
      </Content>
      {modalOpen && (
        <Modal open={modalOpen} close={closeModal} width={"500px"}>
          <UserDelete></UserDelete>
        </Modal>
      )}
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
  padding: 10px;
  border: none;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
`;

const Content = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
  padding: 10px;
  font-size: 1.2rem;
`;

const Span =styled.span`
    color: rgba(44, 224, 137, 0.875);
    cursor: pointer;
`
