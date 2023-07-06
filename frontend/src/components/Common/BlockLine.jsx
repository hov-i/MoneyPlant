import styled from 'styled-components';
const BlockLine = () => {
    return <BlockLineStyle />;
};
export default BlockLine;

const BlockLineStyle = styled.div`
    width: 100%;
    height: 10px;
    background-color: ${({ theme }) => theme.blockLineColor};
    box-shadow: inset 0px 0px 1px rgba(0, 0, 0, 0.25);
`;
