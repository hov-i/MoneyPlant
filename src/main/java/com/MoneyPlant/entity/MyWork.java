package com.MoneyPlant.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "my_work")
@Setter
@Getter
@ToString
public class MyWork {
    @Id
    @Column(name = "my_wk_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long myWkId; // 마이페이지 근무 Id

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id")
    private User user; // userId

    @Column(name = "my_wk_name", nullable = false)
    private String myWkName; // 나의 근무 이름

    @Column(name = "my_pay_type", nullable = false)
    private int myPayType;

    @Column(name = "my_work_start")
    private String myWkStart; // 나의 근무 시작 시간

    @Column(name = "my_work_end")
    private String myWkEnd; // 나의 근무 종료 시간

    @Column(name = "my_wk_payday", nullable = false)
    private String myPayday; // 나의 급여 지급일

    @Column(name = "my_color", nullable = false)
    private int myColor; // 나의 근무 color

    @Column(name = "my_wk_pay")
    private int myWkPay; // 나의 급여 ( money * tax * date)

}
