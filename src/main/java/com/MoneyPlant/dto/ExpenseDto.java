package com.MoneyPlant.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ExpenseDto {
    private Long expenseId;
    private Long userId;
    private int expenseAmount;
    private String expenseDate;
    private String expenseContent;
    private Long categoryId;
    private String categoryName;
}
