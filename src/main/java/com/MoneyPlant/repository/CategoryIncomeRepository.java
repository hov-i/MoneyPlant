package com.MoneyPlant.repository;

import com.MoneyPlant.entity.CategoryIncome;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CategoryIncomeRepository extends JpaRepository<CategoryIncome, Long> {
    CategoryIncome findByCategoryIncomeId(Long categoryIncomeId);

}
