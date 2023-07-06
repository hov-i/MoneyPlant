package com.MoneyPlant.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "income")
@Getter @Setter
@ToString
public class Income {
    @Id
    @Column(name = "income_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long incomeId; // 수입 Id

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id")
    private User user;

    @Column(name = "income_amount")
    private int incomeAmount;

    @Column(name = "income_date")
    private String incomeDate;

    @Column(name = "income_content")
    private String incomeContent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_income_id")
    private CategoryIncome categoryIncome;
}
