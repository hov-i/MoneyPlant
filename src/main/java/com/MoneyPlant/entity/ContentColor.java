package com.MoneyPlant.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "content_color")
@Getter
@Setter
@ToString
public class ContentColor {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long colorId; // 전체 컬러코드 Id

}

