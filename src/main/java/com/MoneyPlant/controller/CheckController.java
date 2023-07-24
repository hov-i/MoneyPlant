package com.MoneyPlant.controller;


import com.MoneyPlant.dto.ExpenseDto;
import com.MoneyPlant.dto.IncomeDto;
import com.MoneyPlant.service.CheckService;
import com.MoneyPlant.service.jwt.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;


@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/check")
public class CheckController {

    @Autowired
    private final CheckService checkService;

    // 수입&카테고리 조회
    @GetMapping("/income/category")
    public ResponseEntity<List<IncomeDto>> getIncomeWithCategory(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        List<IncomeDto> incomeDtoList = checkService.getIncomeWithCategory(userDetails);
        return ResponseEntity.ok(incomeDtoList);
    }

    // 지출&카테고리 조회
    @GetMapping("/expense/category")
    public ResponseEntity<List<ExpenseDto>> getExpenseWithCategory(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        List<ExpenseDto> expenseDtoList = checkService.getExpenseWithCategory(userDetails);
        return ResponseEntity.ok(expenseDtoList);
    }

    //월간 지출 카테고리별 합계
    @GetMapping("/expense/sum-by-category")
    public ResponseEntity<Map<String, Double>> getExpenseSumByCategory(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        Map<String, Double> categoryExpenseMap = checkService.getExpenseSumByCategory(userDetails);
        return ResponseEntity.ok(categoryExpenseMap);
    }
}



