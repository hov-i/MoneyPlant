package com.MoneyPlant.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScheduleDto {
    private Long scId;
    private String name;    // 일정이름
    private String date;    // 날짜 ex) "2023-07-07"
    private int budget;     // 예산
    private int colorId;
}
