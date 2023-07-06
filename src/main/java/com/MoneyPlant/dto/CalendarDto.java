package com.MoneyPlant.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
public class CalendarDto {
    private List<ScheduleDto> scheduleDtoList;
    private List<WorkDto> workDtoList;
    private Map<String, Integer> dailyExpenseList;
    private Map<String, Integer> dailyIncomeList;
}
