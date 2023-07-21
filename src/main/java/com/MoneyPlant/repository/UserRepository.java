package com.MoneyPlant.repository;

import java.util.Optional;

import com.MoneyPlant.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findBySocialEmail(String socialEmail);
    User findUserById(Long Id);

    //    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
}