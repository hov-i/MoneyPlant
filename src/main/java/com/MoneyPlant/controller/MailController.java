package com.MoneyPlant.controller;
import com.MoneyPlant.service.MailService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/mail")
@RequiredArgsConstructor
public class MailController {

    private final MailService mailService;


    @ApiOperation(value = "이메일 인증코드 전송", notes = "전송한 인증코드를 반환한다.", response = Map.class)
    @PostMapping("/sendmail")
    public ResponseEntity<Map<String, Object>> sendMailAndUpdatePwd(@RequestBody Map<String, String> map) {
        String type = map.get("type");
        String email = map.get("email");

        boolean isMailAndPwdUpdated = mailService.sendMailAndUpdatePwd(type, email);
        Map<String, Object> resultMap = new HashMap<>();
        if (isMailAndPwdUpdated) {
            resultMap.put("message", "SUCCESS");
            HttpStatus status = HttpStatus.OK;
            return new ResponseEntity<>(resultMap, status);
        } else {
            resultMap.put("message", "메일 보내는 데 실패했습니다.");
            HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
            return new ResponseEntity<>(resultMap, status);
        }
    }
}