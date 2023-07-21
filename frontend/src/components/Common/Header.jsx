import styled from 'styled-components';
import logo from '../../assets/Logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import darkMode from '../../assets/DarkMode.png';
import AvatarButton from './AvatarButton';
import { useContext, useState } from 'react';
import { ThemeContext } from '../themeProvider';
import { ReactComponent as Logout } from '../../assets/Logout.svg';
import { ReactComponent as Person } from '../../assets/Person.svg';
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
        setShowLogoutButton(!showLogoutButton);
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
                    {showLogoutButton && (
                        <ProfileButton>
                            <MyPageButton to={'/setting'}>
                                <Person width="19" height="19" fill="#575757" />
                                <p className="logout">마이페이지</p>
                            </MyPageButton>
                                <LogoutButton onClick={onClickLogOut}>
                                    <Logout width="17" height="17" fill="#575757" />
                                    <p className="logout">로그아웃</p>
                                </LogoutButton>
                        </ProfileButton>
                    )}
                </div>
            </div>
        </Container>
    );
};

export default Header;

const Logo = styled.img`
    width: 200px;
    max-height: 100%;
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

const MyPageButton = styled(NavLink)`
    width: 110px;
    padding-top: 10px;
    padding-bottom: 10px;
    flex-shrink: 0;
    border-radius: 7px;
    text-decoration: none;
    color: inherit;
    position: fixed;
    top: 70px;
    right: 20px;
    background-color: ${({ theme }) => theme.bgColor};
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    > svg {
        fill: ${({ theme }) => theme.menuColor};
    }
    .logout {
        font-size: 12px;
        font-weight: 700;
        padding-left: 10px;
    }
`;

const LogoutButton = styled.div`
    width: 110px;
    padding-top: 10px;
    padding-bottom: 10px;
    flex-shrink: 0;
    border-radius: 0 0 7px 7px;

    position: fixed;
    right: 20px;
    top: 105px;
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

const ProfileButton = styled.div`
    display: block;
`;
