package com.MoneyPlant.service;

import com.MoneyPlant.config.GoogleOAuth;
import com.MoneyPlant.constant.ERole;
import com.MoneyPlant.dto.GoogleOAuthToken;
import com.MoneyPlant.dto.GoogleUser;
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
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class OAuthService {

    private final GoogleOAuth socialOAuth;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final OAuthTokenRepository oAuthTokenRepository;
    private final JwtUtils jwtUtils;
    private final RefreshTokenService refreshTokenService;

    private static final String GOOGLE_CALENDAR_API_URL = "https://www.googleapis.com/calendar/v3";

    @Value("${app.domain}")
    private String domain;

    public String request() throws IOException {
        return socialOAuth.getOAuthRedirectURL();
    }

    /**
     * 코드를 사용하여 로그인 처리 (신규 유저 등록, OAuthToken 등록)
     * @param code token발급받기 위한 code
     * @return 쿠키에 jwt담아 responseEntity반환
     * @throws JsonProcessingException json 형식 에러 처리
     */
    public ResponseEntity<?> OAuthLogin(String code) throws JsonProcessingException {
        // Retrieve access token, user info, and Google user
        ResponseEntity<String> accessToken = socialOAuth.requestAccessToken(code);
        GoogleOAuthToken googleOAuthToken = socialOAuth.getAccessToken(accessToken);
        ResponseEntity<String> userInfoResponse = socialOAuth.requestUserInfo(googleOAuthToken);
        GoogleUser googleUser = socialOAuth.getUserInfo(userInfoResponse);
        // 이미 가입된 이메일인지 확인
        // 가입되어있으면 로그인 처리
        Optional<User> optionalUser = userRepository.findBySocialEmail(googleUser.getEmail());
        // 새로운 사용자면 등록 후 로그인 처리
        if (optionalUser.isEmpty()) {
            User user = new User();
            user.setEmail(googleUser.getEmail());
            user.setSocialEmail(googleUser.getEmail());
            user.setSocialProvider("GOOGLE");
            user.setName(googleUser.getName());
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            user.setRole(userRole);
            user.setGoogleCalendarId(getDefaultCalendarId(googleOAuthToken));
            userRepository.save(user);
            optionalUser = Optional.of(user);
        }

        User user = optionalUser.get();

        // Check if OAuthToken already exists for the user
        Optional<OAuthToken> optionalOAuthToken = oAuthTokenRepository.findByUser(user);

        if (optionalOAuthToken.isPresent()) {
            // Update the existing OAuthToken
            OAuthToken oAuthToken = optionalOAuthToken.get();
            oAuthToken.updateOAuthToken(
                    googleOAuthToken.getAccess_token(),
                    LocalDateTime.now().plusSeconds(googleOAuthToken.getExpires_in()),
                    googleOAuthToken.getRefresh_token()
            );
            oAuthTokenRepository.save(oAuthToken);
        } else {
            // Create a new OAuthToken
            OAuthToken oAuthToken = OAuthToken.builder()
                    .user(user)
                    .accessToken(googleOAuthToken.getAccess_token())
                    .expire(LocalDateTime.now().plusSeconds(googleOAuthToken.getExpires_in()))
                    .refreshToken(googleOAuthToken.getRefresh_token())
                    .build();
            oAuthTokenRepository.save(oAuthToken);
        }

        UserDetailsImpl userDetails = UserDetailsImpl.build(user);

        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getId());
        ResponseCookie jwtRefreshCookie = jwtUtils.generateRefreshJwtCookie(refreshToken.getToken());

        // Return a non-OK status to redirect the page
        return ResponseEntity.status(HttpStatus.FOUND)
                .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .header(HttpHeaders.SET_COOKIE, jwtRefreshCookie.toString())
                .header(HttpHeaders.LOCATION, domain)
                .build();
    }

    // accessToken 만료 체크
    public boolean isTokenExpired(OAuthToken oAuthToken) {
        LocalDateTime expirationTime = oAuthToken.getExpire();
        LocalDateTime currentTime = LocalDateTime.now();

        Duration timeUntilExpiration = Duration.between(currentTime, expirationTime);
        long minutesUntilExpiration = timeUntilExpiration.toMinutes();

        return minutesUntilExpiration <= 0;
    }

    // oAuthToken을 사용가능한 토큰 상태로 만들어주는 메소드
    public OAuthToken validOAuthToken(OAuthToken oAuthToken) throws JsonProcessingException {
        if (!isTokenExpired(oAuthToken)) {
            return oAuthToken;
        }
        GoogleOAuthToken googleOAuthToken = GoogleOAuthToken.fromOAuthToken(oAuthToken);
        ResponseEntity<String> responseEntity = socialOAuth.refreshAccessToken(googleOAuthToken);
        // idToken과 refreshToken을 제외하고 newOAuthToken에 담깁니다.
        GoogleOAuthToken newOAuthToken = socialOAuth.getAccessToken(responseEntity);
        oAuthToken.updateOAuthToken(
                newOAuthToken.getAccess_token(),
                LocalDateTime.now().plusSeconds(newOAuthToken.getExpires_in()),
                oAuthToken.getRefreshToken()
        );

        oAuthTokenRepository.save(oAuthToken);
        return oAuthToken;
    }

    @Transactional
    public int deleteByUserId(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return oAuthTokenRepository.deleteByUser(user);
    }

    // calendarID 가져오기
    public String getDefaultCalendarId(GoogleOAuthToken googleOAuthToken) {
        System.out.println("getDefaultCalendatId 실행");
        String accessToken = googleOAuthToken.getAccess_token();
        System.out.println("accessToken : " + accessToken);
        RestTemplate restTemplate = new RestTemplate();
        ObjectMapper objectMapper = new ObjectMapper();

        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.setBearerAuth(accessToken);

        URI uri = UriComponentsBuilder.fromHttpUrl(GOOGLE_CALENDAR_API_URL + "/users/me/calendarList")
                .build().toUri();
        RequestEntity<MultiValueMap<String, String>> requestEntity = new RequestEntity<>(headers, HttpMethod.GET, uri);

        ResponseEntity<String> responseEntity = restTemplate.exchange(requestEntity, String.class);

        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            String responseBody = responseEntity.getBody();
            System.out.println("responseBody : " + responseBody);

            try {
                JsonNode responseJson = objectMapper.readTree(responseBody);
                System.out.println("responseJson : " + responseJson);
                JsonNode calendarsJson = responseJson.get("items");
                System.out.println("calendarsJson : " + calendarsJson);

                for (JsonNode calendarJson : calendarsJson) {
                    if (calendarJson.has("primary")) {
                        boolean isPrimary = calendarJson.get("primary").asBoolean();
                        System.out.println("isPrimary: " + isPrimary);
                        System.out.println("id: " + calendarJson.get("id").asText());

                        if (isPrimary) {
                            String calendarId = calendarJson.get("id").asText();
                            System.out.println("calendarId: " + calendarId);
                            return calendarId; // Return the default calendar ID
                        }
                    }
                }
                // No default calendar found
                return null;
            } catch (Exception e) {
                // Handle JSON parsing exception
                // ...
                return null;
            }
        } else {
            // Handle the error response
            // ...
            return null; // Return null or throw an exception
        }
    }
}

