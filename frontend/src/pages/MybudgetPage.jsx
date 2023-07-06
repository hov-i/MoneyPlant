import React, { useState } from 'react';
import Header from '../components/Common/Header';
import Navbar from '../components/Common/Navbar';
import ClickButton from '../components/Common/ClickButton';
import Container from '../components/Common/Container';
import Box from '../components/Common/Box';
import BudgetChart from '../components/MyBudget/BudgetChart';
import CategoryTotalBar from '../components/MyBudget/CategoryTotalBar';
import BudgetCalendar from '../components/MyBudget/BudgetCalendar';
import Modal from '../components/Common/Modal';
import BudgetAdd from '../components/MyBudget/BudgetAdd';
import { useEffect } from 'react';
import AxiosApi from '../api/BudgetAxiosAPI';

const MybudgetPage = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    const handleDateChange = (date) => {
        setSelectedDate(date);
        console.log(date);
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };
    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
        const getMyBudget = async () => {
            try {
                const rsp = await AxiosApi.getMyBudget();
                if (rsp.status === 200) setCategoryData(rsp.data);
                console.log(rsp.data);
            } catch (e) {
                console.log(e);
            }
        };
        getMyBudget();
    }, []);
    const selectedMonth = selectedDate.substring(0, 7);

    const filteredCategoryData = categoryData.filter((data) => {
        const dataMonth = data.budgetMonth.substring(0, 7); // 데이터의 월 값만 추출
        return dataMonth === selectedMonth;
    });

    const totalData = [{ Money: '0', date: selectedMonth }];

    if (filteredCategoryData.length > 0) {
        const totalMoney = filteredCategoryData.reduce((sum, data) => sum + data.budgetMoney, 0);
        totalData[0].Money = totalMoney.toString();
    }

    return (
        <>
            <Header />
            <Navbar />
            <Container flex="column">
                <Box titleMargin={'20px'}>
                    <div className="content">
                        <p className="title">나의 예산</p>
                        <ClickButton width={'90px'} onClick={openModal}>
                            예산 추가
                        </ClickButton>
                    </div>
                    <div className="content">
                        <BudgetCalendar onChangeDate={handleDateChange}></BudgetCalendar>
                        <div className="total">
                            <p>총 예산</p>
                            <p className="totalMoney">{totalData[0].Money ? totalData[0].Money : '0'}원</p>
                        </div>
                    </div>
                    <div className="content">
                        <CategoryTotalBar categoryData={filteredCategoryData} totalData={totalData} />
                    </div>
                </Box>
                <Box>
                    <div className="center">
                        {filteredCategoryData.map((data) => {
                            if (data.Money === '0') return null; // 돈이 0인 경우 null 리턴
                            return (
                                <BudgetChart
                                    key={data.categoryId}
                                    name={data.categoryName}
                                    money={data.budgetMoney}
                                    totalMoney={totalData[0].Money ? totalData[0].Money : '0'}
                                />
                            );
                        })}
                    </div>
                </Box>
                {modalOpen && (
                    <Modal open={modalOpen} close={closeModal}>
                        <BudgetAdd categoryData={categoryData}></BudgetAdd>
                    </Modal>
                )}
            </Container>
        </>
    );
};
export default MybudgetPage;
