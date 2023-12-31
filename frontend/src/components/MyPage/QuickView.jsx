import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import BlockLine from '../Common/BlockLine';
import Tag from './Tag';
// import ClickButton from "../Common/ClickButton";

import CalendarAxiosAPI from '../../api/CalendarAxiosAPI';

const QuickView = ({ isBasic, data, setData, close }) => {
    const [myPageList, setMyPageList] = useState([]);

    // mypage의 data를
    const onClickQuickMenu = (data) => {
        console.log(data);
        setData(data);
        close();
    };

    useEffect(() => {
        const getMyPageList = async () => {
            try {
                const rsp = await CalendarAxiosAPI.getMyPageList();
                if (rsp.status === 200) setMyPageList(rsp.data);
                setMyPageList(rsp.data);
                console.log('마이페이지 list 조회');
            } catch (error) {
                console.error('Request Error:', error);
            }
        };
        getMyPageList();
    }, []);

    return (
        <>
            <Title>간편 등록</Title>
            <BlockLine />
            <QuickViewContainer>
                {isBasic ? (
                    <>
                        {myPageList.myScheduleDtoList &&
                            myPageList.myScheduleDtoList.map((data1) => (
                                <div onClick={() => onClickQuickMenu(data1)} key={data1.id}>
                                    <Tag width={'20%'} color={data1.colorId} detail={data1.scName} />
                                </div>
                            ))}
                    </>
                ) : (
                    <>
                        {myPageList.myWorkDtoList &&
                            myPageList.myWorkDtoList.map((data2) => (
                                <div onClick={() => onClickQuickMenu(data2)} key={data2.id}>
                                    <Tag width={'20%'} color={data2.colorId} detail={data2.workName} />
                                </div>
                            ))}
                    </>
                )}
            </QuickViewContainer>

            {/*<ButtonContainer>*/}
            {/*    <ClickButton onClick={onChangeValue} width={"100px"} height={"35px"}>*/}
            {/*        선택하기*/}
            {/*    </ClickButton>*/}
            {/*</ButtonContainer>*/}
        </>
    );
};

export default QuickView;

const Title = styled.div`
    display: flex;
    align-items: center;
    font-size: 20px;
    justify-content: center;
    margin: 20px 10px;
`;

const QuickViewContainer = styled.div`
    width: '90%';
    margin: 25px;
    margin-bottom: 20px;
`;
