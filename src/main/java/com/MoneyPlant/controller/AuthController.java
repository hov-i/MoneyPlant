package com.MoneyPlant.controller;

import com.MoneyPlant.dto.LoginRequest;
import com.MoneyPlant.dto.MessageResponse;
import com.MoneyPlant.dto.SignupRequest;
import com.MoneyPlant.service.AuthService;

import com.MoneyPlant.service.jwt.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Map;


//@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    // 유저 인증 Login request 받아서 로그인 응답처리
    // @Valid : 유효성 체크
    @PostMapping("/auth/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        return authService.signin(loginRequest);
    }

    // 회원가입: 이메일, 비밀번호, 이름
    @PostMapping("/auth/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signUpRequest) {
        return authService.signup(signUpRequest);
    }

        // 로그아웃
    @PostMapping("/api/auth/signout")
    public ResponseEntity<?> logoutUser() {
        return authService.signout();
    }

    @PostMapping("/api/auth/refreshtoken")
    public ResponseEntity<?> refreshtoken(HttpServletRequest request) {
        return authService.tokenRefresh(request);
    }

    // 비밀번호 업데이트
    @PostMapping("auth/password/update")
    public ResponseEntity<?> updatePassword(@RequestBody Map<String, String> request) {
        ResponseEntity<?> response;

        try {
            String email = request.get("email");
            String currentPassword = request.get("currentPassword");
            String newPassword = request.get("newPassword");

            response = authService.updatePassword(email, currentPassword, newPassword);
        } catch (Exception e) {
            response = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageResponse("비밀번호 업데이트 실패: " + e.getMessage()));
        }

        return response;
    }

    @DeleteMapping("auth/user/delete")
    public ResponseEntity<?> userDelete(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        try {
            authService.userDelete(userDetails);
            return new ResponseEntity<>("탈퇴가 완료되었습니다.", HttpStatus.ACCEPTED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>("탈퇴를 실패하였습니다. " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
