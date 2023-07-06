package com.MoneyPlant.service;

import com.MoneyPlant.dto.*;
import com.MoneyPlant.entity.*;
import com.MoneyPlant.repository.*;
import com.MoneyPlant.service.jwt.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import javax.transaction.Transactional;
import java.util.List;

//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.userdetails.UserDetails;
//import javax.security.auth.kerberos.KerberosKey;
//import javax.servlet.http.HttpServletRequest;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class CalendarService {
    private final ScheduleRepository scheduleRepository;
    private final WorkRepository workRepository;
    private final UserRepository userRepository;

    // 캘린더 일정 생성
    @Transactional
    public boolean createSchedule(ScheduleDto scheduleDto, UserDetailsImpl userDetails) {
        try {
            Long userId = userDetails.getId();
            scheduleDto.setUserId(userId);

            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

            Schedule schedule = new Schedule();
            schedule.setUser(user);
            schedule.setCalId(scheduleDto.getCalId());
            schedule.setScName(scheduleDto.getScName());
            schedule.setColor(scheduleDto.getColor());
            schedule.setScDate(scheduleDto.getScDate());
            schedule.setScBudget(scheduleDto.getScBudget());

            scheduleRepository.save(schedule);

            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    // 캘린더 근무 생성
    public boolean createWork(WorkDto workDto, UserDetailsImpl userDetails) {
        try {
            Long userId = userDetails.getId();
            workDto.setUserId(userId);
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

            Work work = new Work();
            work.setUser(user);
            work.setWorkName(workDto.getWorkName());
            work.setColor(workDto.getColor());
            work.setWorkDate(workDto.getWorkDate());
            work.setWorkPay(workDto.getWorkPay());
            work.setWorkPayday(workDto.getWorkPayday());

            workRepository.save(work);

            return true;
        } catch (Exception e) {
            e.printStackTrace();

            return false;
        }
    }

    // 마이페이지에서 나의 일정 & 근무 가져와서 등록하기

    // 캘린더 일정/근무 수정

    // 캘린더 일정/근무 삭제

    // 구글캘린더에서 받아온 일정 수정하기 (예산 등록)


// ===========================================================================
    // 캘린더 전체 일정 조회 - 달력
    public List<ScheduleDto> getScheduleForCal(UserDetailsImpl userDetails) {
        Long userId = userDetails.getId();
        List<Schedule> scheduleList = scheduleRepository.findByUserId(userId);

        List<ScheduleDto> scheduleDtoList = new ArrayList<>();
        for (Schedule schedule : scheduleList) {
            ScheduleDto scheduleDto = new ScheduleDto();

            // 조회 내용 : 일정 날짜, 일정 이름, 일정 색
            scheduleDto.setScDate(schedule.getScDate());
            scheduleDto.setScName(schedule.getScName());
            scheduleDto.setColor(schedule.getColor());

            scheduleDtoList.add(scheduleDto);
        }
        return scheduleDtoList;
    }

    // 캘린더 전체 근무 조회 - 달력
    public List<WorkDto> getWorkForCal(UserDetailsImpl userDetails) {
        Long userId = userDetails.getId();
        List<Work> workList = workRepository.findByUserId(userId);

        List<WorkDto> workDtoList = new ArrayList<>();
        for (Work work : workList) {
            WorkDto workDto = new WorkDto();

            // 조회 내용 :  근무 날짜, 근무 이름, 근무 color, 급여, 급여일
            work.setWorkName(workDto.getWorkName());
            work.setColor(workDto.getColor());
            work.setWorkDate(workDto.getWorkDate());
            work.setWorkPay(workDto.getWorkPay());
            work.setWorkPayday(workDto.getWorkPayday());

            workDtoList.add(workDto);
        }
        return workDtoList;
    }

    // 캘린더 전체 일정 조회 - 일별 상세
    public List<ScheduleDto> getScheduleForDetail(UserDetailsImpl userDetails) {
        Long userId = userDetails.getId();
        List<Schedule> scheduleList = scheduleRepository.findByUserId(userId);

        List<ScheduleDto> scheduleDtoList = new ArrayList<>();
        for (Schedule schedule : scheduleList) {
            ScheduleDto scheduleDto = new ScheduleDto();

            // 조회 내용 : 일정 날짜, 일정 이름, 일정 색, 일정 예산
            scheduleDto.setScDate(schedule.getScDate());
            scheduleDto.setScName(schedule.getScName());
            scheduleDto.setColor(schedule.getColor());
            scheduleDto.setScBudget(schedule.getScBudget());

            scheduleDtoList.add(scheduleDto);
        }
        return scheduleDtoList;
    }

    // 캘린더 전체 근무 조회 - 일별 상세
    public List<WorkDto> getWorkForDetail(UserDetailsImpl userDetails) {
        Long userId = userDetails.getId();
        List<Work> workList = workRepository.findByUserId(userId);

        List<WorkDto> workDtoList = new ArrayList<>();
        for (Work work : workList) {
            WorkDto workDto = new WorkDto();

            // 조회 내용 :  근무 날짜, 근무 이름, 근무 색
            workDto.setWorkName(work.getWorkName());
            workDto.setColor(work.getColor());
            workDto.setWorkDate(work.getWorkDate());
            workDto.setWorkStart(work.getWorkStart());
            workDto.setWorkEnd(work.getWorkEnd());
            workDto.setWorkDate(work.getWorkDate());
            workDto.setWorkPay(work.getWorkPay());

            workDtoList.add(workDto);
        }
        return workDtoList;
    }
}
