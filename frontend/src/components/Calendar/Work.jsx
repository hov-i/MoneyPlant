import Tag from '../MyPage/Tag';
import styled from 'styled-components';

const Work = () => {
    return (
        <>
            <WorkContainer>
                <Tag color={'red'} detail={'test'} />
                <p className="time">18:00~23:00</p>
                <p className="money">50000</p>
            </WorkContainer>
        </>
    );
};

export default Work;

const WorkContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;

    .time {
        margin-left: 30%;
        margin-right: 30%;
    }
    .money {
        width: 80px;
        margin-right: 30px;
        text-align: right;
    }
`;
