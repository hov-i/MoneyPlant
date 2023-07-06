package com.MoneyPlant.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class MyPageDto {
    private List<MyScheduleDto> myScheduleDtoList;
    private List<MyWorkDto> myWorkDtoList;
}
