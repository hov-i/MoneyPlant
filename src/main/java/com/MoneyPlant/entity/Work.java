package com.MoneyPlant.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name="work")
@Setter
@Getter
@ToString
public class Work {
    @Id
    @Column(name = "work_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long workId; // 근무 Id

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id")
    private User user; // userId

    @Column(name = "work_name", nullable = false)
    private String workName; // 근무 이름

    @Column(name = "work_date", nullable = false)
    private String workDate; // 근무 날짜

    @Column(name = "work_start")
    private double workStart; // 근무 시작 시간

    @Column(name = "work_end")
    private double workEnd; // 근무 종료 시간

    @Column(name = "work_payday", nullable = false)
    private String workPayday; // 급여 지급일

    @Column(name = "color", nullable = false)
    private int color; // 근무 color

    @Column(name = "work_pay")
    private double workPay; // 총 급여 ( money * tax * date)
}
