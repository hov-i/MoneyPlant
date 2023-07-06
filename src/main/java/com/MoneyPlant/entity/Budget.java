package com.MoneyPlant.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="budget")
@Setter
@Getter
@ToString
public class Budget {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long budgetId; // 예산 Id

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id")
    private User user; // userId

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoryId")
    private Category category; //카테고리 Id

    @Column(nullable = false)
    private int budgetMoney; //예산 돈

    @Column(nullable = false)
    private LocalDateTime budgetMonth; // 예산 달

}
