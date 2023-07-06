package com.MoneyPlant.repository;

import com.MoneyPlant.entity.MyWork;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MyWorkRepository extends JpaRepository <MyWork, Long> {
    List<MyWork> findByUserId(Long userId);
}
