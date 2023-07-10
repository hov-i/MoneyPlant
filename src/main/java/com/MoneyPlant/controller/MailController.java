package com.MoneyPlant.controller;
import com.MoneyPlant.service.MailService;
import com.MoneyPlant.service.UserService;
import com.MoneyPlant.service.jwt.UserDetailsImpl;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@Slf4j
@CrossOrigin(origins = "https://localhost:3000", allowedHeaders = "*")
@RequestMapping("/mail")
@RequiredArgsConstructor
public class MailController {

    @Autowired
    private MailService mailService;

    private static final String SUCCESS = "success";
    private static final Object FAIL = "fail";

    @ApiOperation(value = "이메일 인증코드 전송", notes = "전송한 인증코드를 반환한다.", response = Map.class)
    @PostMapping("/sendmail")
    public ResponseEntity<Map<String, Object>> sendMail(@RequestBody Map<String, String> map) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        String code = mailService.sendMail(map.get("type"), map.get("email"));
        if(code.equals("error")) {
            resultMap.put("message",FAIL);
            status = HttpStatus.ACCEPTED;
        }else {
            resultMap.put("message", SUCCESS);
            resultMap.put("code", code);
            status = HttpStatus.ACCEPTED;
        }

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    // 전송한 코드를 비밀번호로 변경
    private final UserDetailsService userDetailsService;
    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        System.out.println("userDetails : " + userDetails);
        System.out.println("userDetails.getName :" + userDetails.getName());
        System.out.println("userDetails.getId : " + userDetails.getId());
        System.out.println("userDetails.getEmail : " + userDetails.getEmail());
        return userService.getUserInfo(userDetails);
    }
}
