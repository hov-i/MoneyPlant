import styled from 'styled-components';

const ClickButton = ({ width, height, margin, children, onClick, disable }) => {
    return (
        <ClickButtonStyled
            width={width}
            height={height}
            margin={margin}
            onClick={onClick}
            disabled={disable} // disable prop에 따라 disabled 속성 추가
        >
            {children}
        </ClickButtonStyled>
    );
};

export default ClickButton;

const ClickButtonStyled = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0 16px;
    width: ${(props) => props.width || '128px'};
    height: ${(props) => props.height || '40px'};
    margin-right: ${(props) => props.margin || ''};
    background: linear-gradient(100deg, rgba(66, 230, 149, 0.7) 3.56%, rgba(59, 178, 184, 0.7) 96.4%);
    box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    border: none;
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')}; // disable prop에 따라 커서 스타일 변경
    opacity: ${(props) => (props.disabled ? 0.5 : 1)}; // disable prop에 따라 투명도 변경

    color: #ffffff;

    &:hover {
        background: linear-gradient(100deg, rgba(66, 230, 149, 1) 3.56%, rgba(59, 178, 184, 1) 96.4%);
    }
`;
