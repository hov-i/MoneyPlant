package com.MoneyPlant.service;

import com.MoneyPlant.dto.CategoryDto;
import com.MoneyPlant.dto.CategoryIncomeDto;
import com.MoneyPlant.dto.ExpenseDto;
import com.MoneyPlant.dto.IncomeDto;
import com.MoneyPlant.entity.*;
import com.MoneyPlant.repository.*;
import com.MoneyPlant.service.jwt.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;


@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class LedgerService {

    private final IncomeRepository incomeRepository;
    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final CategoryIncomeRepository categoryIncomeRepository;

    @PostConstruct
    public void insertCategoryIncomeData() {

        String[] categoryIncomeNames = {
                "급여",
                "보너스",
                "용돈",
                "부수입",
                "기타"
        };

        for (int i = 0; i < categoryIncomeNames.length; i++) {
            CategoryIncomeDto categoryIncomeDto = new CategoryIncomeDto();
            categoryIncomeDto.setCategoryIncomeId(Long.valueOf(i + 1));
            categoryIncomeDto.setCategoryIncomeName(categoryIncomeNames[i]);

            CategoryIncome categoryIncome = new CategoryIncome();
            categoryIncome.setCategoryIncomeId(categoryIncomeDto.getCategoryIncomeId());
            categoryIncome.setCategoryIncomeName(categoryIncomeDto.getCategoryIncomeName());

            categoryIncomeRepository.save(categoryIncome);
        }
        System.out.println("CategoryIncome 초기값 저장 완료");
    }


    //등록
    //----------------------------------------------------------
    // 수입 등록
    public boolean createIncome(IncomeDto incomeDto, UserDetailsImpl userDetails) {
        Long userId = userDetails.getId();
        incomeDto.setUserId(userId);

        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
            Long categoryIncomeId = Long.valueOf(incomeDto.getCategoryIncomeId());
            CategoryIncome categoryIncome = categoryIncomeRepository.findById(categoryIncomeId)
                    .orElseThrow(() -> new RuntimeException("카테고리를 찾을 수 없습니다."));

            Income income = new Income();
            income.setUser(user);
            income.setCategoryIncome(categoryIncome);
            income.setIncomeAmount(incomeDto.getIncomeAmount());
            income.setIncomeDate(incomeDto.getIncomeDate());
            income.setIncomeContent(incomeDto.getIncomeContent());

            incomeRepository.save(income);
            return true;
        } catch (Exception e) {
            System.err.println("수입 등록 실패: " + e.getMessage());
            return false;
        }
    }

    // 지출 등록
    public boolean createExpense(ExpenseDto expenseDto, UserDetailsImpl userDetails) {
        Long userId = userDetails.getId();
        expenseDto.setUserId(userId);

        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
            Long categoryId = Long.valueOf(expenseDto.getCategoryId());
            Category category = categoryRepository.findById(categoryId)
                    .orElseThrow(() -> new RuntimeException("카테고리를 찾을 수 없습니다."));

            Expense expense = new Expense();
            expense.setUser(user);
            expense.setCategory(category);
            expense.setExpenseAmount(expenseDto.getExpenseAmount());
            expense.setExpenseDate(expenseDto.getExpenseDate());
            expense.setExpenseContent(expenseDto.getExpenseContent());

            expenseRepository.save(expense);
            return true;
        } catch (Exception e) {
            System.err.println("지출 등록 실패: " + e.getMessage());
            return false;
        }
    }


    //----------------------------------------------------------
    //수정
    // 수입 수정
    public boolean updateIncome(Long incomeId, IncomeDto updatedIncomeDto) {
        try {
            Income income = incomeRepository.findById(incomeId)
                    .orElseThrow(() -> new RuntimeException("수입 정보를 찾을 수 없습니다."));

            User user = userRepository.findById(updatedIncomeDto.getUserId())
                    .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

            CategoryIncome categoryIncome = categoryIncomeRepository.findById(updatedIncomeDto.getCategoryIncomeId())
                    .orElseThrow(() -> new RuntimeException("카테고리를 찾을 수 없습니다."));

            // 수정할 필드 업데이트
            income.setUser(user);
            income.setCategoryIncome(categoryIncome);
            income.setIncomeAmount(updatedIncomeDto.getIncomeAmount());
            income.setIncomeDate(updatedIncomeDto.getIncomeDate());
            income.setIncomeContent(updatedIncomeDto.getIncomeContent());

            incomeRepository.save(income); // 수정된 수입 정보 저장
            return true;
        } catch (Exception e) {
            System.err.println("수입 수정 실패: " + e.getMessage());
            return false;
        }
    }

    // 지출 수정
    public boolean updateExpense(Long expenseId, ExpenseDto updatedExpenseDto) {
        try {
            Expense expense = expenseRepository.findById(expenseId)
                    .orElseThrow(() -> new RuntimeException("지출 정보를 찾을 수 없습니다."));

            User user = userRepository.findById(updatedExpenseDto.getUserId())
                    .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

            Category category = categoryRepository.findById(updatedExpenseDto.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("카테고리를 찾을 수 없습니다."));

            // 수정할 필드 업데이트
            expense.setUser(user);
            expense.setCategory(category);
            expense.setExpenseAmount(updatedExpenseDto.getExpenseAmount());
            expense.setExpenseDate(updatedExpenseDto.getExpenseDate());
            expense.setExpenseContent(updatedExpenseDto.getExpenseContent());

            expenseRepository.save(expense); // 수정된 지출 정보 저장
            return true;
        } catch (Exception e) {
            System.err.println("지출 수정 실패: " + e.getMessage());
            return false;
        }
    }

    //----------------------------------------------------------
    //삭제
    // 수입 삭제
    public boolean deleteIncome(Long incomeId) {
        try {
            Income income = incomeRepository.findById(incomeId)
                    .orElseThrow(() -> new RuntimeException("수입 정보를 찾을 수 없습니다."));

            incomeRepository.delete(income); // 수입 정보 삭제
            return true;
        } catch (Exception e) {
            System.err.println("수입 삭제 실패: " + e.getMessage());
            return false;
        }
    }

    // 지출 삭제
    public boolean deleteExpense(Long expenseId) {
        try {
            Expense expense = expenseRepository.findById(expenseId)
                    .orElseThrow(() -> new RuntimeException("수입 정보를 찾을 수 없습니다."));

            expenseRepository.delete(expense); // 수입 정보 삭제
            return true;
        } catch (Exception e) {
            System.err.println("지출 삭제 실패: " + e.getMessage());
            return false;
        }
    }


    //----------------------------------------------------------
    //조회
    // 수입 조회
    public List<IncomeDto> getIncomes(UserDetailsImpl userDetails) {
        Long userId = userDetails.getId();
        List<Income> incomeList = incomeRepository.findByUserId(userId);

        List<IncomeDto> incomeDtoList = new ArrayList<>();
        for (Income income : incomeList) {
            IncomeDto incomeDto = new IncomeDto();
            //필요 조회 정보
            incomeDto.setIncomeAmount(income.getIncomeAmount());
            incomeDto.setIncomeDate(income.getIncomeDate());

            incomeDtoList.add(incomeDto);
        }

        return incomeDtoList;
    }


    // 지출 조회
    public List<ExpenseDto> getExpenses(UserDetailsImpl userDetails) {
        Long userId = userDetails.getId();
        List<Expense> expenseList = expenseRepository.findByUserId(userId);

        List<ExpenseDto> expenseDtoList = new ArrayList<>();
        for (Expense expense : expenseList) {
            ExpenseDto expenseDto = new ExpenseDto();
            //필요 조회 정보
            expenseDto.setExpenseAmount(expense.getExpenseAmount());
            expenseDto.setExpenseDate(expense.getExpenseDate());

            expenseDtoList.add(expenseDto);
        }

        return expenseDtoList;
    }

    // 일간 개별 합계 조회
    // 수입
    public Map<String, Integer> getDailyIncome(UserDetailsImpl userDetails) {
        Long userId = userDetails.getId();

        List<Income> incomeList = incomeRepository.findByUserId(userId);

        Map<String, Integer> dailyIncomeList = new LinkedHashMap<>();

        for (Income income : incomeList) {
            String incomeDate = income.getIncomeDate();
            int incomeAmount = income.getIncomeAmount();

            // 이미 해당 날짜의 합계가 계산되었는지 확인
            if (dailyIncomeList.containsKey(incomeDate)) {
                int currentTotal = dailyIncomeList.get(incomeDate);
                dailyIncomeList.put(incomeDate, currentTotal + incomeAmount);
            } else {
                dailyIncomeList.put(incomeDate, incomeAmount);
            }
        }

        return dailyIncomeList;
    }

    //지출
    public Map<String, Integer> getDailyExpense(UserDetailsImpl userDetails) {
        Long userId = userDetails.getId();

        List<Expense> expenseList = expenseRepository.findByUserId(userId);

        Map<String, Integer> dailyExpenseList = new LinkedHashMap<>();

        for (Expense expense : expenseList) {
            String expenseDate = expense.getExpenseDate();
            int expenseAmount = expense.getExpenseAmount();

            // 이미 해당 날짜의 합계가 계산되었는지 확인
            if (dailyExpenseList.containsKey(expenseDate)) {
                int currentTotal = dailyExpenseList.get(expenseDate);
                dailyExpenseList.put(expenseDate, currentTotal + expenseAmount);
            } else {
                dailyExpenseList.put(expenseDate, expenseAmount);
            }
        }

        return dailyExpenseList;
    }



    // 월간 개별 합계 조회
    // 수입
    public Map<String, Integer> getMonthlyIncome(UserDetailsImpl userDetails) {
        Long userId = userDetails.getId();

        List<Income> incomeList = incomeRepository.findByUserId(userId);

        Map<String, Integer> monthlyIncome = new LinkedHashMap<>();

        for (Income income : incomeList) {
            String incomeMonth = getMonthFromDate(income.getIncomeDate());
            int incomeAmount = income.getIncomeAmount();

            // 이미 해당 월의 합계가 계산되었는지 확인
            if (monthlyIncome.containsKey(incomeMonth)) {
                int currentTotal = monthlyIncome.get(incomeMonth);
                monthlyIncome.put(incomeMonth, currentTotal + incomeAmount);
            } else {
                monthlyIncome.put(incomeMonth, incomeAmount);
            }
        }

        return monthlyIncome;
    }


    // 지출
    public Map<String, Integer> getMonthlyExpense(UserDetailsImpl userDetails) {
        Long userId = userDetails.getId();

        List<Expense> expenseList = expenseRepository.findByUserId(userId);

        Map<String, Integer> monthlyExpense = new LinkedHashMap<>();

        for (Expense expense : expenseList) {
            String expenseMonth = getMonthFromDate(expense.getExpenseDate());
            int expenseAmount = expense.getExpenseAmount();

            // 이미 해당 월의 합계가 계산되었는지 확인
            if (monthlyExpense.containsKey(expenseMonth)) {
                int currentTotal = monthlyExpense.get(expenseMonth);
                monthlyExpense.put(expenseMonth, currentTotal + expenseAmount);
            } else {
                monthlyExpense.put(expenseMonth, expenseAmount);
            }
        }

        return monthlyExpense;
    }

    private String getMonthFromDate(String date) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date parsedDate;
        try {
            parsedDate = format.parse(date);
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(parsedDate);
            int year = calendar.get(Calendar.YEAR);
            int month = calendar.get(Calendar.MONTH) + 1;
            return year + "-" + month;
        } catch (ParseException e) {
            e.printStackTrace();
            // 월 값을 추출할 수 없는 경우 예외 처리
            return "";
        }
    }

    // 월간 전체 합계
    public Map<String, Integer> getMonthlyStatistics(UserDetailsImpl userDetails) {
        Long userId = userDetails.getId();

        Map<String, Integer> monthlyStatistics = new LinkedHashMap<>();

        // 월간 수입 합계 계산
        Map<String, Integer> monthlyIncome = getMonthlyIncome(userDetails);
        if (monthlyIncome == null) {
            monthlyIncome = new HashMap<>();
        }

        // 월간 지출 합계 계산
        Map<String, Integer> monthlyExpense = getMonthlyExpense(userDetails);
        if (monthlyExpense == null) {
            monthlyExpense = new HashMap<>();
        }

        // 월별 합계 계산 및 합산
        for (String month : monthlyExpense.keySet()) {
            int incomeTotal = monthlyIncome.getOrDefault(month, 0);
            int expenseTotal = monthlyExpense.getOrDefault(month, 0);
            int total = incomeTotal - expenseTotal;
            monthlyStatistics.put(month, total);
        }

        return monthlyStatistics;
    }


}

