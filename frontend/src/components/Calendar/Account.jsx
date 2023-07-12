import styled from 'styled-components';

const Account = ({ account, content, amount }) => {
    const color = account === '지출' ? '#ff005c' : '#3fcea5';
    const sign = account === '지출' ? '-' : '+';

    return (
        <>
            <AccountContainer color={color}>
                <p className="item">{content}</p>
                <p>{sign}{amount}</p>
            </AccountContainer>
        </>
    );
};
export default Account;

const AccountContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 2%;
    padding-right: 6%;
    color: ${({ color }) => color};
    margin-bottom: 20px;
    margin-top: 20px;
    .item {
        text-align: left;
        width: 80px;
    }
`;
