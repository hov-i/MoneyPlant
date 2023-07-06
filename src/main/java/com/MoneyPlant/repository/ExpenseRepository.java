package com.MoneyPlant.repository;

import com.MoneyPlant.dto.CategoryDto;
import com.MoneyPlant.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByUserId(Long userId);

    @Query(value = "SELECT c.category_id AS categoryId, c.category_name AS categoryName " +
            "FROM expense e " +
            "JOIN category c ON e.category_id = c.category_id " +
            "WHERE e.id = :userId " +
            "AND MONTH(e.expense_date) = MONTH(CURRENT_DATE()) " +
            "AND YEAR(e.expense_date) = YEAR(CURRENT_DATE()) " +
            "GROUP BY c.category_id, c.category_name " +
            "ORDER BY COUNT(c.category_id) DESC " +
            "LIMIT 3", nativeQuery = true)
    List<Map<?,?>> findTop3CategoriesByUserAndCurrentMonth(@Param("userId") Long userId);
}
