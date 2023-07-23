import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { ReactComponent as CreditCard } from "../../assets/CreditCard.svg";
import { ReactComponent as List } from "../../assets/List.svg";
import { ReactComponent as Stats } from "../../assets/Stats.svg";
import { ReactComponent as Post } from "../../assets/Post.svg";
import { ReactComponent as Calendar } from "../../assets/Calendar.svg";
import { ReactComponent as Logout } from "../../assets/Logout.svg";
import useViewport from "../../hooks/viewportHook";

const Navbar = () => {
  const { isMobile } = useViewport();

  return (
    <NavContainer isMobile={isMobile}>
      {isMobile && (
        <CustomLink to={"/"} isMobile={isMobile}>
          <Calendar width="20" height="20" />
          <p className="navText">달력</p>
        </CustomLink>
      )}

      <CustomLink to={"/mybudget"} isMobile={isMobile}>
        <CreditCard width="20" height="17" />
        <p className="navText">나의 예산</p>
      </CustomLink>

      <CustomLink to={"/MainList"} isMobile={isMobile}>
        <List width="17" height="17" />
        <p className="navText">소비 리스트</p>
      </CustomLink>

      <CustomLink to={"/Chart"} isMobile={isMobile}>
        <Stats width="17" height="17" />
        <p className="navText">통계</p>
      </CustomLink>

      <CustomLink to={"/mypage"} isMobile={isMobile}>
        <Post width="17" height="17" />
        <p className="navText">간편 등록</p>
      </CustomLink>

    </NavContainer>
  );
};

export default Navbar;

const NavContainer = styled.div`
  width: ${(props) => (props.isMobile ? "100%" : "180px")};
  height: ${(props) => (props.isMobile ? "50px" : "100vh")};
  bottom: ${(props) => (props.isMobile ? "0" : "")};
  display: ${(props) => (props.isMobile ? "flex" : "block")};
  background-color: ${({ theme }) => theme.bgColor};
  justify-content: ${(props) => (props.isMobile ? "space-evenly" : "none")};
  box-shadow: inset 8px 3px 36px rgba(0, 0, 0, 0.08);
  position: fixed;
  margin-top: 73px;
  z-index: 2;

  .logoutDiv {
    position: fixed;
    bottom: 30px;
    display: flex;
    align-items: center;
    height: 40px;
    font-size: 12px;
    font-weight: 700;
    padding-left: 10px;
    margin: 20px;
    > svg {
      fill: ${({ theme }) => theme.menuColor};
      margin-right: 10px;
    }
    &:hover {
      background-color: #ffffff00;
      border-radius: 5px;
    }
  }
`;

const CustomLink = styled(NavLink)`
  color: ${({ theme }) => theme.menuColor};
  > svg {
    fill: ${({ theme }) => theme.menuColor};
    margin-left: ${(props) => (props.isMobile ? "5px" : "0px")};
  }
  height: 40px;
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
  display: flex;
  padding-left: ${(props) => (props.isMobile ? "0px" : "10px")};
  margin: ${(props) => (props.isMobile ? "0px" : "20px")};
  flex-direction: ${(props) => (props.isMobile ? "column" : "none")};
  justify-content: ${(props) => (props.isMobile ? "center" : "none")};
  align-items: center;

  .navText {
    margin-left: 8px;
  }

  &.active {
    background: ${(props) =>
      props.isMobile
        ? "#ffffff00"
        : "linear-gradient(100deg, rgba(66, 230, 148, 0.090) 3.56%, rgba(59, 178, 184, 0.090) 96.4%)"};
    color: #3fcea5;
    > svg {
      fill: url(#paint0_linear_273_162);
    }
    border-radius: 5px;
    &:hover {
      background-color: ${(props) =>
        props.isMobile ? "#ffffff00" : "#3FCEA520"};
      border-radius: 5px;
    }
  }

  &:hover {
    background-color: ${(props) =>
      props.isMobile ? "#ffffff00" : props.theme.menuBgColor};
    border-radius: 5px;
  }
`;
