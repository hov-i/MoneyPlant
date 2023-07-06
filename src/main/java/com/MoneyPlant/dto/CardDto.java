package com.MoneyPlant.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CardDto {
    private Long cardId;
    private String cardName;
    private String cardCategory;
    private String cardDesc;
    private String cardImg;
    private String cardLink;
    private String cardAnnualFee;
    private List<String> cardDescList;

}
