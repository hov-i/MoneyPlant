import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BlockLine from "../Common/BlockLine";
import AdminContents from "./AdminContents";
import AdminLedger from "./AdminLedger";
import ScAdd from "../Calendar/ScAdd";
import WorkAdd from "../Calendar/WorkAdd";
import Modal from "../Common/Modal";
import Tag from "../MyPage/Tag";
import Account from "./Account";
import LedgerAxiosApi from "../../api/LedgerAxiosAPI";
import CalendarAxiosApi from "../../api/CalendarAxiosAPI";

const AdminAll = ({ setValue, isBasic }) => {
  const [modalOpenSc, setModalOpenSc] = useState(false);
  const [modalOpenWk, setModalOpenWk] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const openModalSc = (data) => {
    setSelectedData(data);
    setModalOpenSc(true);
  };

  const openModalWk = (data) => {
    setSelectedData(data);
    setModalOpenWk(true);
  };

  const closeModalSc = () => {
    setModalOpenSc(false);
  };
  const closeModalWk = () => {
    setModalOpenWk(false);
  };

  const [selectTodaySc, setSelectTodaySc] = useState([]);
  const [selectTodayWork, setSelectTodayWork] = useState([]);
  const [selectTodayExpense, setSelectTodayExpense] = useState([]);
  const [selectTodayIncome, setSelectTodayIncome] = useState([]);

  useEffect(() => {
    const nowDate = formatDate(setValue);

    function formatDate(date) {
      const formattedDate = new Date(date);
      formattedDate.setDate(formattedDate.getDate() + 1);
      return formattedDate.toISOString().split("T")[0];
    }

    const getTodaySchedule = async () => {
      try {
        const rsp = await CalendarAxiosApi.getTodaySchedule(nowDate);
        if (rsp.status === 200) setSelectTodaySc(rsp.data);
        console.log(rsp.data);
      } catch (e) {
        console.log(e);
      }
    };
    getTodaySchedule();

    const getTodayWork = async () => {
      try {
        const rsp = await CalendarAxiosApi.getTodayWork(nowDate);
        if (rsp.status === 200) setSelectTodayWork(rsp.data);
        console.log(rsp.data);
      } catch (e) {
        console.log(e);
      }
    };
    getTodayWork();

    const getTodayExpense = async () => {
      try {
        const rsp = await LedgerAxiosApi.getTodayExpense(nowDate);
        if (rsp.status === 200) setSelectTodayExpense(rsp.data);
        console.log(rsp.data);
      } catch (e) {
        console.log(e);
      }
    };
    getTodayExpense();

    const getTodayIncome = async () => {
      try {
        const rsp = await LedgerAxiosApi.getTodayIncome(nowDate);
        if (rsp.status === 200) setSelectTodayIncome(rsp.data);
        console.log(rsp.data);
      } catch (e) {
        console.log(e);
      }
    };
    getTodayIncome();
  }, [setValue]);

  return (
    <AdminAllContainer>
      <BlockLine />
      {/* 일정 */}
      <div className="block">
        <div className="title">일정</div>
        <AdminContents isBasic={true} setValue={setValue} />
      </div>
      <div className="tagBox">
        {selectTodaySc.length === 0 && selectTodaySc.length === 0 ? (
          <p className="none">등록 된 일정이 없습니다.</p>
        ) : (
          <>
            {selectTodaySc.map((data) => (
              <ScheduleContainer onClick={() => openModalSc(data)}>
                <Tag width={"70%"} color={data.colorId} detail={data.scName} />
              </ScheduleContainer>
            ))}
          </>
        )}
      </div>

      {/* 근무 */}
      <div className="block">
        <div className="title">근무</div>
        <AdminContents isBasic={false} setValue={setValue} />
      </div>
      <div className="tagBox">
        {selectTodayWork.length === 0 && selectTodayWork.length === 0 ? (
          <p className="none">등록 된 근무가 없습니다.</p>
        ) : (
          <>
            {selectTodayWork.map((data) => (
              <WorkContainer onClick={() => openModalWk(data)}>
                <Tag width={"70%"} color={data.colorId} detail={data.workName}/>
                <p className="time">
                  {data.workStart} ~ {data.workEnd}
                </p>
                <p className="money">{data.workPay}원</p>
              </WorkContainer>
            ))}
          </>
        )}
      </div>
      <BlockLine />
      {/* 가계부 */}
      <div className="block">
        <div className="title">수입/지출</div>
        <AdminLedger setValue={setValue} />
      </div>
      <div className="tagBox">
        {selectTodayExpense.length === 0 && selectTodayIncome.length === 0 ? (
          <p className="none">수입/지출 내역이 없습니다.</p>
        ) : (
          <>
            {selectTodayExpense.map((data, index) => (
              <Account
                account={"지출"}
                key={index}
                amount={data.expenseAmount}
                content={data.expenseContent}
                categoryName={data.categoryName}
                setValue={setValue}
                categoryId={data.categoryId}
                Id={data.expenseId}
              />
            ))}
            {selectTodayIncome.map((data, index) => (
              <Account
                account={"수입"}
                key={index}
                amount={data.incomeAmount}
                content={data.incomeContent}
                categoryName={data.categoryIncomeName}
                setValue={setValue}
                categoryId={data.categoryIncomeId}
                Id={data.incomeId}
              />
            ))}
          </>
        )}
      </div>
      {/* 모달 */}
      {modalOpenSc && (
        <Modal open={modalOpenSc} close={closeModalSc} width={"300px"}>
          <ScAdd isUpdate={true} data={selectedData} />
        </Modal>
      )}

      {modalOpenWk && (
        <Modal open={modalOpenWk} close={closeModalWk} width={"300px"}>
          <WorkAdd isUpdate={true} data={selectedData} />
        </Modal>
      )}
    </AdminAllContainer>
  );
};

export default AdminAll;

const AdminAllContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .none {
    margin-left: 20px;
    font-size: 12px;
  }
  .border {
    border-bottom: 1px solid black;
    width: 95%;
    margin-left: 3px;
    padding-right: 50px;
  }
  .block {
    display: flex;
    align-items: center;
    padding-left: 10px;
  }
  .title {
    font-size: 15px;
    width: 100px;
    margin-left: 10px;
  }
  .tagBox {
    display: flex;
    flex-wrap: wrap;
    padding-left: 10px;
    margin-bottom: 30px;
    /* width: 95%; */
  }
  .accountBox {
    margin-bottom: 20px;
    padding-right: 10px;
  }
`;

const ScheduleContainer = styled.div`
  display: flex;
  width: 20%;
`;

const WorkContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  padding: 0 10px;
  font-size: 12px;
  width: 100%;
  cursor: pointer;

  .time {
    margin-left: 20%;
    margin-right: 20%;
    width: 100%;
  }
  .money {
    width: 85%;
    margin-right: 30px;
    text-align: right;
  }
`;
