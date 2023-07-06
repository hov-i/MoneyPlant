import styled from 'styled-components';
import useViewport from '../../hooks/viewportHook';
const Box = ({ children, height, titleMargin, width }) => {
    const { isMobile } = useViewport();

    return (
        <BoxStyle height={height} margin={titleMargin} width={width} isMobile={isMobile}>
            {children}
        </BoxStyle>
    );
};
export default Box;

const BoxStyle = styled.div`
    width: ${({ width, widthMobile, isMobile }) => (isMobile ? widthMobile || '90%' : width || '80%')};
    margin: 0 auto;
    margin-bottom: 20px;
    height: ${({ height }) => height || ''};
    background-color: ${({ theme }) => theme.bgColor};
    box-shadow: 0px 5px 2px rgba(0, 0, 0, 0.1);
    border-radius: 10px;

    .content {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        align-items: center;
    }

    .title {
        font-style: normal;
        font-weight: bolder;
        font-size: 18px;
        margin: ${({ margin }) => margin || ''};
    }

    .date {
        margin: 8px;
        font-style: normal;
        font-weight: bolder;
        font-size: 18px;
    }

    .total {
        text-align: right;
        font-size: 12px;
        margin-right: 10px;
    }

    .totalMoney {
        font-size: 19px;
        margin-top: 10px;
    }
`;
