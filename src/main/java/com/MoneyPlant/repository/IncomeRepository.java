package com.MoneyPlant.repository;

import com.MoneyPlant.entity.Expense;
import com.MoneyPlant.entity.Income;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IncomeRepository extends JpaRepository<Income, Long> {
    List<Income> findByUserId(Long userId);
    List<Income> findByUserIdAndIncomeDate(Long userId, String incomeDate);

}
