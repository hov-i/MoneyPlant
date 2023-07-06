import React, { useState } from "react";

import styled from "styled-components";
import useViewport from "../../hooks/viewportHook";
import Modal from "../Common/Modal";
import MyScAdd from "../MyPage/MyScAdd";
import MyWorkAdd from "../MyPage/MyWorkAdd";

import { ReactComponent as Plus } from "../../assets/plus.svg";

const TagBox = ({ tag, children }) => {
  const { isMobile } = useViewport();

  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <TagBoxStyle isMobile={isMobile}>
      <div className="tagTitle">
        {tag === "일정" ? (
          <>
            <div className="tagLife">일정</div>
            <Plus width="19px" height="19px" onClick={openModal} />
          </>
        ) : (
          <>
            <div className="tagWork">근무</div>
            <Plus width="19px" height="19px" onClick={openModal} />
          </>
        )}
      </div>
      <div className="tagContent">
        <div className="tagList">{children}</div>
      </div>
      {modalOpen && (
        <>
          {tag === "일정" ? (
            <Modal open={modalOpen} close={closeModal} width={"20%"}>
              <MyScAdd width={"60px"} />
            </Modal>
          ) : (
            <Modal open={modalOpen} close={closeModal} width={"20%"}>
              <MyWorkAdd />
            </Modal>
          )}
        </>
      )}
    </TagBoxStyle>
  );
};
export default TagBox;

const TagBoxStyle = styled.div`
  width: ${(props) => (props.isMobile ? "90%" : "46%")};
  /* display: flex; */
  /* flex-wrap: wrap; */
  margin: 0 auto;
  margin-bottom: 20px;
  margin-top: ${(props) => (props.isMobile ? "55px" : "30px")};
  height: 225.71px;
  background-color: rgba(175, 175, 175, 0.13);
  box-shadow: 0px 5px 2px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-bottom: 30px;

  .tagTitle {
    width: 130px;
    height: 55px;
    box-shadow: 1px 4.28571px 2.85714px rgba(0, 0, 0, 0.1);
    border-radius: 142.857px;
    background-color: ${({ theme }) => theme.comColor};
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    bottom: 33px;
    left: 15px;
    font-size: 15px;
    color: white;
    > svg {
      fill: ${({ theme }) => theme.menuColor};
    }
  }
  .tagLife {
    width: 70px;
    height: 40px;
    background: linear-gradient(
      103.72deg,
      rgba(66, 230, 149, 0.8) 10.74%,
      rgba(59, 178, 184, 0.8) 85.3%
    );
    border-radius: 142.857px;
    box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
  }
  .tagWork {
    width: 70px;
    height: 40px;
    background: linear-gradient(
      103.72deg,
      rgba(126, 126, 126, 0.8) 10.74%,
      rgba(93, 93, 93, 0.8) 85.3%
    );
    border-radius: 142.857px;
    box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-right: 20px;
  }
  .tagContent {
    padding: 15px;
    padding-top: 0px;
    text-align: center; /* Add this line to center align the content */
  }
  .tagList {
    text-align: left;
  }
`;
