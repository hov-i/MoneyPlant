import React from "react";
import styled from "styled-components";
import BlockLine from "../Common/BlockLine";
import AdminContents from "./AdminContents";
import AdminLedger from "./AdminLedger";

const AdminAll = ({ setValue }) => {
  return (
    <AdminAllContainer>
      <BlockLine />

      {/* 일정 */}
      <AdminContents />

      <BlockLine />

      {/* 근무 */}
      <AdminContents  />

      <BlockLine />

      {/* 가계부 */}
      <AdminLedger value={setValue} />
    </AdminAllContainer>
  );
};

export default AdminAll;

const AdminAllContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
