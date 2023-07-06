package com.MoneyPlant.entity;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "list")
@Getter @Setter
@ToString
//카테고리 아이디 외래키로 참조
public class Check {
    @Id
    @Column(name = "check_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long checkId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id")
    private User user;

    @Column
    private String content;

    @Column
    private int amount;

    @Column
    private String date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;
}
