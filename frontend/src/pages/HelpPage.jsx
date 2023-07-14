import styled, { keyframes } from 'styled-components';
import { ReactComponent as Leaf } from '../assets/Leaf.svg';
import MockUp from '../assets/mockup.png';
import MockUpMobile from '../assets/mockupMobile.png';
import useViewport from '../hooks/viewportHook';
import { useNavigate } from 'react-router-dom';

const HelpPage = () => {
    const { isMobile } = useViewport();
    const navigate = useNavigate();
    return (
        <>
            {isMobile ? (
                <BackGroundBox isMobile={isMobile}>
                    <AnimatedContent isMobile={isMobile}>
                        <p className="subtitle">당신의 재산 지킴이</p>
                        <div className="title">
                            Moneyplan:T{' '}
                            <div className="icon">
                                <Leaf width="18px" height="18px" />
                            </div>
                        </div>
                        <div className="button" onClick={() => navigate('/login')}>
                            시작하기
                        </div>
                    </AnimatedContent>
                    <img src={MockUpMobile} alt="mockUpImg" />
                </BackGroundBox>
            ) : (
                <BackGroundBox>
                    <AnimatedContent>
                        <p className="subtitle">당신의 재산 지킴이</p>
                        <div className="title">
                            Moneyplan:T{' '}
                            <div className="icon">
                                <Leaf width="50px" height="50px" />
                            </div>
                        </div>
                        <div className="button" onClick={() => navigate('/login')}>
                            시작하기
                        </div>
                    </AnimatedContent>
                    <img src={MockUp} alt="mockUpImg" />
                </BackGroundBox>
            )}
        </>
    );
};

export default HelpPage;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AnimatedContent = styled.div`
    animation: ${fadeIn} 1s ease-in-out;
    margin: ${(props) => (props.isMobile ? '0 auto' : '')};

    .subtitle {
        color: #fff;
        font-size: ${(props) => (props.isMobile ? '16px' : '24px')};
        padding-top: ${(props) => (props.isMobile ? '10vh' : '180px')};
        padding-left: ${(props) => (props.isMobile ? '' : '21%')};
        position: relative;
        text-align: ${(props) => (props.isMobile ? 'center' : '')};
        margin-bottom: ${(props) => (props.isMobile ? '10px' : '')};
        top: 40px;
    }

    .title {
        color: #fff;
        font-family: Inter;
        font-size: ${(props) => (props.isMobile ? '40px' : '70px')};
        padding-left: ${(props) => (props.isMobile ? '' : '20%')};
        font-weight: 700;
        display: flex;
        justify-content: ${(props) => (props.isMobile ? 'center' : '')};
        align-items: flex-end;
        text-align: ${(props) => (props.isMobile ? 'center' : '')};

        .icon {
            margin-bottom: ${(props) => (props.isMobile ? '30px' : '40px')};
        }
    }

    .button {
        border-radius: 35px;
        background: #fff;
        width: 120px;
        height: 50px;
        margin-left: ${(props) => (props.isMobile ? '' : '20%')};
        color: #61d1ba;
        font-size: 18px;
        font-weight: 900;
        line-height: 50px;
        text-align: center;
        margin: ${(props) => (props.isMobile ? '0 auto' : '')};
        margin-top: 20px;
    }
`;

const BackGroundBox = styled.div`
    width: 100%;
    height: 100vh;
    display: ${(props) => (props.isMobile ? 'block' : 'flex')};
    justify-content: space-between;
    background: var(--theme, linear-gradient(135deg, rgba(66, 230, 149, 0.8) 0%, rgba(59, 178, 184, 0.8) 100%));

    img {
        max-width: 100%;
        height: auto;
        object-fit: cover;
        margin-top: ${(props) => (props.isMobile ? '20vh' : '')};
    }
`;
