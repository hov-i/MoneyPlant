package com.MoneyPlant.repository;
import java.util.Optional;

import com.MoneyPlant.entity.OAuthToken;
import com.MoneyPlant.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;



@Repository
public interface OAuthTokenRepository extends JpaRepository<OAuthToken, Long> {
    Optional<OAuthToken> findByAccessToken(String accessToken);
    Optional<OAuthToken> findByUser(User user);

    @Modifying
    int deleteByUser(User user);
}