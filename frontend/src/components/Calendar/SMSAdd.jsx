import styled from 'styled-components';
import BlockLine from '../Common/BlockLine';
import ClickButton from '../Common/ClickButton';
import CategoryInput from '../Common/CategoryInput';
import { useState } from 'react';
import LedgerAxiosApi from '../../api/LedgerAxiosAPI';
import categoryList from '../../styles/categoryExpenseColor';

const SMSAdd = () => {
    const [categoryId, setCategoryId] = useState(1); // 초기값으로 categoryId 1 설정
    const [defaultAmount, setDefaultAmount] = useState('');
    const [defaultDate, setDefaultDate] = useState('');
    const [defaultContent, setDefaultContent] = useState('');

    const handleCategoryIdChange = (id) => {
        setCategoryId(id);
    };

    const handleAmountChange = (event) => {
        setDefaultAmount(event.target.value);
    };

    const handleDateChange = (event) => {
        setDefaultDate(event.target.value);
    };

    const handleContentChange = (event) => {
        setDefaultContent(event.target.value);
    };

    const onCreateExpense = async () => {
        try {
            const amount = parseInt(defaultAmount);
            const createExpense = await LedgerAxiosApi.createExpense(categoryId, amount, defaultDate, defaultContent);
            if (createExpense.data === '지출을 성공적으로 생성했습니다.') {
                console.log('입력 성공');
                window.location.reload();
            } else {
                console.log('입력 실패');
                window.location.reload();
            }
        } catch (error) {
            console.log('에러:', error);
        }
    };

    const handleInputChange = (event) => {
        const inputValue = event.target.value;

        // 현재 년도 가져오기
        const currentYear = new Date().getFullYear();

        // 금액 추출
        const amountMatch = inputValue.match(/(\d+(?:,\d+)*)원/);
        const amount = amountMatch ? amountMatch[1].replace(/,/g, '') : '';
        setDefaultAmount(amount);

        // 날짜 추출
        const dateMatch = inputValue.match(/\d{2}\/\d{2}/);
        const date = dateMatch ? `${currentYear}-${dateMatch[0].replace('/', '-')}` : '';
        setDefaultDate(date);

        // 내용 추출
        const contentMatch = inputValue.match(/원(.+)/);
        const content = contentMatch ? contentMatch[1].trim() : '';
        setDefaultContent(content);
    };

    return (
        <>
            <Container>
                <Title>문자 입력</Title>
                <BlockLine />
                <CategoryInput
                    categoryList={categoryList}
                    categoryId={categoryId}
                    onCategoryIdChange={handleCategoryIdChange}
                />
                <p className="label">문자</p>
                <Input onChange={handleInputChange} />
                <InputContainer>
                    <p className="label">금액</p>
                    <Input value={defaultAmount} onChange={handleAmountChange} />
                    <p className="label">날짜</p>
                    <Input value={defaultDate} onChange={handleDateChange} type="date" id="date" />
                    <p className="label">내용</p>
                    <Input value={defaultContent} onChange={handleContentChange} />
                </InputContainer>
            </Container>
            <ButtonContainer>
                <ClickButton onClick={onCreateExpense}>지출 추가</ClickButton>
            </ButtonContainer>
        </>
    );
};

export default SMSAdd;

const Title = styled.div`
    display: flex;
    align-items: center;
    font-size: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
`;

const Input = styled.input`
    width: 70%;
    border-top: none;
    border-left: none;
    color: lightgray;
    border-right: none;
    border-bottom: 1px solid lightgray;
    text-align: right;
    outline: none;
    background-color: rgba(255, 255, 255, 0);

    :focus {
        border-bottom: 1px solid ${({ theme }) => theme.menuColor};
        color: ${({ theme }) => theme.menuColor};
    }
`;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    .label {
        margin: 10px;
        font-size: 15px;
    }
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    width: 200px;
    margin: 20px;
`;

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`;
