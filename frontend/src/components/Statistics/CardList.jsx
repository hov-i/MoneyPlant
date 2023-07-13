import styled from "styled-components";
import ClickButton from "../Common/ClickButton";
import useViewport from "../../hooks/viewportHook";

const CardList = ({ cardName, cardDesc, cardImg, cardLink }) => {
  const { isMobile } = useViewport();
  const handleClick = () => {
    window.open(cardLink);
  };

  return (
    <CardListContainer>
      <div className="cardlist">
        <div className="product-title">
          <div className="product-img-div">
            <img className="product-img" src={cardImg} alt={cardName} />
          </div>
        </div>
        <div className="cardDetails">
          <p className="cardName">{cardName}</p>
          <p className="cardDesc">
            {cardDesc.split("\n").map((desc, index) => (
              <span key={index}>
                {desc}
                <br />
              </span>
            ))}
          </p>
        </div>
      </div>
      {isMobile ? (
        <ButtonContainer></ButtonContainer>
      ) : (
        <ButtonContainer>
          <ClickButton onClick={handleClick} width={"100%"}>
            카드 정보 보기
          </ClickButton>
        </ButtonContainer>
      )}
    </CardListContainer>
  );
};

export default CardList;

const CardListContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-bottom: 0px;
  margin-top: 30px;

  .cardlist {
    display: flex;
    align-items: center;
  }

  .product-title {
    text-align: center;
    display: table;
    width: 200px;
    height: 150px;
  }

  .product-img-div {
    display: table-cell;
    vertical-align: middle;
    width: 20%;
  }

  .product-img {
    max-width: 120px;
    max-height: 120px;
  }

  .cardDetails {
    display: block;
  }

  .cardName {
    font-size: 15px;
    font-weight: bolder;
    margin-top: 10px;
  }

  .cardDesc {
    font-size: 12px;
    margin-bottom: 10px;
    margin-top: 10px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 30px;
`;
