package com.MoneyPlant.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name="schedule")
@Setter
@Getter
@ToString
public class Schedule { // 약어로 sc를 사용합니다.
    @Id
    @Column(name = "sc_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long scId; // 일정 Id

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id")
    private User user; // userId

    @Column(name="google_cal_id")
    private String googleCalendarId;

    @Column(name = "event_id", unique = true)
    private String eventId; // 구글 캘린더 event ID

    @Column(name = "sc_name", nullable = false)
    private String scName; // 일정 이름

    @Column(name = "sc_date", nullable = false)
    private String scDate; // 일정 날짜

    @Column(name = "sc_budget")
    private int scBudget; // 일정 예산

    @Column(name = "color", nullable = false)
    private int color; // 일정 color
}
