package com.MoneyPlant.service;

import com.MoneyPlant.dto.WorkDto;
import com.MoneyPlant.entity.*;
import com.MoneyPlant.repository.*;
import com.MoneyPlant.service.CalendarService;
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
public class MyWorkService {
    private final MyWorkRepository myWorkRepository;
    private final UserRepository userRepository;
    private final CalendarService calendarService;

    // 마이페이지 나의 근무 생성
    public boolean createMyWork(WorkDto workDto, UserDetailsImpl userDetails) {
        try {
            Long userId = userDetails.getId();
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

            MyWork myWork = new MyWork();
            myWork.setUser(user);
            myWork.setMyWkName(workDto.getWorkName());
            myWork.setMyPayType(workDto.getPayType());
            myWork.setMyWkMoney(workDto.getWorkMoney());
            myWork.setMyWkStart(workDto.getWorkStart());
            myWork.setMyWkEnd(workDto.getWorkEnd());
            myWork.setMyWkRest(workDto.getWorkRest());
            myWork.setMyWkCase(workDto.getWorkCase());
            myWork.setMyWkTax(workDto.getWorkTax());
            myWork.setMyPayday(workDto.getPayday());
            myWork.setMyColor(workDto.getColorId());
            myWork.setMyWkPay(calendarService.calMyHourlySalary(workDto));

            myWorkRepository.save(myWork);
            return true;
        } catch (Exception e) {
            e.printStackTrace();

            return false;
        }
    }

    // 마이페이지 나의 근무 수정

    // 마이페이지 나의 근무 삭제

    // ===========================================================================
    // 마이페이지 전체 나의 근무 조회
    public List<WorkDto> getWorkForMyPage(UserDetailsImpl userDetails) {
        Long userId = userDetails.getId();
        List<MyWork> myWorkList = myWorkRepository.findByUserId(userId);

        List<WorkDto> myWorkDtoList = new ArrayList<>();
        for (MyWork myWork : myWorkList) {
            WorkDto workDto = new WorkDto();

            // 조회 내용 : 근무 이름, 근무 색
            workDto.setWorkName(myWork.getMyWkName());
            workDto.setPayType(myWork.getMyPayType());
            workDto.setWorkMoney(myWork.getMyWkMoney());
            workDto.setWorkStart(myWork.getMyWkStart());
            workDto.setWorkEnd(myWork.getMyWkEnd());
            workDto.setWorkRest(myWork.getMyWkRest());
            workDto.setWorkCase(myWork.getMyWkCase());
            workDto.setWorkTax(myWork.getMyWkTax());
            workDto.setPayday(myWork.getMyPayday());
            workDto.setColorId(myWork.getMyColor());
            workDto.setWorkPay(myWork.getMyWkPay());

            myWorkDtoList.add(workDto);
        }
        return myWorkDtoList;
    }
}
