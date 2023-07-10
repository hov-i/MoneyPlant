package com.MoneyPlant.controller;

import com.MoneyPlant.dto.LoginRequest;
import com.MoneyPlant.dto.SignupRequest;
import com.MoneyPlant.service.AuthService;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;


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

    @PostMapping("auth/refreshtoken")
    public ResponseEntity<?> refreshtoken(HttpServletRequest request) {
        return authService.tokenRefresh(request);
    }
}
