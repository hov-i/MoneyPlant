package com.MoneyPlant.service;

import com.MoneyPlant.constant.ERole;
import com.MoneyPlant.dto.LoginRequest;
import com.MoneyPlant.dto.MessageResponse;
import com.MoneyPlant.dto.SignupRequest;
import com.MoneyPlant.dto.UserInfoResponse;
import com.MoneyPlant.entity.RefreshToken;
import com.MoneyPlant.entity.Role;
import com.MoneyPlant.entity.User;
import com.MoneyPlant.repository.OAuthTokenRepository;
import com.MoneyPlant.repository.RoleRepository;
import com.MoneyPlant.repository.UserRepository;
import com.MoneyPlant.security.exception.TokenRefreshException;
import com.MoneyPlant.security.jwt.JwtUtils;
import com.MoneyPlant.service.jwt.RefreshTokenService;
import com.MoneyPlant.service.jwt.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;

// AuthService 는 인증에 관한 서비스만 제공해야하지 않을까??
// 인증은? 토큰 등록, 토큰 발급, 토큰 갱신, 토큰 삭제 같은거
// userRepository.save()를 분리하면 어떨까
// OAuth에도 써야하는데


@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder encoder;
    private final JwtUtils jwtUtils;

    private final RefreshTokenService refreshTokenService;
    private final OAuthTokenService oAuthTokenService;

    // 회원가입
    public ResponseEntity<?> signup(SignupRequest signupRequest) {
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }
        // User 객체 user 생성 (password 는 Bcryp 암호화 적용)
        User user = new User(signupRequest.getName(),
                signupRequest.getEmail(),
                encoder.encode(signupRequest.getPassword()));
        String requestRole = signupRequest.getRole();
        Role role;

        // user 에 role 부여 (유저 / 관리자  기본값: 유저)
        if (requestRole == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            role = userRole;
        } else {    // 값이 있다면 해당 값을 Role 객체로 바꾸어 설정
            if (requestRole.equals("admin")) {
                System.out.println("admin으로 적용");
                Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                role = adminRole;
            } else {
                Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                role = userRole;
            }
        }
        user.setRole(role);
        userRepository.save(user);

        System.out.println(requestRole);
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
    // 로그인
    public ResponseEntity<?> signin(LoginRequest loginRequest) {
        // login request : email, password 로 구성됨
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);


        String role = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .findFirst()
                .orElse("");

        RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getId());

        ResponseCookie jwtRefreshCookie = jwtUtils.generateRefreshJwtCookie(refreshToken.getToken());

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .header(HttpHeaders.SET_COOKIE, jwtRefreshCookie.toString())
                .body(new UserInfoResponse(userDetails.getId(),
                        userDetails.getName(),
                        userDetails.getEmail(), role));
    }
    // 로그아웃
    public ResponseEntity<?> signout() {
        // SecurityContextHolder 로 현재 세션의 사용자 정보를 가져옴
        // getPrincipal()을 사용하면 UserDetails를 구현한 객체를 반환함
        // 우리의 경우 UserDetailsImpl 가 그 객체이고 그렇기 때문에 Object로 생성했지만 형변환이 가능한 모습
        Object principle = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // 사용자 인증이 되지 않은 사람을 = "anonymousUser" 로 표현함
        // 인증이 되어있다면 userId값을 세션에서 가져와서 해당하는 refreshtoken을 DB에서 삭제함
        if (principle.toString().equals( "anonymousUser")) {
            Long userId = ((UserDetailsImpl) principle).getId();
            refreshTokenService.deleteByUserId(userId);
            oAuthTokenService.deleteByUserId(userId);

        }

        // cookie의 token값들을 지워버림
        ResponseCookie jwtCookie = jwtUtils.getCleanJwtCookie();
        ResponseCookie jwtRefreshCookie = jwtUtils.getCleanJwtRefreshCookie();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .header(HttpHeaders.SET_COOKIE, jwtRefreshCookie.toString())
                .body(new MessageResponse("You've been signed out!"));
    }
    // 토큰 쿠키 재설정 (access token 갱신)
    public ResponseEntity<?> tokenRefresh(HttpServletRequest request) {
        String refreshToken = jwtUtils.getJwtRefreshFromCookies(request);

        if ((refreshToken != null) && (refreshToken.length() > 0)) {
            return refreshTokenService.findByToken(refreshToken)
                    .map(refreshTokenService::verifyExpiration)
                    .map(RefreshToken::getUser)
                    .map(user -> {
                        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(user);

                        return ResponseEntity.ok()
                                .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                                .body(new MessageResponse("토큰 갱신 성공!"));
                    })
                    .orElseThrow(() -> new TokenRefreshException(refreshToken,
                            "refresh token이 DB에 존재하지 않습니다!"));
        }
        return ResponseEntity.badRequest().body(new MessageResponse("Refresh Token is empty!"));
    }
}
