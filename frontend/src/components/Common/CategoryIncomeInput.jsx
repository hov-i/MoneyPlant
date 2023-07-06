import useViewport from '../../hooks/viewportHook';
import CategoryIncomeIcon from '../Common/CategoryIncomeIcon';
import styled from 'styled-components';
import React, { useState } from 'react';

const CategoryIncomeInput = ({ categoryIncomeList, categoryIncomeId, onCategoryIncomeIdChange }) => {
    const { isMobile } = useViewport();
    const [activeCategoryIncomeId, setActiveCategoryIncomeId] = useState(15); // 초기값으로 categoryId 15 설정

    const handleIconClick = (categoryIncomeId) => {
        const category = categoryIncomeList.find((item) => item.categoryIncomeId === categoryIncomeId);
        if (category) {
            onCategoryIncomeIdChange(category.categoryIncomeId);
            setActiveCategoryIncomeId(category.categoryIncomeId);
        }
    };

    return (
        <>
            <TitleMemoized categoryIncomeList={categoryIncomeList} categoryIncomeId={categoryIncomeId} />
            <IconBox isMobile={isMobile}>
                {categoryIncomeList.map((data, index) => (
                    <div className="icon" key={index}>
                        <Click
                            color={data.Color}
                            active={data.categoryIncomeId === activeCategoryIncomeId}
                            onClick={() => handleIconClick(data.categoryIncomeId)}
                        >
                            <CategoryIncomeIcon name={data.Name} color={data.Color} />
                        </Click>
                    </div>
                ))}
            </IconBox>
        </>
    );
};

export default CategoryIncomeInput;

const IconBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin: ${(props) => (props.isMobile ? '100px' : '20px')};
    margin-bottom: ${(props) => (props.isMobile ? '40px' : '20px')};
    margin-top: 0px;

    .icon {
        margin: 10px;
    }
`;

const Click = styled.div`
    width: 25px;
    height: 25px;
    border-radius: 50%;
    box-shadow: ${(props) => (props.active ? `0px 0px 10px 2px ${props.color}` : '')};
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Title = styled.div`
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px;
`;

const TitleMemoized = React.memo(({ categoryIncomeList, categoryIncomeId }) => {
    const category = categoryIncomeList.find((item) => item.categoryIncomeId === categoryIncomeId);
    const iconName = category ? category.Name : '';
    return <Title>{iconName}</Title>;
});
