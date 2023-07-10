import styled from 'styled-components';

const Account = ({ account }) => {
    const color = account === '지출' ? '#ff005c' : '#3fcea5';

    return (
        <>
            <AccountContainer color={color}>
                <p className="item">스타벅스</p>
                <p>10000</p>
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
