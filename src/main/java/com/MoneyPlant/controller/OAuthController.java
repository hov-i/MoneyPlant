package com.MoneyPlant.controller;

import com.MoneyPlant.dto.GetGoogleOAuthRes;
import com.MoneyPlant.service.OAuthService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/auth")
public class OAuthController {
    private final OAuthService oAuthService;
    private static final Logger logger = LoggerFactory.getLogger(OAuthController.class);



    @GetMapping("/google")
    public ResponseEntity<String> socialLoginRequest() throws IOException {
        String requestURL = oAuthService.request();
        return ResponseEntity.ok(requestURL);
    }



    @GetMapping("/google/redirect")
    public ResponseEntity<?> callback(
                                      @RequestParam(name = "code") String code) throws JsonProcessingException {

        return oAuthService.OAuthLogin(code);
    }
}