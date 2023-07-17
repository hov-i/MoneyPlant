import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ClickButton from "../Common/ClickButton";
import UserAxiosAPI from "../../api/UserAxiosAPI";
import AuthAxiosAPI from "../../api/AuthAxiosAPI";
import Typography from "@mui/material/Typography";
import Modal from "../../components/Common/Modal";
import QnA from "../../components/Setting/QnA";
// import TextField from "@mui/material/TextField";
// import { Box, Grid } from "@mui/material";

const EditMyInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // API
  // 정보 확인 API
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await UserAxiosAPI.getUserInfo(); // 사용자 정보 가져오기 API 호출 예시
        if (response.status === 200) {
          const userName = response.data.name.split(" ")[0];
          const userEmail = response.data.email;
          setName(userName);
          setEmail(userEmail);
        }
      } catch (error) {
        console.log("getUserInfo 오류: " + error);
      }
    };

    fetchUserInfo();
  }, []);

  // 비밀번호 변경 api
  const handleEditMyInfo = () => {
    setIsEditing(true);
    setErrorMessage(""); // 에러 메시지 초기화
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
    setErrorMessage(""); // 에러 메시지 초기화
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    setPasswordError(""); // 비밀번호 입력이 변경될 때마다 에러 초기화
    setErrorMessage(""); // 에러 메시지 초기화
  };

  const changePassword = async () => {
    // 비밀번호 유효성 검사
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@%*#^?&\\()\-_=+]).{8,20}$/;
    if (!passwordRegex.test(newPassword)) {
      setPasswordError(
        "비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상 20자 이하여야 합니다."
      );
      return;
    }

    try {
      const response = await AuthAxiosAPI.postNewPassword(
        email,
        currentPassword,
        newPassword
      );
      console.log(response.data); // 성공적인 응답 데이터

      // 비밀번호 변경 성공한 후의 처리
      setIsEditing(false);
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        // 경고 메시지 처리
        setErrorMessage(errorMessage);
      }
      console.error(error); // 실패한 경우의 오류
    }
  };

  //QnA 오픈
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <InfoBox>
      <div>
        <Title>내 정보</Title>
        <InfoLine>
          <InfoText>이름</InfoText>
          <MyInfo>{name}님</MyInfo>
        </InfoLine>
        <InfoLine>
          <InfoText>이메일</InfoText>
          <MyInfo>{email}</MyInfo>
        </InfoLine>
        <div>
          {!isEditing && (
            <>
              <div>
                <InfoLine>
                  <Typography
                    onClick={handleEditMyInfo}
                    variant="button"
                    style={{ cursor: "pointer" }}
                    sx={{
                      cursor: "pointer",
                      fontSize: "1.2rem",
                      color: "gray",
                      "&:hover": {
                        color: "#8BD4D3",
                      },
                    }}>
                    비밀번호 변경을 원하시면 여기를 클릭해주세요.
                  </Typography>
                </InfoLine>
              </div>
            </>
          )}

          {/* 수정 상태 */}
          {isEditing && (
            <>
              <div>
                <InfoLine>
                  <InfoText>비밀번호</InfoText>
                  <ChangeInput
                    type="password"
                    value={currentPassword}
                    onChange={handleCurrentPasswordChange}
                    placeholder="현재 비밀번호를 입력해주세요."
                  />
                </InfoLine>
                {errorMessage && <>{errorMessage}</>}
                <InfoLine>
                  <InfoText>새로운 비밀번호</InfoText>
                  <ChangeInput
                    type="password"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    placeholder="변경할 비밀번호를 입력해주세요."
                  />
                  <ClickButton
                    width={"30px"}
                    height={"30px"}
                    onClick={changePassword}></ClickButton>
                </InfoLine>
                {passwordError && <>{passwordError}</>}
              </div>
            </>
          )}
        </div>
        <Typography
          onClick={openModal}
          variant="button"
          style={{ cursor: "pointer" }}
          sx={{
            cursor: "pointer",
            fontSize: "1.2rem",
            color: "gray",
            "&:hover": {
              color: "#8BD4D3",
            },
          }}>
          사이트 이용에 질문이 있으신가요?
        </Typography>

        {modalOpen && (
          <Modal open={modalOpen} close={closeModal} width={"300px"}>
            <QnA />
          </Modal>
        )}
      </div>
    </InfoBox>
  );
};

export default EditMyInfo;

const InfoBox = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 50px;
`;
const Title = styled.div`
  display: flex;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 30px;
`;
const InfoLine = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
`;
const InfoText = styled.div`
  display: flex;
  font-size: 2rem;
  font-weight: bold;
`;
const MyInfo = styled.div`
  font-size: 19px;
  font-weight: bold;
  margin: 0px 10px;
`;

const ChangeInput = styled.input`
  display: flex;
  padding: 1px 2px;
  font-size: 15px;
  height: 30px;
  width: 50%;
  border: 1.5px solid #e4e4e4;
  border-radius: 5px;
  margin: 0 10px;
`;
