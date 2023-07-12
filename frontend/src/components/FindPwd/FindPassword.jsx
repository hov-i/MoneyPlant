import React, { useState } from "react";
import styled from "styled-components";
import logo1 from "../../assets/logo1.png";
import Button from "@mui/material/Button";
import {
  TextField,
  InputAdornment,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import UserAxiosAPI from "../../api/UserAxiosAPI";

const FindPassword = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false); // 이메일 전송 여부 상태

  const onChangeEmail = (e) => {
    setInputEmail(e.target.value);
  };

  const onClickEmailSend = () => {
    postEmailSend(inputEmail);
  };

  const postEmailSend = async () => {
    try {
      const response = await UserAxiosAPI.postEmailSend(inputEmail);
      if (response === "메일 전송 완료.") {
        console.log("전송 성공");
        setIsEmailSent(true); // 이메일 전송 성공 시 상태 업데이트
      } else {
        console.log("전송 실패");
      }
    } catch (error) {
      console.log("에러:", error);
      alert("가입하지 않은 이메일입니다.");
    }
  };

  return (
    <FindPasswordContainer>
      {/* 비밀번호 찾기 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}>
        <Img className="logo" src={logo1} alt="logo1" />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          {!isEmailSent && ( // 이메일 전송 전에만 입력 창과 버튼 표시
            <Grid container spacing={2} sx={{ width: "250px" }}>
              <Grid item xs={12} mb={2}>
                <TextField
                  autoComplete="email"
                  autoFocus
                  value={inputEmail}
                  onChange={onChangeEmail}
                  fullWidth
                  name="email"
                  placeholder="Email"
                  InputProps={{
                    style: { fontSize: "1.5rem" },
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{ fontSize: "1.8rem" }}>
                        <MailOutlineIcon sx={{ fontSize: "2.8rem" }} />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#87EEC5",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#8BD4D3",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      "&.Mui-focused": {
                        color: "#8BD4D3",
                      },
                    },
                    height: "50px",
                    margin: "0 auto",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="button"
                  variant="contained"
                  onClick={onClickEmailSend}
                  size="medium"
                  sx={{
                    backgroundColor: "#8BD4D3",
                    width: "100%",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#87EEC5",
                    },
                  }}>
                  비밀번호 찾기
                </Button>
              </Grid>
            </Grid>
          )}

          {isEmailSent && ( // 이메일 전송 성공 시 메시지 표시
            <>
              <Typography
                align="center"
                sx={{
                  marginTop: "10px",
                  fontSize: "2.0rem",
                  color: "#28bbb8",
                }}>
                "{inputEmail}"
              </Typography>
              <Typography
                align="center"
                sx={{
                  marginTop: "10px",
                  fontSize: "1rem",
                  color: "#8BD4D3",
                }}>
                입력하신 이메일 주소로 임시 비밀번호가 전송되었습니다.
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </FindPasswordContainer>
  );
};

export default FindPassword;

const FindPasswordContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const Img = styled.img`
  width: 100%;
  display: flex;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    width: 80%;
  }
`;
