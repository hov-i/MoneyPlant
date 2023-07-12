import styled from 'styled-components';
import logo from '../../assets/Logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import darkMode from '../../assets/DarkMode.png';
import AvatarButton from './AvatarButton';
import { useContext, useState } from 'react';
import { ThemeContext } from '../themeProvider';
import { ReactComponent as Logout } from '../../assets/Logout.svg';
import AuthAxiosAPI from '../../api/AuthAxiosAPI';
import useViewport from '../../hooks/viewportHook';

const Header = () => {
    const navigate = useNavigate();
    const { isDark, setIsDark } = useContext(ThemeContext);
    const [showLogoutButton, setShowLogoutButton] = useState(false);
    const { isMobile } = useViewport();

    const onClickLogOut = async (e) => {
        e.preventDefault();
        try {
            const response = await AuthAxiosAPI.logout();
            if (response.status === 200) {
                console.log('logout successful');
                navigate('/login');
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleDarkModeToggle = () => {
        setIsDark(!isDark);
    };

    const handleAvatarButtonClick = () => {
        isMobile && setShowLogoutButton(!showLogoutButton);
    };

    return (
        <Container>
            <NavLink to="/">
                <Logo src={logo} alt="#" />
            </NavLink>

            <div className="headerRight">
                {/* dark mode button*/}
                <DarkModeButton onClick={handleDarkModeToggle}>
                    <img src={darkMode} alt="#" />
                </DarkModeButton>
                <div className="authDiv" onClick={handleAvatarButtonClick}>
                    <AvatarButton />
                    {showLogoutButton && isMobile &&(
                        <LogoutButton onClick={onClickLogOut}>
                            <Logout width="17" height="" fill="#575757" />
                            <p className="logout">로그아웃</p>
                        </LogoutButton>
                    )}
                </div>
            </div>
        </Container>
    );
};

export default Header;

const Logo = styled.img`
    width: 213px;
    height: 39px;
`;

const Container = styled.div`
    z-index: 2;
    width: 100%;
    height: 73px;
    position: fixed;
    padding: 0 11px 0 22px;
    background-color: ${({ theme }) => theme.bgColor};
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;

    div {
        display: flex;
        align-items: center;
    }

    .authDiv {
        display: block;
    }
`;

const DarkModeButton = styled.button`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.toggleButton.bgColor};
    box-shadow: ${({ theme }) => theme.toggleButton.boxShadow};
    border: none;
`;

const LogoutButton = styled.div`
    width: 110px;
    height: 40px;
    flex-shrink: 0;
    border-radius: 7px;
    position: fixed;
    right: 20px;
    background-color: ${({ theme }) => theme.bgColor};
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    > svg {
        fill: ${({ theme }) => theme.menuColor};
        margin-right: 5px;
    }
    .logout {
        font-size: 12px;
        font-weight: 700;
        padding-left: 10px;
    }
`;
