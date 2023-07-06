package com.MoneyPlant.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WorkDto {
    private Long userId;
    private String workName; // 근무 이름
    private int payType; // 시급, 건별, 일급, 월급
    private int workMoney; // 시급 : 시급 금액, 건별 : 건별 금액 / 월급 : 연봉
    private String workDate; // 근무 날짜
    private double workStart; // 근무 시작 시간
    private double workEnd; // 근무 종료 시간
    private int workRest; // 근무 휴식 시간
    private double workTax; // 급여 세금
    private String workPayday; // 급여 지급일
    private int color; // 근무 등록 color
    private double workPay; // 마이페이지 1일 (또는 연봉) 급여 금액
}