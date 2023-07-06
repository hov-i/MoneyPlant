package com.MoneyPlant.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "category_income")
@Getter
@Setter
@ToString
public class CategoryIncome {
    @Id
    @Column(name = "category_income_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long categoryIncomeId; // category Id
    @Column(nullable = false)
    private String categoryIncomeName; // category 이름
}

