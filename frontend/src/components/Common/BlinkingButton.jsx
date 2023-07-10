import React from 'react';
import styled, { keyframes } from 'styled-components';
import { ReactComponent as Plus } from '../../assets/plus.svg';

const BlinkingButton = ({ clickOn }) => {
    return (
        <AdminAllContainer>
            <Header>
                <Button onClick={clickOn} />
            </Header>
            <svg width="0" height="0">
                <defs>
                    <linearGradient id="gradientId" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(90, 243, 167, 0.7)" />
                        <stop offset="100%" stopColor="rgba(47, 155, 161, 0.7)" />
                    </linearGradient>
                </defs>
            </svg>
        </AdminAllContainer>
    );
};

export default BlinkingButton;

const AdminAllContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

const blinkingAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const Button = styled(Plus)`
    width: 18px;
    height: 18px;
    margin-top: 10px;
    fill: url(#gradientId);

    &:hover {
        animation: ${blinkingAnimation} 1s infinite;
    }
`;

const Header = styled.div`
    width: 85%;
    margin: 0 auto;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: right;
    margin-bottom: 20px;
    /* background-color: aquamarine; */
`;
