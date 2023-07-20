import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Box, FormControlLabel, Grid, Checkbox } from '@mui/material';
import Button from '@mui/material/Button';
import AuthAxiosAPI from '../api/AuthAxiosAPI';
import Modal from '../components/Common/Modal';
import PrivacyTerms from '../components/Common/PrivacyTerms';
import ClickButton from '../components/Common/ClickButton';

// 이메일 인증도 추가해야하지 않을까? 가입할 때 이메일로 코드 보낸다거나 url링크로 인증한다던가

const SignupForm = ({ setValue }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [checkboxChecked, setCheckboxChecked] = useState(false);

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleCheckboxClick = () => {
        setModalOpen(true);
    };

    const handleButtonClick = () => {
        setCheckboxChecked(true);
        setModalOpen(false);
    };

    const [inputEmail, setInputEmail] = useState('');
    const [inputFirstName, setInputFirstName] = useState('');
    const [inputLastName, setInputLastName] = useState('');
    const [inputPwd, setInputPwd] = useState('');
    const [inputConPwd, setInputConPwd] = useState('');

    // 유효성 검사
    const [isFirstName, setIsFirstName] = useState(false);
    const [isLastName, setIsLastName] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [isPwd, setIsPwd] = useState(false);
    const [isConPwd, setIsConPwd] = useState(false);

    // 이메일 체크
    const onChangeEmail = (e) => {
        const emailRegEx = /^[a-zA-Z0-9+-/_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        const emailCurrent = e.target.value;
        setInputEmail(e.target.value);
        setIsEmail(emailRegEx.test(emailCurrent));
    };
    // 비밀번호 체크
    // 정규식: 영문, 숫자, 특수문자 포함 8~20자
    const onChangePwd = (e) => {
        const pwdRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@%*#^?&\\()\-_=+]).{8,20}$/;
        const pwdCurrent = e.target.value;
        setInputPwd(pwdCurrent);
        setIsPwd(pwdRegex.test(pwdCurrent));
    };
    // 비밀번호 확인
    const onChangeConPwd = (e) => {
        const conPwdCurrent = e.target.value;
        setInputConPwd(conPwdCurrent);
        setIsConPwd(conPwdCurrent === inputPwd);
    };
    const onChangeFirstName = (e) => {
        const nameRegex = /^[가-힣a-zA-Z\s]{1,}$/;
        const firstNameCurrent = e.target.value;
        setInputFirstName(firstNameCurrent);
        setIsFirstName(nameRegex.test(firstNameCurrent));
    };
    const onChangeLastName = (e) => {
        const nameRegex = /^[가-힣a-zA-Z\s]{1,}$/;
        const lastNameCurrent = e.target.value;
        setInputLastName(lastNameCurrent);
        setIsLastName(nameRegex.test(lastNameCurrent));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const name = inputFirstName + ' ' + inputLastName;
            const response = await AuthAxiosAPI.signup(inputEmail, name, inputPwd);
            if (response.status === 200) {
                console.log('회원가입 성공');
                setValue('login');
                alert('회원가입 성공');
            }
        } catch (error) {
            alert('이미 사용중인 이메일 입니다.');
            setInputEmail('');
            setInputPwd('');
            setInputLastName('');
            setInputFirstName('');
            setInputConPwd('');
        }
    };

    return (
        <>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <Grid container spacing={2} sx={{ width: '360px' }}>
                    <Grid item xs={6} mb={0.5}>
                        <TextField
                            error={inputFirstName && !isFirstName}
                            autoComplete="given-name"
                            value={inputFirstName}
                            onChange={onChangeFirstName}
                            required
                            fullWidth
                            placeholder="이름"
                            autoFocus
                            InputProps={{
                                style: { fontSize: '1.3rem' },
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': {
                                        borderColor: '#87EEC5',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#8BD4D3',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    '&.Mui-focused': {
                                        color: '#8BD4D3',
                                    },
                                },
                                height: '50px',
                            }}
                        />
                    </Grid>
                    <Grid item xs={6} mb={0.5}>
                        <TextField
                            error={inputLastName && !isLastName}
                            autoComplete="family-name"
                            value={inputLastName}
                            onChange={onChangeLastName}
                            required
                            fullWidth
                            placeholder="성"
                            InputProps={{
                                style: { fontSize: '1.3rem' },
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': {
                                        borderColor: '#87EEC5',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#8BD4D3',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    '&.Mui-focused': {
                                        color: '#8BD4D3',
                                    },
                                },
                                height: '50px',
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} mb={1}>
                        <TextField
                            error={inputEmail && !isEmail}
                            autoComplete="email"
                            value={inputEmail}
                            onChange={onChangeEmail}
                            required
                            fullWidth
                            placeholder="이메일을 입력해주세요."
                            helperText={
                                inputEmail ? (isEmail ? '올바른 형식입니다.' : '이메일 주소를 확인해 주세요.') : ''
                            }
                            InputProps={{
                                style: { fontSize: '1.3rem' },
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': {
                                        borderColor: '#87EEC5',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#8BD4D3',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    '&.Mui-focused': {
                                        color: '#8BD4D3',
                                    },
                                },
                                height: '50px',
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} mb={1}>
                        <TextField
                            error={inputPwd && !isPwd}
                            autoComplete="new-password"
                            value={inputPwd}
                            onChange={onChangePwd}
                            required
                            fullWidth
                            placeholder="비밀번호를 입력해주세요."
                            type="password"
                            helperText={
                                inputPwd
                                    ? isPwd
                                        ? '올바른 형식입니다.'
                                        : '숫자+영문자+특수문자 조합으로 8자리 이상 입력해 주세요.'
                                    : ''
                            }
                            InputProps={{
                                style: { fontSize: '1.3rem' },
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': {
                                        borderColor: '#87EEC5',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#8BD4D3',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    '&.Mui-focused': {
                                        color: '#8BD4D3',
                                    },
                                },
                                height: '50px',
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} mb={1}>
                        <TextField
                            error={inputConPwd && !isConPwd}
                            autoComplete="new-password"
                            value={inputConPwd}
                            onChange={onChangeConPwd}
                            required
                            fullWidth
                            placeholder="비밀번호를 재입력해주세요."
                            type="password"
                            helperText={
                                inputConPwd
                                    ? isConPwd
                                        ? '비밀번호가 일치합니다.'
                                        : '비밀번호가 일치하지 않습니다.'
                                    : ''
                            }
                            InputProps={{
                                style: { fontSize: '1.3rem' },
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': {
                                        borderColor: '#87EEC5',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#8BD4D3',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    '&.Mui-focused': {
                                        color: '#8BD4D3',
                                    },
                                },
                                height: '50px',
                            }}
                        />
                    </Grid>
                    <Grid container alignItems="center" display="flex" justifyContent="flex-end">
                        <FormControlLabel
                            control={<Checkbox checked={checkboxChecked} onClick={handleCheckboxClick} />}
                            label="개인정보 약관 동의"
                            labelPlacement="end"
                        />
                    </Grid>
                </Grid>
                {isFirstName && isLastName && isEmail && isPwd && isConPwd && checkboxChecked ? (
                    <ClickButton width={'100%'} height={'45px'}>
                        회원가입
                    </ClickButton>
                ) : (
                    <ClickButton width={'100%'} height={'45px'} disable={1}>
                        회원가입
                    </ClickButton>
                )}
            </Box>

            {modalOpen && (
                <Modal width={'100%'} height={'100%'} open={modalOpen} close={closeModal}>
                    <PrivacyTerms handleButtonClick={handleButtonClick} />
                </Modal>
            )}
        </>
    );
};

export default SignupForm;
