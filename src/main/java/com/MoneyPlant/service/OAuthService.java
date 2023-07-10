package com.MoneyPlant.service;

import com.MoneyPlant.config.GoogleOAuth;
import com.MoneyPlant.constant.ERole;
import com.MoneyPlant.dto.GetGoogleOAuthRes;
import com.MoneyPlant.dto.GoogleOAuthToken;
import com.MoneyPlant.dto.GoogleUser;
import com.MoneyPlant.dto.UserInfoResponse;
import com.MoneyPlant.entity.OAuthToken;
import com.MoneyPlant.entity.RefreshToken;
import com.MoneyPlant.entity.Role;
import com.MoneyPlant.entity.User;
import com.MoneyPlant.repository.OAuthTokenRepository;
import com.MoneyPlant.repository.RoleRepository;
import com.MoneyPlant.repository.UserRepository;
import com.MoneyPlant.security.jwt.JwtUtils;
import com.MoneyPlant.service.jwt.RefreshTokenService;
import com.MoneyPlant.service.jwt.UserDetailsImpl;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Optional;
@Service
@RequiredArgsConstructor
public class OAuthService {

    private final GoogleOAuth socialOAuth;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final OAuthTokenRepository oAuthTokenRepository;
    private final JwtUtils jwtUtils;
    private final GoogleCalendarService googleCalendarService;
    private final RefreshTokenService refreshTokenService;

    public String request() throws IOException {
        String redirectURL = socialOAuth.getOAuthRedirectURL();
        return redirectURL;
    }

    /**
     * code를 사용해서 로그인 처리 (신규 유저 등록, OAuthToken 등록)
     * @param code token발급받기 위한 code
     * @return 쿠키에 jwt담아 responseEntity반환
     * @throws JsonProcessingException
     */
    public ResponseEntity<?> OAuthLogin(String code) throws JsonProcessingException {
        ResponseEntity<String> accessToken = socialOAuth.requestAccessToken(code);
        GoogleOAuthToken googleOAuthToken = socialOAuth.getAccessToken(accessToken);
        ResponseEntity<String> userInfoResponse = socialOAuth.requestUserInfo(googleOAuthToken);

        GoogleUser googleUser = socialOAuth.getUserInfo(userInfoResponse);
        // 이미 가입된 이메일인지 확인
        // 가입되어있으면 로그인 처리
        Optional<User> optionalUser = userRepository.findBySocialEmail(googleUser.getEmail());
        // 새로운 사용자면 등록 후 로그인 처리
        if (!optionalUser.isPresent()) {
            User user = new User();
            user.setEmail(googleUser.getEmail());
            user.setSocialEmail(googleUser.getEmail());
            user.setSocialProvider("GOOGLE");
            user.setName(googleUser.getName());
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            user.setRole(userRole);
            user.setGoogleCalendarId(googleCalendarService.getDefaultCalendarId(googleOAuthToken));
            userRepository.save(user);
            optionalUser = Optional.of(user);
        }
        // OAuthToken 저장
        User user = optionalUser.get();
        OAuthToken oAuthToken = OAuthToken.builder()
                .user(user)
                .accessToken(googleOAuthToken.getAccess_token())
                .expire(LocalDateTime.now().plusSeconds(googleOAuthToken.getExpires_in()))
                .refreshToken(googleOAuthToken.getRefresh_token())
                .build();
        oAuthTokenRepository.save(oAuthToken);

        UserDetailsImpl userDetails = UserDetailsImpl.build(user);

        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);

        RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getId());

        ResponseCookie jwtRefreshCookie = jwtUtils.generateRefreshJwtCookie(refreshToken.getToken());

        // 페이지를 리다이렉션 시키기 위해서 OK가 아닌 status로 return
        return ResponseEntity.status(HttpStatus.FOUND)
                .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .header(HttpHeaders.SET_COOKIE, jwtRefreshCookie.toString())
                .header(HttpHeaders.LOCATION, "https://localhost:3000")
                .build();
    }
}
