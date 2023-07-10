package com.MoneyPlant.controller;

import com.MoneyPlant.dto.BudgetDto;
import com.MoneyPlant.service.BudgetService;
import com.MoneyPlant.service.jwt.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("api/mybudget")
public class BudgetController {
    @Autowired
    BudgetService budgetService;

    // 예산 생성
    @PostMapping("")
    public ResponseEntity<String> createBudget(
            @RequestBody List<BudgetDto> budgetDtoList,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        boolean allSuccess = true; // 모든 BudgetDto 처리 성공 여부

        for (BudgetDto budgetDto : budgetDtoList) {
            boolean isSuccess = budgetService.createBudgetForCategories(budgetDto, userDetails);

            if (!isSuccess) {
                allSuccess = false;
                break; // 하나라도 실패하면 루프 중단
            }
        }

        if (allSuccess) {
            return ResponseEntity.ok("예산을 성공적으로 생성했습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("예산 생성에 실패했습니다.");
        }
    }

    // 예산 조회
    @GetMapping("")
    public ResponseEntity<List<BudgetDto>> getBudget(@AuthenticationPrincipal UserDetailsImpl userDetails) throws IllegalAccessException {
        List<BudgetDto> budgetList = budgetService.getBudgetWithCategoryNames(userDetails);
        return ResponseEntity.ok(budgetList);
    }
}