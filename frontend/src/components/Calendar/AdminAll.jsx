import React, { useState, useEffect} from 'react';
import styled from 'styled-components';
import BlockLine from '../Common/BlockLine';
import AdminContents from './AdminContents';
import AdminLedger from './AdminLedger';
import Tag from '../MyPage/Tag';
import Work from './Work';
import Account from './Account';
import LedgerAxiosApi from '../../api/LedgerAxiosAPI';

const AdminAll = ({ setValue }) => {
    const [selectTodayExpense, setSelectTodayExpense] = useState([]);
    const [selectTodayIncome, setSelectTodayIncome] = useState([]);

    useEffect(() => {
        const expenseDate = formatDate(setValue);
        const incomeDate = formatDate(setValue);

         function formatDate(date) {
             const formattedDate = new Date(date);
             formattedDate.setDate(formattedDate.getDate() + 1);
             return formattedDate.toISOString().split('T')[0];
         }

        const getTodayExpense = async () => {
            try {
                const rsp = await LedgerAxiosApi.getTodayExpense(expenseDate);
                if (rsp.status === 200) setSelectTodayExpense(rsp.data);
                console.log(rsp.data);
            } catch (e) {
                console.log(e);
            }
        };
        getTodayExpense();

        const getTodayIncome = async () => {
            try {
                const rsp = await LedgerAxiosApi.getTodayIncome(incomeDate);
                if (rsp.status === 200) setSelectTodayIncome(rsp.data);
                console.log(rsp.data);
            } catch (e) {
                console.log(e);
            }
        };
        getTodayIncome();
    }, [setValue]);

    return (
        <AdminAllContainer>
            <BlockLine />
            {/* 일정 */}
            <div className="block">
                <div className="title">일정</div>
                <AdminContents isBasic={true} setValue={setValue} />
            </div>
            <div className="tagBox">
                <Tag color={'red'} detail={'tes'}></Tag>
                <Tag color={'red'} detail={'test'}></Tag>
                <Tag color={'red'} detail={'test'}></Tag>
                <Tag color={'red'} detail={'test'}></Tag>
            </div>

            {/* 근무 */}
            <div className="block">
                <div className="title">근무</div>
                <AdminContents isBasic={false} setValue={setValue} />
            </div>
            <Work />
            <Work />
            <Work />

            <BlockLine />
            {/* 가계부 */}

            <div className="block">
                <div className="title">수입/지출</div>
                <AdminLedger setValue={setValue} />
            </div>
            <div className="accountBox">
                {selectTodayExpense.map((data, index) => {
                    return (
                        <Account
                            account={'지출'}
                            key={index}
                            amount={data.expenseAmount}
                            content={data.expenseContent}
                        />
                        );
                })}
                {selectTodayIncome.map((data, index) => {
                    return(
                        <Account
                            account={'수입'}
                            key={index}
                            amount={data.incomeAmount}
                            content={data.incomeAmount}
                        />
                    );
                })}
            </div>
        </AdminAllContainer>
    );
};

export default AdminAll;

const AdminAllContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    .block {
        display: flex;
        align-items: center;
    }

    .title {
        font-size: 15px;
        width: 100px;
        margin-left: 10px;
    }
    .tagBox {
        display: flex;
    }

    .accountBox {
        margin-bottom: 20px;
    }
`;
