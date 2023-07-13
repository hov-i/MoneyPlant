package com.MoneyPlant.service;

import com.MoneyPlant.dto.WorkDto;
import com.MoneyPlant.dto.MyWorkDto;
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
public class MyWorkService {
    private final MyWorkRepository myWorkRepository;
    private final UserRepository userRepository;

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
            myWork.setMyWkStart(workDto.getWorkStart());
            myWork.setMyWkEnd(workDto.getWorkEnd());
            myWork.setMyPayday(workDto.getPayday());
            myWork.setMyColor(workDto.getColorId());
            myWork.setMyWkPay(calMyHourlySalary(workDto));

            myWorkRepository.save(myWork);
            return true;
        } catch (Exception e) {
            e.printStackTrace();

            return false;
        }
    }

    //     마이페이지 나의 급여 계산 - 시급 / 일급&월급 / 건별
    public int calMyHourlySalary(WorkDto workDto) {
        int type = workDto.getPayType();
        int money = workDto.getWorkMoney();
        String stTime = workDto.getWorkStart();
        String endTime = workDto.getWorkEnd();
        int caseCnt = workDto.getWorkCase();
        int restTime = workDto.getWorkRest();
        double tax = 100 - workDto.getWorkTax();
        int pay;

        switch (type) {
            case 1:
                String[] stTimeParts = stTime.split(":");
                int stHours = Integer.parseInt(stTimeParts[0]);
                int stMinutes = Integer.parseInt(stTimeParts[1]);

                String[] endTimeParts = endTime.split(":");
                int endHours = Integer.parseInt(endTimeParts[0]);
                int endMinutes = Integer.parseInt(endTimeParts[1]);

                double totalHours = ((endHours + (endMinutes / 60.0)) - (stHours + (stMinutes / 60.0))) - (restTime / 60.0);

                double hourlyWage = money * totalHours * tax;
                pay = (int) Math.round(hourlyWage);
                break;
            case 2:
                pay = (int) (money * caseCnt * tax);
                break;
            case 3:
                pay = (int) (money * tax);
                break;
            default:
                pay = 0;
                break;
        }
        return pay;
    }


    // 마이페이지 나의 근무 수정

    // 마이페이지 나의 근무 삭제

    // ===========================================================================
    // 마이페이지 전체 나의 근무 조회
    public List<MyWorkDto> getWorkForMyPage(UserDetailsImpl userDetails) {
        Long userId = userDetails.getId();
        List<MyWork> myWorkList = myWorkRepository.findByUserId(userId);

        List<MyWorkDto> myWorkDtoList = new ArrayList<>();
        for (MyWork myWork : myWorkList) {
            MyWorkDto myWorkDto = new MyWorkDto();

            // 조회 내용 : 근무 이름, 근무 색
            myWorkDto.setMyWkName(myWork.getMyWkName());
            myWorkDto.setMyWkStart(myWork.getMyWkStart());
            myWorkDto.setMyWkEnd(myWork.getMyWkEnd());
            myWorkDto.setMyPayday(myWork.getMyPayday());
            myWorkDto.setMyColor(myWork.getMyColor());
            myWorkDto.setMyWkPay(myWork.getMyWkPay());

            myWorkDtoList.add(myWorkDto);
        }
        return myWorkDtoList;
    }
}
