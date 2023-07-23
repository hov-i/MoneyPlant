import styled from 'styled-components';
import useViewport from '../../hooks/viewportHook';

const CategoryCard = ({ cardCategory, cardName, cardImg, cardLink, cardDesc }) => {
    const handleClick = () => {
        window.open(cardLink);
    };
    const { isMobile } = useViewport();

    return (
        <CategoryCardContainer onClick={handleClick} isMobile={isMobile}>
            <div className="product-title">
                <div className="product-img-div">
                    <img className="product-img" src={cardImg} alt={cardName} />
                </div>
            </div>
            <div className="cardDetails">
                <p className="cardCategory">{cardCategory} 1위</p>
                <p className="cardName">{cardName}</p>
                <p className="cardDesc">{cardDesc}</p>
            </div>
        </CategoryCardContainer>
    );
};

export default CategoryCard;

const CategoryCardContainer = styled.div`
    background: linear-gradient(100deg, rgba(66, 230, 148, 0.142) 3.56%, rgba(59, 178, 184, 0.109) 96.4%);
    border-radius: 20px;
    display: flex;
    align-items: center;
    margin-bottom: 50px;

    .product-title {
        text-align: center;
        display: table;
        width: ${(props) => (props.isMobile ? '260px' : '280px')};
        height: ${(props) => (props.isMobile ? '230px' : '250px')};
    }

    .product-img-div {
        display: table-cell;
        vertical-align: middle;
    }

    .product-img {
        max-width: ${(props) => (props.isMobile ? '160px' : '180px')};
        max-height: ${(props) => (props.isMobile ? '160px' : '180px')};
        transform: rotate(13.636deg);
        box-shadow: 0px 20px 30px -10px #26394d;
    }

    .cardDetails {
        display: block;
    }

    .cardCategory {
        margin-bottom: 20px;
        font-weight: bolder;
        font-size: 20px;
    }

    .cardName {
        font-size: 30px;
        font-weight: bolder;
        margin-bottom: 10px;
        color: #3fcea5;
    }

    .cardDesc {
        font-size: 20px;
    }
`;
