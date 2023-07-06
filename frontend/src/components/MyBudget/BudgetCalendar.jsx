import { useState, useEffect } from 'react';
import { ReactComponent as Right } from '../../assets/right.svg';
import { ReactComponent as Left } from '../../assets/left.svg';
import styled from 'styled-components';
import { useMemo } from 'react';

const BudgetCalendar = ({ onChangeDate }) => {
    const currentDate = useMemo(() => new Date(), []);
    const [year, setYear] = useState(currentDate.getFullYear());
    const [month, setMonth] = useState(currentDate.getMonth() + 1);

    useEffect(() => {
        if (typeof onChangeDate === 'function') {
            const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(currentDate.getDate()).padStart(
                2,
                '0'
            )}T01:01:01`; // 시간을 고정된 값인 "01:01:01"으로 설정

            const cleanedDate = formattedDate.replace(/\s/g, ''); // 띄어쓰기 제거

            onChangeDate(cleanedDate);
        }
    }, [year, month, currentDate, onChangeDate]);

    const handleNextMonth = () => {
        if (month === 12) {
            setYear(year + 1);
            setMonth(1);
        } else {
            setMonth(month + 1);
        }
    };

    const handlePreviousMonth = () => {
        if (month === 1) {
            setYear(year - 1);
            setMonth(12);
        } else {
            setMonth(month - 1);
        }
    };

    return (
        <>
            <Calendar>
                <div className="clickbutton" onClick={handlePreviousMonth}>
                    <Left />
                </div>

                <div className="calbox">
                    <span className="date">
                        {year}년 {month}월
                    </span>
                </div>
                <div className="clickbutton" onClick={handleNextMonth}>
                    <Right />
                </div>
            </Calendar>
        </>
    );
};

export default BudgetCalendar;

const Calendar = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    .calbox {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 140px;
    }
    .date {
        font-style: normal;
        font-weight: bolder;
        font-size: 18px;
    }

    .clickbutton {
        border-radius: 50%;
        width: 30px;
        height: 30px;
        background-color: #ffffff00;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
            background-color: ${({ theme }) => theme.menuBgColor};
        }
        > svg {
            fill: ${({ theme }) => theme.budgetButton};
        }
    }
`;
