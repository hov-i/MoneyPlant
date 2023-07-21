
package com.MoneyPlant.controller;

import com.MoneyPlant.dto.*;
import com.MoneyPlant.service.MyScheduleService;
import com.MoneyPlant.service.MyWorkService;
import com.MoneyPlant.service.jwt.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import javax.servlet.http.HttpServletRequest;

@RestController
@Slf4j
@RequestMapping("/api/mypage")
@RequiredArgsConstructor
public class MyPageController {
    @Autowired
    private final MyScheduleService myScheduleService;
    private final MyWorkService myWorkService;

    // 마이페이지 나의 일정 등록
//    @PostMapping("/create/schedule")
//    public ResponseEntity<String> createMySchedule(
//            @RequestBody ScheduleDto scheduleDto,
//            @AuthenticationPrincipal UserDetailsImpl userDetails) {
//
//        try {
//            boolean isSuccess = myScheduleService.createMySchedule(scheduleDto, userDetails);
//
//            if (isSuccess) {
//                return ResponseEntity.ok("일정이 생성되었습니다.");
//            } else {
//                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("근무 생성을 실패했습니다.");
//            }
//        } catch (Exception e) {
//            log.error("Error", e);
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("일정 생성 중에 오류가 발생했습니다.");
//        }
//    }

    // 마이페이지 나의 근무 등록
//    @PostMapping("/create/work")
//    public ResponseEntity<String> createMyWork(
//            @RequestBody MyWorkDto myWorkDto,
//            @AuthenticationPrincipal UserDetailsImpl userDetails) {
//        try {
//            boolean isSuccess = myWorkService.createMyWork(myWorkDto, userDetails);
//            if (isSuccess) {
//                return ResponseEntity.ok("근무가 생성되었습니다.");
//            } else {
//                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("근무 생성을 실패했습니다.");
//            }
//        } catch (Exception e) {
//            log.error("Error", e);
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("근무 생성 중에 오류가 발생했습니다.");
//        }
//    }


    // ===========================================================================
    // 마이페이지 전체 조회
    @GetMapping("")
    public ResponseEntity<MyPageDto> myPageView(@AuthenticationPrincipal UserDetailsImpl userDetails) throws IllegalAccessException {
        List<ScheduleDto> myScheduleList = myScheduleService.getScheduleForMyPage(userDetails);
        List<WorkDto> myWorkList = myWorkService.getWorkForMyPage(userDetails);

        MyPageDto myPageDto = new MyPageDto(myScheduleList, myWorkList);

        return ResponseEntity.ok(myPageDto);
    }
}