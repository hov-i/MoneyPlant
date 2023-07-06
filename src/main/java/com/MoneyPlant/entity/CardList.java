package com.MoneyPlant.entity;

import com.MoneyPlant.dto.CardDto;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name="card_list")
@Setter
@Getter
@ToString
public class CardList {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cardId;

    @Column(length = 1000)
    private String cardName;

    @Column(length = 1000)
    private String cardCategory;

    @Column(length = 1000)
    private String cardDesc;

    @Column(length = 1000)
    private String cardImg;

    @Column(length = 1000)
    private String cardLink;

    @Column(length = 1000)
    private String cardAnnualFee;

    public CardDto toCardDto() {
        CardDto cardDto = new CardDto();
        cardDto.setCardId(this.getCardId());
        cardDto.setCardName(this.getCardName());
        cardDto.setCardCategory(this.getCardCategory());
        cardDto.setCardDesc(this.getCardDesc());
        cardDto.setCardImg(this.getCardImg());
        cardDto.setCardLink(this.getCardLink());
        cardDto.setCardAnnualFee(this.getCardAnnualFee());
        return cardDto;
    }
}
