package com.MoneyPlant.repository;

import com.MoneyPlant.entity.Schedule;
import com.MoneyPlant.entity.Work;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkRepository extends JpaRepository<Work, Long> {
    List<Work> findByUserId(Long userId);

    Work findByWorkId(Long workId);

    List<Work> findByUserIdAndWorkDate(Long userId, String workDate);

    void deleteByWorkId(Long workId);
}
