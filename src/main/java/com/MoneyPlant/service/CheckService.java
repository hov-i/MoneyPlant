package com.MoneyPlant.service;

import com.MoneyPlant.dto.ExpenseDto;
import com.MoneyPlant.dto.IncomeDto;
import com.MoneyPlant.entity.*;
import com.MoneyPlant.repository.*;
import com.MoneyPlant.service.jwt.UserDetailsImpl;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class CheckService {
    private final IncomeRepository incomeRepository;
    private final ExpenseRepository expenseRepository;
    private final CategoryRepository categoryRepository;
    private final CategoryIncomeRepository categoryIncomeRepository;

    @Getter @Setter
    public class TransactionDto {
        private List<IncomeDto> incomeList;
        private List<ExpenseDto> expenseList;
    }

    // 수입&카테고리 조회
    public List<IncomeDto> getIncomeWithCategory(UserDetailsImpl userDetails) {
        Long userId = userDetails.getId();
        log.info("시용자 아이디 : " + userId);
        List<Income> incomeList = incomeRepository.findByUserId(userId);

        List<IncomeDto> incomeDtoList = new ArrayList<>();
        for (Income income : incomeList) {
            IncomeDto incomeDto = new IncomeDto();
            incomeDto.setIncomeId(income.getIncomeId());
            incomeDto.setIncomeAmount(income.getIncomeAmount());
            incomeDto.setIncomeDate(income.getIncomeDate());
            incomeDto.setIncomeContent(income.getIncomeContent());
            incomeDto.setCategoryIncomeId(income.getCategoryIncome().getCategoryIncomeId());
            incomeDto.setUserId(income.getUser().getId());

            String categoryIncomeName = categoryIncomeRepository.findByCategoryIncomeId(income.getCategoryIncome().getCategoryIncomeId()).getCategoryIncomeName();
            incomeDto.setCategoryIncomeName(categoryIncomeName);

            incomeDtoList.add(incomeDto);
        }

        return incomeDtoList;
    }


    // 지출&카테고리 조회
    public List<ExpenseDto> getExpenseWithCategory(UserDetailsImpl userDetails) {
        Long userId = userDetails.getId();
        log.info("지출 사용자 아이디 : " + userId);
        List<Expense> expenseList = expenseRepository.findByUserId(userId);

        List<ExpenseDto> expenseDtoList = new ArrayList<>();
        for (Expense expense : expenseList) {
            ExpenseDto expenseDto = new ExpenseDto();
            expenseDto.setExpenseId(expense.getExpenseId());
            expenseDto.setExpenseAmount(expense.getExpenseAmount());
            expenseDto.setExpenseDate(expense.getExpenseDate());
            expenseDto.setExpenseContent(expense.getExpenseContent());
            expenseDto.setCategoryId(expense.getCategory().getCategoryId());
            expenseDto.setUserId(expense.getUser().getId());

            String categoryName = categoryRepository.findByCategoryId(expense.getCategory().getCategoryId()).getCategoryName();
            expenseDto.setCategoryName(categoryName);

            expenseDtoList.add(expenseDto);
        }

        return expenseDtoList;
    }


    //월간 지출 카테고리별 합계(해당 월만 보여줍니다)
    private String getMonthFromDate(String date) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date parsedDate;
        try {
            parsedDate = format.parse(date);
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(parsedDate);
            int year = calendar.get(Calendar.YEAR);
            int month = calendar.get(Calendar.MONTH) + 1;
            return year + "_" + month;
        } catch (ParseException e) {
            e.printStackTrace();
            // 월 값을 추출할 수 없는 경우 예외 처리
            return "";
        }
    }

    public Map<String, Double> getExpenseSumByCategory(UserDetailsImpl userDetails) {
        Long userId = userDetails.getId();
        log.info("사용자 아이디: " + userId);

        List<Expense> expenseList = expenseRepository.findByUserId(userId);
        Map<String, Double> categoryExpenseMap = new HashMap<>();

        for (Expense expense : expenseList) {
            String categoryName = expense.getCategory().getCategoryName();
            double expenseAmount = expense.getExpenseAmount();

            // 현재 년도와 월을 키에 추가합니다.
            String currentYearMonth = getCurrentYear() + "_" + getCurrentMonth();
            String key = categoryName + "_" + currentYearMonth;

            // 카테고리별 월별 지출 합계에 누적하여 합산
            categoryExpenseMap.put(key, categoryExpenseMap.getOrDefault(key, 0.0) + expenseAmount);
        }

        return categoryExpenseMap;
    }

    private int getCurrentYear() {
        Calendar calendar = Calendar.getInstance();
        return calendar.get(Calendar.YEAR);
    }

    private int getCurrentMonth() {
        Calendar calendar = Calendar.getInstance();
        return calendar.get(Calendar.MONTH) + 1;
    }



}

