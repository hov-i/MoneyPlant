package com.MoneyPlant.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class IncomeDto {
    private Long incomeId;
    private Long userId;
    private int incomeAmount;
    private String incomeDate;
    private String incomeContent;
    private Long categoryIncomeId;
    private String categoryIncomeName;
}
