import React, { useState } from "react";
import styled from "styled-components";
import logo1 from "../../assets/logo1.png";
import Button from "@mui/material/Button";
import { TextField, InputAdornment, Box, Grid } from "@mui/material";
import LoadingSpinner from "../Common/LoadingSpinner";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import UserAxiosAPI from "../../api/UserAxiosAPI";
import Typography from "@mui/material/Typography";

const FindPassword = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false); // 이메일 전송 여부 상태
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태

  const onChangeEmail = (e) => {
    setInputEmail(e.target.value);
  };

  const onClickEmailSend = () => {
    postEmailSend(inputEmail);
  };

  const postEmailSend = async () => {
    try {
      setIsLoading(true); // 로딩 시작
      await UserAxiosAPI.postEmailSend(inputEmail);
      setIsEmailSent(true); // 이메일 전송 성공 시 상태 업데이트
    } catch (error) {
      console.log("에러:", error);
      alert("가입하지 않은 이메일입니다.");
    } finally {
      setIsLoading(false); // 로딩 종료
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
          {!isEmailSent && (
            <>
              <Grid container spacing={2} sx={{ width: "250px" }}>
                <Grid item xs={12} mb={2}>
                  {!isLoading && (
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
                  )}
                </Grid>
              </Grid>
              {/* 로딩 중이 아닐 때만 버튼 렌더링 */}
              {!isLoading && (
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
              )}
            </>
          )}

          {isLoading && ( // 로딩스피너 표시
            <>
              <Typography
                align="center"
                sx={{
                  marginTop: "10px",
                  fontSize: "1.2rem",
                  color: "#5ca9a7",
                  marginBottom: "10px",
                }}>
                {inputEmail}으로 임시 비밀번호를 전송 중입니다.
              </Typography>
              <LoadingSpinner />
            </>
          )}

          {isEmailSent && (
            <Typography
              align="center"
              sx={{
                marginTop: "10px",
                fontSize: "1rem",
                color: "#8BD4D3",
              }}>
              {inputEmail}으로 임시 비밀번호가 전송되었습니다.
            </Typography>
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
