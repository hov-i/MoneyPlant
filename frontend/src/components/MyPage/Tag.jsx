import styled from "styled-components";
import contentList from "../../styles/contentColor";

const Tag = ({ color, detail }) => {
  // 컨텐츠 이름을 받아오고, 콘텐츠별 설정된 색 코드를 contentList에서 해당하는 색 코드 찾아오기
  const setColor =
    color <= 4
      ? contentList.schedule.find((item) => item.contentId === color)
      : contentList.work.find((item) => item.contentId === color);

  return (
    <TagStyled backgroundColor={setColor ? setColor.Color : null}>
      {detail}
    </TagStyled>
  );
};

export default Tag;

const TagStyled = styled.button`
  height: 32px;
  border-radius: 15px;
  color: white;
  font-size: 12px;
  text-align: center;
  background: ${(props) => props.backgroundColor};
  margin: 1.5%;
  margin-top: 0px;
  box-shadow: 0px 2.04082px 4.08163px rgba(0, 0, 0, 0.05);
  border: none;
  outline: none;
`;
