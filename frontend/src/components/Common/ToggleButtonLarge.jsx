import React from 'react';
import styled from 'styled-components';

const ToggleButtonLarge = ({ offText, onText, isOn, handleToggle }) => {
    return (
        <>
            <SwitchInput id="toggle_large" type="checkbox" checked={isOn} onChange={handleToggle} />
            <SwitchLabel htmlFor="toggle_large">
                <OnButton />
                <TextContainer>
                    <OffText>{offText}</OffText>
                    <OnText>{onText}</OnText>
                </TextContainer>
            </SwitchLabel>
        </>
    );
};

export default ToggleButtonLarge;

const SwitchInput = styled.input`
    position: absolute;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
`;

const SwitchLabel = styled.label`
    display: flex;
    align-items: center;
    position: relative;

    cursor: pointer;
    width: ${({ width }) => width || '139px'};
    height: ${({ height }) => height || '47px'};
    background: ${({ theme }) => theme.bgColor};
    border-radius: 100px;
    transition: 0.2s;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);

    &:hover {
        background: ${({ theme }) => theme.bgColor};
    }
`;

const OnButton = styled.span`
    position: absolute;
    left: 3px;
    display: inline-block;
    width: ${({ width }) => width || '63px'};
    height: ${({ height }) => height || '37px'};

    transition: 0.2s;
    background: linear-gradient(100deg, rgba(66, 230, 149, 0.8) 3.56%, rgba(59, 178, 184, 0.8) 96.4%);
    box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.1);
    border-radius: 100px;

    /* 버튼 움직일 때 */
    ${SwitchInput}:checked + ${SwitchLabel} & {
        left: calc(100% - 3px);
        transform: translateX(-100%);
        background: linear-gradient(100deg, rgba(66, 230, 149, 0.8) 3.56%, rgba(59, 178, 184, 0.8) 96.4%);
        box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.1);
    }
`;

const TextContainer = styled.div`
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
    position: relative;
    text-align: center;
`;

const OffText = styled.span`
    font-weight: ${({ fontWeight }) => fontWeight || '500'};
    font-size: ${({ fontSize }) => fontSize || '13px'};
    line-height: 19px;
    color: #ffffff;
    position: relative;
    z-index: 1;
    margin-left: ${({ margin }) => margin || '15px'};

    /* ON 버튼이 눌리면 text 색 변화 */
    ${SwitchInput}:checked + ${SwitchLabel} & {
        color: rgba(192, 192, 192, 1);
    }
`;

const OnText = styled.span`
    font-weight: ${({ fontWeight }) => fontWeight || '500'};
    font-size: ${({ fontSize }) => fontSize || '13px'};
    line-height: 19px;
    color: rgba(192, 192, 192, 1);
    position: relative;
    z-index: 1;
    margin-right: ${({ margin }) => margin || '22px'};

    /* OFF 버튼이 눌리면 text 색 변화 */
    ${SwitchInput}:checked + ${SwitchLabel} & {
        color: #ffffff;
    }
`;
