package com.MoneyPlant.service;

import com.MoneyPlant.dto.BudgetDto;
import com.MoneyPlant.dto.CategoryDto;
import com.MoneyPlant.entity.Budget;
import com.MoneyPlant.entity.Category;
import com.MoneyPlant.entity.User;
import com.MoneyPlant.repository.BudgetRepository;
import com.MoneyPlant.repository.CategoryRepository;
import com.MoneyPlant.repository.UserRepository;
import com.MoneyPlant.service.jwt.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.security.auth.kerberos.KerberosKey;
import javax.servlet.http.HttpServletRequest;
import javax.sql.RowSet;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@Transactional
@Slf4j
@RequiredArgsConstructor
@Service
public class BudgetService {
    private final BudgetRepository budgetRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    @PostConstruct
    public void insertCategoryData() {

        String[] categoryNames = {
                "식비",
                "교통/차량",
                "주유",
                "문화/레저",
                "마트/편의점",
                "패션/미용",
                "생활용품",
                "여행/숙박",
                "주거",
                "의료비",
                "교육",
                "경조사/회비",
                "반려동물",
                "기타"
        };

        for (int i = 0; i < categoryNames.length; i++) {
            CategoryDto categoryDto = new CategoryDto();
            categoryDto.setCategoryId(Long.valueOf(i + 1));
            categoryDto.setCategoryName(categoryNames[i]);

            Category category = new Category();
            category.setCategoryId(categoryDto.getCategoryId());
            category.setCategoryName(categoryDto.getCategoryName());

            categoryRepository.save(category);
        }
        System.out.println("Category 초기값 저장 완료");
    }

    // 나의 예산 생성
    public boolean createBudgetForCategories(BudgetDto budgetDto, UserDetailsImpl userDetails) {
        Long userId = userDetails.getId();
        budgetDto.setUserId(userId);

        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
            Long categoryId = Long.valueOf(budgetDto.getCategoryId());
            Category category = categoryRepository.findById(categoryId)
                    .orElseThrow(() -> new RuntimeException("카테고리를 찾을 수 없습니다."));

            Budget budget = budgetRepository.findByUserAndCategory(user, category); // budget 조회

            if (budget == null) { // 만약 기존 budget 데이터가 없다면
                budget = new Budget();
                budget.setUser(user);
                budget.setCategory(category); // budget에 카테고리와 userId를 추가
            }

            budget.setBudgetMoney(budgetDto.getBudgetMoney()); // budget에 돈을 추가
            budget.setBudgetMonth(budgetDto.getBudgetMonth()); // budget에 달을 추가

            budgetRepository.save(budget); // budget 저장
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


    // 나의 예산 조회
    public List<BudgetDto> getBudgetWithCategoryNames(UserDetailsImpl userDetails) {
        Long userId = userDetails.getId();
        List<Budget> budgetList = budgetRepository.findByUserId(userId);


        List<BudgetDto> budgetDtoList = new ArrayList<>();
        for (Budget budget : budgetList) {

            BudgetDto budgetDto = new BudgetDto();
            budgetDto.setBudgetMoney(budget.getBudgetMoney());
            budgetDto.setBudgetMonth(budget.getBudgetMonth());
            budgetDto.setCategoryId(budget.getCategory().getCategoryId());
            budgetDto.setUserId(budget.getUser().getId());
            String categoryName = categoryRepository.findByCategoryId(budget.getCategory().getCategoryId()).getCategoryName();
            budgetDto.setCategoryName(categoryName);

            budgetDtoList.add(budgetDto);
        }

        return budgetDtoList;
    }
}