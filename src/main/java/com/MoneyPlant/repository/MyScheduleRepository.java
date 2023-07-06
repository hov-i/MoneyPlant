package com.MoneyPlant.repository;


import com.MoneyPlant.entity.MySchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MyScheduleRepository extends JpaRepository <MySchedule, Long> {
    List<MySchedule> findByUserId(Long userId);
}
