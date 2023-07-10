package com.MoneyPlant.controller;
import com.MoneyPlant.service.MailService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
}
