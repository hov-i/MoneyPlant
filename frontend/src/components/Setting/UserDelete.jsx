import styled from 'styled-components';
import { useState } from 'react';
import ClickButton from '../Common/ClickButton';
import { FormControlLabel, Checkbox } from '@mui/material';
import AuthAxiosAPI from '../../api/AuthAxiosAPI';
import { useNavigate } from 'react-router-dom';
import useViewport from '../../hooks/viewportHook';

const UserDelete = () => {
    const [isAllChecked, setIsAllChecked] = useState(false);
    const navigate = useNavigate();
    const { isMobile } = useViewport();
    const handleCheckboxChange = (event) => {
        setIsAllChecked(event.target.checked);
    };

    const onDeleteUser = async () => {
        try {
            const confirmLogout = window.confirm('정말 탈퇴하시겠습니까?');
            if (confirmLogout) {
                const deleteUser = await AuthAxiosAPI.deleteUser();
                if (deleteUser.data === '탈퇴가 완료되었습니다.') {
                    console.log('회원 탈퇴 성공');
                    if (isMobile) {
                        navigate('/login');
                    } else {
                        navigate('/help');
                    }
                } else {
                    console.log('회원 탈퇴 실패');
                }
            }
        } catch (error) {
            console.log('에러:', error);
        }
    };

    return (
        <>
            <Title>주의하세요!</Title>
            <Wrapper>
                <div className="container">
                    <div>탈퇴 시 삭제되는 정보는 돌이킬 수 없습니다!</div>
                    <div className="center">회원 탈퇴 시 모든 데이터가 지워지며 복구가 불가능합니다.</div>
                    <div>회원 탈퇴로 인해 다음과 같은 서비스 이용이 불가능해집니다.</div>
                    <div className="delete">
                        <div>1. 계정 및 유저 정보 삭제</div>
                        <div className="margin">2. 나의 예산 서비스 삭제</div>
                        <div>3. 나의 일정/근무 기록 삭제</div>
                        <div className="margin">4. 나의 수입/지출 기록 삭제</div>
                        <div>5. 간편 입력 삭제</div>
                    </div>

                    <div className="checkbox">
                        <FormControlLabel
                            control={<Checkbox checked={isAllChecked} onChange={handleCheckboxChange} />}
                            label="전부 삭제하고 탈퇴하겠습니다."
                            labelPlacement="end"
                        ></FormControlLabel>
                    </div>

                    <div className="button">
                        <ClickButton disable={!isAllChecked} onClick={onDeleteUser}>
                            회원 탈퇴
                        </ClickButton>
                    </div>
                </div>
            </Wrapper>
        </>
    );
};
export default UserDelete;
const Title = styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    margin: 40px;
    font-weight: bolder;
`;
const Wrapper = styled.div`
    margin: 0 auto;
    font-size: 13px;

    width: 400px;
    .button {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 60px;
    }
    .container {
        align-items: center;
    }
    .center {
        margin-top: 5px;
        margin-bottom: 10px;
    }
    .delete {
        margin-top: 20px;
        margin-bottom: 20px;
        font-weight: bold;
        .margin {
            margin: 5px;
            margin-left: 0px;
        }
    }
`;
