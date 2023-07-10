import React from "react";
import styled from "styled-components";

const FindPassword = () => {
  return (
    <FindPasswordContainer>
      {/* 비밀번호 찾기 */}
      <>비밀번호 찾는 창</>
    </FindPasswordContainer>
  );
};

export default FindPassword;

const FindPasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
