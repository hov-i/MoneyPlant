package com.MoneyPlant.service.jwt;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import com.MoneyPlant.entity.RefreshToken;
import com.MoneyPlant.repository.RefreshTokenRepository;
import com.MoneyPlant.repository.UserRepository;
import com.MoneyPlant.security.exception.TokenRefreshException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



@Service
@Transactional
@RequiredArgsConstructor
public class RefreshTokenService {
    @Value("${app.jwtRefreshExpirationMs}")
    private Long refreshTokenDurationMs;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;




    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    // userId를 받아서 refresh token 생성 후 DB에 저장하는 메소드
    public RefreshToken createRefreshToken(Long userId) {
        RefreshToken refreshToken;
        Optional<RefreshToken> optionalRefreshToken = refreshTokenRepository.findByUserId(userId);

        refreshToken = optionalRefreshToken.orElseGet(RefreshToken::new);

        refreshToken.setUser(userRepository.findUserById(userId));
        refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenDurationMs));
        refreshToken.setToken(UUID.randomUUID().toString());

        refreshToken = refreshTokenRepository.save(refreshToken);
        return refreshToken;
    }

    // refresh 기한 만료 체크
    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(token);
            throw new TokenRefreshException(token.getToken(), "Refresh token was expired. Please make a new signin request");
        }

        return token;
    }


    // userId로 refresh token 테이블에서 토큰 삭제하는 메소드
    @Transactional
    public int deleteByUserId(Long userId) {
        return refreshTokenRepository.deleteByUser(userRepository.findUserById(userId));
    }
}