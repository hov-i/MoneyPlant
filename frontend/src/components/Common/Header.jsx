import styled from "styled-components";
import logo from "../../assets/Logo.png";
import { NavLink } from "react-router-dom";
import darkMode from "../../assets/DarkMode.png";
import AvatarButton from "./AvatarButton";
import { useContext } from "react";
import { ThemeContext } from "../themeProvider";

const Header = () => {
  const { isDark, setIsDark } = useContext(ThemeContext);
  const handleDarkModeToggle = () => {
    setIsDark(!isDark);
  };
  return (
    <Container>
      <NavLink to="/">
        <Logo src={logo} alt="#"></Logo>
      </NavLink>

      <div className="headerRight">
        {/* dark mode button*/}
        <DarkModeButton onClick={handleDarkModeToggle}>
          <img src={darkMode} alt="#" />
        </DarkModeButton>

        <AvatarButton></AvatarButton>
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
`;

const DarkModeButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.toggleButton.bgColor};
  box-shadow: ${({ theme }) => theme.toggleButton.boxShadow};
  border: none;
`;
