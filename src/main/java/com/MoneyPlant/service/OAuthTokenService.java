package com.MoneyPlant.service;

import com.MoneyPlant.entity.OAuthToken;
import com.MoneyPlant.entity.User;
import com.MoneyPlant.repository.OAuthTokenRepository;
import com.MoneyPlant.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Optional;

@Transactional
@RequiredArgsConstructor
@Service
public class OAuthTokenService {
    private OAuthTokenRepository oAuthTokenRepository;
    private UserRepository userRepository;

    public Optional<OAuthToken> findByUser(User user) {
        return oAuthTokenRepository.findByUser(user);
    }

    // 만료시간까지 1분 미만이 남았을 때 만료로 처리 ( 동작 중간에 토큰 만료되는 것을 방지 하기 위함)
    public boolean isTokenExpired(OAuthToken token) {
        LocalDateTime expirationTime = token.getExpire();
        LocalDateTime currentTime = LocalDateTime.now();

        Duration timeUntilExpiration = Duration.between(currentTime, expirationTime);
        long minutesUntilExpiration = timeUntilExpiration.toMinutes();

        return minutesUntilExpiration <= 0;
    }


    public void refreshAccessToken(OAuthToken token) {
        //
    }

    private LocalDateTime calculateExpirationTime() {
        // Calculate the new expiration time based on your business logic
        // This can involve adding a fixed duration to the current time or parsing the expiration time from the token response

        // Example: Adding 1 hour to the current time
        return LocalDateTime.now().plusHours(1);
    }

    @Transactional
    public int deleteByUserId(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return oAuthTokenRepository.deleteByUser(user);
    }
}
