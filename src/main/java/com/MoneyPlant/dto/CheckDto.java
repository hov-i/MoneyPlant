package com.MoneyPlant.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CheckDto {
    private Long checkId;
    private String content;
    private int amount;
    private String date;
    private Long userId;
}
