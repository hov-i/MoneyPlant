package com.MoneyPlant.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MyScheduleDto {
    private Long userId; // join 으로 사용 예정
    private String myScName;
    private int myScBudget;
    private int myColor;
}
