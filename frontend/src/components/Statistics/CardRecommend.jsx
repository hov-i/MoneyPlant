import styled from 'styled-components';
import { useEffect, useState } from 'react';
import CardAxiosApi from '../../api/CardAxiosAPI';
import CardList from './CardList';
import CategoryCard from './CategoryCard';
import ClickButton from '../Common/ClickButton';
import { Link } from 'react-router-dom';

const CardRecommend = () => {
    const [selectedCardRecommendDate, setSelectedCardRecommendDate] = useState([]);
    const [selectedCategoryCardTop1Date, setselectedCategoryCardTop1Date] = useState([]);
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });

    useEffect(() => {
        const getCardRecommend = async () => {
            const rsp = await CardAxiosApi.getCardRecommend();
            if (rsp.status === 200) setSelectedCardRecommendDate(rsp.data);
            console.log(rsp.data);
        };
        getCardRecommend();

        const getCategoryCardTop1 = async () => {
            const rsp = await CardAxiosApi.getCategoryCardTop1();
            if (rsp.status === 200) setselectedCategoryCardTop1Date(rsp.data);
            console.log(rsp.data);
        };
        getCategoryCardTop1();
    }, []);

    return (
        <>
            {selectedCategoryCardTop1Date.length >= 3 && (
                <>
                    <Title>
                        <p className="title">{currentMonth} 지출 카테고리</p>
                        <p className="title">TOP 3</p>
                        <p>당신의 지출 습관에 맞춰 카드를 준비해봤어요!</p>
                    </Title>
                    <CategoryCardFlex>
                        {selectedCategoryCardTop1Date.map((data, index) => (
                            <CategoryCard
                                key={index}
                                cardName={data.cardName}
                                cardImg={data.cardImg}
                                cardLink={data.cardLink}
                                cardCategory={data.cardCategory}
                                cardDesc={data.cardDesc}
                            />
                        ))}
                    </CategoryCardFlex>

                    {selectedCardRecommendDate.map((data, index) => (
                        <CardList
                            key={index}
                            cardName={data.cardName}
                            cardDesc={data.cardDescList.join('\n')}
                            cardImg={data.cardImg}
                            cardLink={data.cardLink}
                        />
                    ))}
                </>
            )}

            {selectedCategoryCardTop1Date.length < 3 && (
                <Error>
                    <div className="errorContainer">
                        <div className="errorMessage">이번달 지출 데이터가 부족해요</div>
                        <div className="ExpenseMessage">지출 데이터를 추가해보는건 어떠세요?</div>
                        <CustomLink to={'/'}>
                            <ClickButton width={'200px'}>지출 추가하러 가기</ClickButton>
                        </CustomLink>
                    </div>
                </Error>
            )}
        </>
    );
};

export default CardRecommend;

const Title = styled.div`
    margin: 20px;
    font-size: 12px;
    display: block;
    margin-top: 30px;
    margin-bottom: 10px;
    .title {
        font-size: 17px;
        margin-bottom: 10px;
        font-weight: bolder;
    }
`;

const CategoryCardFlex = styled.div`
    flex-wrap: wrap;
    width: 100%;
    align-items: center;
    padding: 2%;
    padding-top: 10px;
    padding-bottom: 0px;
`;

const Error = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    .errorContainer {
        text-align: center;
    }
    .errorContainer > button {
        align-items: center;
    }
    .errorMessage {
        font-weight: bolder;
        font-size: 15px;
    }
    .ExpenseMessage {
        font-size: 15px;
        margin: 10px;
        margin-bottom: 50px;
    }
    button {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
        margin-left: auto;
        margin-right: auto;
    }
`;

const CustomLink = styled(Link)`
    text-decoration: none;
`;
