package com.MoneyPlant.service;

import com.MoneyPlant.dto.MyScheduleDto;
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
public class MyScheduleService {
    private final MyScheduleRepository myScheduleRepository;
    private final UserRepository userRepository;

    // 마이페이지 나의 일정 생성
    public boolean createMySchedule(MyScheduleDto myScheduleDto, UserDetailsImpl userDetails) {
        try {
            Long userId = userDetails.getId();
            myScheduleDto.setUserId(userId);
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

            MySchedule mySchedule = new MySchedule();
            mySchedule.setUser(user);
            mySchedule.setMyScName(myScheduleDto.getMyScName());
            mySchedule.setMyScBudget(myScheduleDto.getMyScBudget());
            mySchedule.setMyColor(myScheduleDto.getMyColor());

            myScheduleRepository.save(mySchedule);
            return true;
        } catch (Exception e) {
            e.printStackTrace();

            return false;
        }
    }

    // 마이페이지 나의 일정 수정

    // 마이페이지 나의 일정 삭제


// ===========================================================================
    // 마이페이지 전체 나의 일정 조회
    public List<MyScheduleDto> getScheduleForMyPage(UserDetailsImpl userDetails) {
        Long userId = userDetails.getId();
        List<MySchedule> myScheduleList = myScheduleRepository.findByUserId(userId);

        List<MyScheduleDto> myScheduleDtoList = new ArrayList<>();
        for (MySchedule mySchedule : myScheduleList) {
            MyScheduleDto myScheduleDto = new MyScheduleDto();

            // 조회 내용 : 일정 이름, 일정 색
            myScheduleDto.setMyScName(mySchedule.getMyScName());
            myScheduleDto.setMyColor(mySchedule.getMyColor());

            myScheduleDtoList.add(myScheduleDto);
        }
        return myScheduleDtoList;
    }
}
