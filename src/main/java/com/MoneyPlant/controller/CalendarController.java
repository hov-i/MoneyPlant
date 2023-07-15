package com.MoneyPlant.controller;

import com.MoneyPlant.dto.*;
import com.MoneyPlant.service.*;
import com.MoneyPlant.service.jwt.UserDetailsImpl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/calendar")
public class CalendarController {
    private final CalendarService calendarService;
    private final MyScheduleService myScheduleService;
    private final MyWorkService myWorkService;
    private final LedgerService ledgerService;

    // 캘린더 일정 추가, 삭제, 수정 ( 구글 연동 되어있으면 즉시 구글 캘린더에도 적용시켜주기 (금액쓰는 것도 있음) )
    @GetMapping("/get/schedule")
    public ResponseEntity<List<ScheduleDto>> getSchedule(
            @AuthenticationPrincipal UserDetailsImpl userDetails
    ) {
        List<ScheduleDto> scheduleDtos = calendarService.getScheduleForCal(userDetails);
        return ResponseEntity.ok(scheduleDtos);
    }

    // 캘린더 일정 등록
    @PostMapping("/create/schedule/{type}")
    public ResponseEntity<String> createSchedule(
            @RequestBody ScheduleDto scheduleDto,
            @PathVariable("type") String type,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        try {
            boolean isSuccess = false;
            if (type.equalsIgnoreCase("schedule")) {
                isSuccess = calendarService.createSchedule(scheduleDto, userDetails);
            } else {
                isSuccess = myScheduleService.createMySchedule(scheduleDto, userDetails);
            }
            if (isSuccess) {
                return ResponseEntity.ok("일정이 생성되었습니다.");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("일정 생성을 실패했습니다.");
            }
        } catch (Exception e) {
            log.error("Error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("일정 생성 중에 오류가 발생했습니다.");
        }
    }

    // 일정 수정 완료
    @PostMapping("/update/schedule")
    public ResponseEntity<String> updateSchedule(
            @RequestBody ScheduleDto scheduleDto,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        boolean isSuccess = calendarService.updateSchedule(scheduleDto, userDetails);
        if (isSuccess) {
            return ResponseEntity.ok("일정 수정 완료");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("일정 수정 실패");
        }
    }

    @DeleteMapping("/delete/schedule")
    public ResponseEntity<String> deleteSchedule(
            @RequestBody Long scId,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        boolean isSuccess = calendarService.deleteSchedule(scId, userDetails);
        if (isSuccess) {
            return ResponseEntity.ok("일정 삭제 완료");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("일정 삭제 실패");
        }
    }

    // 캘린더 근무 등록
    @PostMapping("/create/work/{type}")
    public ResponseEntity<String> createWork(
            @RequestBody WorkDto workDto,
            @PathVariable("type") String type,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        try {
            boolean isSuccess = false;
            if (type.equalsIgnoreCase("work")) {
                isSuccess = calendarService.createWork(workDto, userDetails);
            } else {
                isSuccess = myWorkService.createMyWork(workDto, userDetails);
            }
            if (isSuccess) {
                return ResponseEntity.ok("근무가 생성되었습니다.");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("근무 생성을 실패했습니다.");
            }
        } catch (Exception e) {
            log.error("Error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("근무 생성 중에 오류가 발생했습니다.");
        }
    }

    // 캘린더 가계부 추가, 삭제, 수정 ( )


    // ===========================================================================
    // 캘린더 컨텐츠 전체 조회 (수입, 지출 추가 예정)
    @GetMapping("")
    public ResponseEntity<CalendarDto> CalendarView(@AuthenticationPrincipal UserDetailsImpl userDetails) throws IllegalAccessException {
        List<ScheduleDto> scheduleDtoList = calendarService.getScheduleForCal(userDetails);
        List<WorkDto> workDtoList = calendarService.getWorkForCal(userDetails);
        Map<String, Integer> dailyExpenseList = ledgerService.getDailyExpense(userDetails);
        Map<String, Integer> dailyIncomeList = ledgerService.getDailyIncome(userDetails);

        CalendarDto calendarDto = new CalendarDto(scheduleDtoList, workDtoList, dailyExpenseList, dailyIncomeList);

        return ResponseEntity.ok(calendarDto);
    }

    // 캘린더 일일 일정 조회
    @GetMapping("/today/schedule/{scDate}")
    public ResponseEntity<List<ScheduleDto>> getTodaySchedule(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable Long scDate) {
        List<ScheduleDto> todayScheduleList = calendarService.getScheduleForDetail(userDetails, scDate);
        return ResponseEntity.ok(todayScheduleList);
    }

    // 캘린더 일일 근무 조회
    @GetMapping("/today/work/{workDate}")
    public ResponseEntity<List<WorkDto>> getTodayWork(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable Long workDate) {
        List<WorkDto> todayWorkList = calendarService.getWorkForDetail(userDetails, workDate);
        return ResponseEntity.ok(todayWorkList);
    }
}