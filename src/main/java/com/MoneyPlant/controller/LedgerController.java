package com.MoneyPlant.controller;

import com.MoneyPlant.dto.ExpenseDto;
import com.MoneyPlant.dto.IncomeDto;
import com.MoneyPlant.service.LedgerService;
import com.MoneyPlant.service.jwt.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/ledger")
public class LedgerController {

    @Autowired
    private final LedgerService ledgerService;

    //등록
    // 수입 등록
    @PostMapping("/income")
    public ResponseEntity<String> createIncome(
            @RequestBody List<IncomeDto> incomeDtoList,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        boolean allSuccess = true;

        for (IncomeDto incomeDto : incomeDtoList) {
            boolean isSuccess = ledgerService.createIncome(incomeDto, userDetails);

            if (!isSuccess) {
                allSuccess = false;
                break;
            }
        }

        if (allSuccess) {
            return ResponseEntity.ok("수입 등록 완료");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("실패");
        }
    }

    // 지출 등록
    @PostMapping("/expense")
    public ResponseEntity<String> createExpense(
            @RequestBody List<ExpenseDto> expenseDtoList,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        boolean allSuccess = true;

        for (ExpenseDto expenseDto : expenseDtoList) {
            boolean isSuccess = ledgerService.createExpense(expenseDto, userDetails);

            if (!isSuccess) {
                allSuccess = false;
                break;
            }
        }

        if (allSuccess) {
            return ResponseEntity.ok("지출 등록 완료");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("실패");
        }
    }

    //수정
    // 수입 수정
    @PutMapping("/income/update/{incomeId}")
    public ResponseEntity<?> updateIncome(
            @PathVariable Long incomeId,
            @RequestBody IncomeDto updatedIncomeDto,
            @AuthenticationPrincipal UserDetailsImpl userDetails
    ) {
        boolean isUpdated = ledgerService.updateIncome(incomeId, updatedIncomeDto, userDetails);

        if (isUpdated) {
            return ResponseEntity.ok("수입 정보가 성공적으로 수정되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("수입 정보 수정에 실패하였습니다.");
        }
    }

    // 지출 수정
    @PutMapping("/expense/update/{expenseId}")
    public ResponseEntity<?> updateExpense(
            @PathVariable Long expenseId,
            @RequestBody ExpenseDto updatedExpenseDto,
            @AuthenticationPrincipal UserDetailsImpl userDetails
    ) {
        boolean isUpdated = ledgerService.updateExpense(expenseId, updatedExpenseDto, userDetails);

        if (isUpdated) {
            return ResponseEntity.ok("지출 정보가 성공적으로 수정되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("지출 정보 수정에 실패하였습니다.");
        }
    }


    // 삭제
    // 수입 삭제
    @DeleteMapping("/income/delete/{incomeId}")
    public ResponseEntity<String> deleteIncome(@PathVariable Long incomeId) {
        if (ledgerService.deleteIncome(incomeId)) {
            return ResponseEntity.ok("수입 정보가 삭제되었습니다.");
        } else {
            return ResponseEntity.badRequest().body("수입 정보 삭제 실패");
        }
    }

    // 지츨 삭제
    @DeleteMapping("/expense/delete/{expenseId}")
    public ResponseEntity<String> deleteExpense(@PathVariable Long expenseId) {
        if (ledgerService.deleteExpense(expenseId)) {
            return ResponseEntity.ok("지출 정보가 삭제되었습니다.");
        } else {
            return ResponseEntity.badRequest().body("지출 정보 삭제 실패");
        }
    }


    //조회
    // 수입 조회
    @GetMapping("/income/get")
    public ResponseEntity<List<IncomeDto>> getIncomes(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        List<IncomeDto> incomeDtoList = ledgerService.getIncomes(userDetails);
        return ResponseEntity.ok(incomeDtoList);
    }

    // 지출 조회
    @GetMapping("/expense/get")
    public ResponseEntity<List<ExpenseDto>> getExpenses(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        List<ExpenseDto> expenseDtoList = ledgerService.getExpenses(userDetails);
        return ResponseEntity.ok(expenseDtoList);
    }

    // 일간 개별 합계
    // 수입
    @GetMapping("/income/daily")
    public ResponseEntity<Map<String, Integer>> getDailyIncome(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        Map<String, Integer> dailyIncome = ledgerService.getDailyIncome(userDetails);
        return ResponseEntity.ok(dailyIncome);
    }

    // 지출
    @GetMapping("/expense/daily")
    public ResponseEntity<Map<String, Integer>> getDailyExpense(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        Map<String, Integer> dailyExpense = ledgerService.getDailyExpense(userDetails);
        return ResponseEntity.ok(dailyExpense);
    }



    // 월간 개별 합계
    // 수입
    @GetMapping("/income/monthly")
    public ResponseEntity<Map<String, Integer>> getMonthlyIncome(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        Map<String, Integer> monthlyIncome = ledgerService.getMonthlyIncome(userDetails);
        return ResponseEntity.ok(monthlyIncome);
    }

    // 지출
    @GetMapping("/expense/monthly")
    public ResponseEntity<Map<String, Integer>> getMonthlyExpense(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        Map<String, Integer> monthlyExpense = ledgerService.getMonthlyExpense(userDetails);
        return ResponseEntity.ok(monthlyExpense);
    }

    // 월간 전체 합계
    @GetMapping("/statistics/monthly")
    public ResponseEntity<Map<String, Integer>> getMonthlyStatistics(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        Map<String, Integer> monthlyStatistics = ledgerService.getMonthlyStatistics(userDetails);
        return ResponseEntity.ok(monthlyStatistics);
    }

    // 캘린더 하루별 지출 조회
    @GetMapping("/get/today/expense/{expenseDate}")
    public ResponseEntity<List<ExpenseDto>> getTodayExpense(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable String expenseDate) {
        List<ExpenseDto> todayExpenseList = ledgerService.getExpenseListWithTodayDate(userDetails, expenseDate);
        return ResponseEntity.ok(todayExpenseList);
    }

    // 캘린더 하루별 수입 조회
    @GetMapping("/get/today/income/{incomeDate}")
    public ResponseEntity<List<IncomeDto>> getTodayIncome(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable String incomeDate) {
        List<IncomeDto> todayIncomeList = ledgerService.getIncomeListWithTodayDate(userDetails, incomeDate);
        return ResponseEntity.ok(todayIncomeList);
    }

}

