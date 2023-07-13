package com.MoneyPlant.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScheduleDto {
    private Long scId;
    private String scDate;    // 날짜 ex) "2023-07-07"
    private String scName;    // 일정이름
    private int scBudget;     // 예산
    private int colorId;
}
