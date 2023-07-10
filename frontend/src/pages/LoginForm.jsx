import React, { useState } from "react";
import { TextField, InputAdornment, Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AuthAxiosAPI from "../api/AuthAxiosAPI";
import GoogleLogin from "../assets/GoogleLoginButtonLight.png";
import styled from "styled-components";
import FindPassword from "../components/FindPwd/FindPassword";

//패스워드/아이디 찾기
import Modal from "../components/Common/Modal";

const GoogleLoginButton = styled.div`
  width: 250px;
  margin: 0 auto;
  img {
    width: 100%;
    height: 100%;
  }
`;
// google login button 추가예정

const LoginForm = () => {
  const navigate = useNavigate();
  // 키보드 입력 받기
  const [inputEmail, setInputEmail] = useState("");
  const [inputPwd, setInputPwd] = useState("");
  const onChangeEmail = (e) => {
    setInputEmail(e.target.value);
  };

  const onChangePwd = (e) => {
    setInputPwd(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthAxiosAPI.login(inputEmail, inputPwd);
      const userInfo = JSON.stringify(response, null, 2);
      const userInfoParse = JSON.parse(userInfo);

      if (response.status === 200) {
        console.log(userInfoParse);
        localStorage.setItem("name", userInfoParse.data.name);
        console.log(userInfoParse.data.name);
        localStorage.setItem("email", userInfoParse.data.email);
        console.log(userInfoParse.data.email);
        navigate("/");
      }
    } catch (error) {
      console.log("Login error:", error.message);
      alert("로그인 실패 : 아이디 비밀번호를 다시 확인해 주세요");
    }
  };
  const OnClickGoogle = async () => {
    console.log("버튼");
    try {
      const response = await AuthAxiosAPI.GoogleLogin();
      console.log(response);
      window.location.href = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  //아이디/비번 찾기
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{
        mt: 3,
        display: "flex",
        flexDirection: "column",
      }}>
      <Grid container spacing={2} sx={{ width: "360px" }}>
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
              style: { fontSize: "1.8rem" },
              startAdornment: (
                <InputAdornment position="start" sx={{ fontSize: "2.4rem" }}>
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
        <Grid item xs={12} mb={3}>
          <TextField
            value={inputPwd}
            onChange={onChangePwd}
            fullWidth
            name="password"
            placeholder="Password"
            type="password"
            InputProps={{
              style: { fontSize: "1.8rem" },
              startAdornment: (
                <InputAdornment position="start" sx={{ fontSize: "2.4rem" }}>
                  <LockOutlinedIcon sx={{ fontSize: "2.8rem" }} />
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
            }}
          />
        </Grid>
        <div>
          <Typography
            onClick={openModal}
            variant="button"
            align="right"
            style={{ cursor: "pointer" }}
            sx={{
              marginLeft: "240px",
              cursor: "pointer",
              fontSize: "1rem",
              color: "gray",
              "&:hover": {
                color: "#8BD4D3",
              },
            }}>
            Forget Password?
          </Typography>

          {modalOpen && (
            <Modal open={modalOpen} close={closeModal} width={"300px"}>
              <FindPassword />
            </Modal>
          )}
        </div>

        <Grid item xs={12} mb={1}>
          {inputEmail && inputPwd ? (
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#8BD4D3",
                fontSize: "1.8rem",
                fontWeight: "bold",
                height: "50px",
                "&:hover": {
                  backgroundColor: "#87EEC5",
                },
              }}>
              Sign In
            </Button>
          ) : (
            <Button
              variant="contained"
              disabled
              fullWidth
              sx={{
                color: "#FFFFFF",
                fontSize: "1.8rem",
                fontWeight: "bold",
                height: "50px",
                "&.Mui-disabled": {
                  color: "white",
                },
              }}>
              Sign In
            </Button>
          )}
        </Grid>
      </Grid>
      <GoogleLoginButton onClick={OnClickGoogle}>
        <img src={GoogleLogin} alt="#" />
      </GoogleLoginButton>
    </Box>
  );
};

export default LoginForm;
