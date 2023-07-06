package com.MoneyPlant.security.jwt;
import java.util.Date;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import com.MoneyPlant.service.jwt.UserDetailsImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;

import com.MoneyPlant.entity.User;

import io.jsonwebtoken.*;

@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);
    //SLF4J의 LoggerFactory를 사용하여 개인용, 정적 및 최종 로거 인스턴스를 초기화합니다
    //로거는 JwtUtils 클래스의 메시지 또는 이벤트를 기록하는 데 사용됩니다.
    //로거 인스턴스를 사용할 수 있으면 debug(), info(), warn(), error() 등과 같은
    //다양한 로깅 방법을 사용하여 메시지를 기반으로 다양한 로그 수준에서 메시지를 로깅할 수 있습니다.

    // application.properties에 설정한 값을 가져옵니다
    // jwt발급에 사용될 비밀번호
    @Value("${app.jwtSecret}")
    private String jwtSecret;

    // 토큰 만료기한
    @Value("${app.jwtExpirationMs}")
    private int jwtExpirationMs;

    // 토큰 쿠키에 들어갈 JWT토큰 이름
    @Value("${app.jwtCookieName}")
    private String jwtCookie;

    // 토큰 쿠키로 들어갈 refresh토큰 이름
    @Value("${app.jwtRefreshCookieName}")
    private String jwtRefreshCookie;


//     jwt 쿠키 (UserDetailsImpl버전) (보안 측면에서 구현)
    public ResponseCookie generateJwtCookie(UserDetailsImpl userPrincipal) {
        String jwt = generateTokenFromEmail(userPrincipal.getUsername());
        return generateCookie(jwtCookie, jwt, "/", true, "None");
    }

    /**
     * 쿠키에 JWT 넣어주는 함수
     * @param user entity
     * @return
     */
    public ResponseCookie generateJwtCookie(User user) {
        String jwt = generateTokenFromEmail(user.getEmail());
        return generateCookie(jwtCookie, jwt, "/", true, "None");
    }

    /**
     * 쿠키에 refresh token를 매개변수로 받아 넣어주는 함수
     * @param refreshToken
     * @return
     */

    public ResponseCookie generateRefreshJwtCookie(String refreshToken) {
        return generateCookie(jwtRefreshCookie, refreshToken, "/api/auth/refreshtoken", true, "None");
    }

    /**
     * request 에서 jwtCookie 를 name으로 가진 cookie의 value값을 가져오는 함수
     * @param request
     * @return
     */
    public String getJwtFromCookies(HttpServletRequest request) {
        return getCookieValueByName(request, jwtCookie);
    }

    /**
     * request 에서 jwtRefreshCookie 를 name으로 가진 cookie의 value값을 가져오는 함수
     * @param request
     * @return
     */
    public String getJwtRefreshFromCookies(HttpServletRequest request) {
        return getCookieValueByName(request, jwtRefreshCookie);
    }

    /**
     * jwtCookie의 value를 null로 설정하는 함수
     * @return
     */
    public ResponseCookie getCleanJwtCookie() {
        ResponseCookie cookie = ResponseCookie.from(jwtCookie, null).path("/").build();
        return cookie;
    }

    /**
     * jwtRefreshCookie의 value를 null로 설정하는 함수
     * @return
     */
    public ResponseCookie getCleanJwtRefreshCookie() {
        ResponseCookie cookie = ResponseCookie.from(jwtRefreshCookie, null).path("/api/auth/refreshtoken").build();
        return cookie;
    }

    /**
     * 토큰의 payload부분을 jwtSecret으로 풀어서 subject값인 email가져옴
     * @param token
     * @return
     */
    public String getEmailFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }

    /**
     * JWT token 인증하는 함수입니다 인증되면 true반환 에러에 대해서 에러구문을 출력하고 false반환
     * @param authToken
     * @return
     */
    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
            logger.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }

        return false;
    }

    /**
     * 유저 이메일을 토큰 생성
     * 발급일로부터 jwtExpriration 만큼의 기한을 가짐
     * jwtSecret 을 key로 HS512 암호화 사용
     * @param email
     * @return String
     */
    public String generateTokenFromEmail(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    /**
     * generateCookie는 파라미터를 받아 쿠키로 만드는 함수입니다
     * @param name 쿠키의 이름
     * @param value 쿠키의 값
     * @param path 경로 ( 해당 주소값에 쿠키 전송 )
     * @return ResponseCookie
     * ResponseCookie는 쿠키
     */

    private ResponseCookie generateCookie(String name, String value, String path, boolean secure, String sameSite) {
        ResponseCookie cookie = ResponseCookie.from(name, value)
                .path(path)
                .maxAge(24 * 60 * 60)
                .httpOnly(true)
                .secure(secure)
                .sameSite(sameSite)
                .build();
        return cookie;
    }


    /**
     * cookie의 name으로 value 값을 읽습니다.
     * @param request
     * @param name
     * @return
     */
    private String getCookieValueByName(HttpServletRequest request, String name) {
        Cookie cookie = WebUtils.getCookie(request, name);
        if (cookie != null) {
            return cookie.getValue();
        } else {
            return null;
        }
    }
}