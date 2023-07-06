import { useEffect, useState } from 'react';
import Box from '../../components/Common/Box';
import useViewport from '../../hooks/viewportHook';
import styled from 'styled-components';
import LedgerAxiosApi from '../../api/LedgerAxiosAPI';

const Calculate = () => {
    const [DailyIncome, setDailyIncome] = useState('');
    const [DailyExpense, setDailyExpense] = useState('');
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const formattedDate = `${year}-${Number(month)}`;
    const lastFormattedDate = `${year}-${Number(month) - 1}`;

    const { isMobile } = useViewport();
    useEffect(() => {
        const getDailyIncome = async () => {
            try {
                const rsp = await LedgerAxiosApi.getDailyIncome();
                if (rsp.status === 200) setDailyIncome(rsp.data);
                console.log(rsp.data);
            } catch (e) {
                console.log(e);
            }
        };
        getDailyIncome();
        const getDailyExpense = async () => {
            try {
                const rsp = await LedgerAxiosApi.getDailyExpense();
                if (rsp.status === 200) setDailyExpense(rsp.data);
                console.log(rsp.data);
            } catch (e) {
                console.log(e);
            }
        };
        getDailyExpense();
    }, []);

    return (
        <BoxContainer isMobile={isMobile}>
            <Box titleMargin={'20px'} height={'200px'} width={'45%'}>
                <div className="container">
                    <div className="minus" />
                    <div className="detail">
                        <div className="title">지난 달 대비 사용 금액</div>
                        <div className="textContent">
                            <div>지난 달</div>
                            <div>
                                {DailyExpense && DailyExpense[lastFormattedDate] ? DailyExpense[lastFormattedDate] : 0}
                            </div>
                        </div>
                        <div className="textContent">
                            <div>이번 달</div>
                            <div>{DailyExpense && DailyExpense[formattedDate] ? DailyExpense[formattedDate] : 0}</div>
                        </div>

                        <div className="hr"></div>
                        <div className="textContent">
                            <div> 이번 달은</div>
                            <div>
                                <span className="sum">
                                    {DailyExpense && DailyExpense[lastFormattedDate] && DailyExpense[formattedDate]
                                        ? parseInt(DailyExpense[lastFormattedDate]) -
                                          parseInt(DailyExpense[formattedDate])
                                        : DailyExpense && DailyExpense[formattedDate]
                                        ? -parseInt(DailyExpense[formattedDate])
                                        : DailyExpense && DailyExpense[lastFormattedDate]
                                        ? parseInt(DailyExpense[lastFormattedDate])
                                        : 0}
                                </span>
                                남았어요 !
                            </div>
                        </div>
                    </div>
                </div>
            </Box>
            <Box titleMargin={'20px'} height={'200px'} width={'45%'}>
                <div className="container">
                    <div className="minus" />
                    <div className="detail">
                        <div className="title">이번 달 남은 돈 확인</div>
                        <div className="textContent">
                            <div>수입</div>
                            <div>{DailyIncome && DailyIncome[formattedDate] ? DailyIncome[formattedDate] : 0}</div>
                        </div>
                        <div className="textContent">
                            <div>지출</div>
                            <div>{DailyExpense && DailyExpense[formattedDate] ? DailyExpense[formattedDate] : 0}</div>
                        </div>

                        <div className="hr"></div>
                        <div className="textContent">
                            <div> 합계 총</div>
                            <div>
                                <span className="sum">
                                    {DailyIncome && DailyExpense && DailyIncome[formattedDate]
                                        ? parseInt(DailyIncome[formattedDate]) - parseInt(DailyExpense[formattedDate])
                                        : DailyExpense && DailyExpense[formattedDate]
                                        ? -parseInt(DailyExpense[formattedDate])
                                        : DailyIncome && DailyIncome[formattedDate]
                                        ? parseInt(DailyIncome[formattedDate])
                                        : 0}
                                </span>
                                남았어요!
                            </div>
                        </div>
                    </div>
                </div>
            </Box>
        </BoxContainer>
    );
};

export default Calculate;

const BoxContainer = styled.div`
    display: ${(props) => (props.isMobile ? 'block' : 'flex')};
    align-items: center;
    justify-content: center;
    width: ${(props) => (props.isMobile ? '95%' : '90%')};
    margin: 0 auto;

    .textContent {
        display: flex;
        width: 93%;
        margin: 20px;
        font-size: 14px;
        justify-content: space-between;
        align-items: center;
        margin-left: 10px;
    }
    .hr {
        border-bottom: 1px solid black;
        width: 92%;
        display: flex;
        margin: 20px;
        align-items: center;
        justify-content: center;
    }
    .sum {
        font-size: 20px;
        font-weight: bolder;
        color: #3fcea5;
        margin-right: 10px;
    }
    .container {
        align-items: center;
        display: flex;
        justify-content: center;
    }
    .minus {
        border-bottom: 1px solid black;
        width: 10px;
        margin-left: 2%;
    }
    .detail {
        width: 100%;
    }
`;
