package com.MoneyPlant.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "category")
@Getter
@Setter
@ToString
public class Category {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long categoryId; // category Id
    @Column(nullable = false)
    private String categoryName; // category 이름
}
