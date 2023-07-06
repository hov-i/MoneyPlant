package com.MoneyPlant.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;  // 유효성 검사용

@Getter
@Setter
// NotBlnk 가 하는 일 ( 문자열 필드에 유의미한 값이 있는지 유효성 체크를 해줍니다)
// 1. Null 체크 2. 문자열이 비어있는지 (Null과는 다르죠 길이가 0인 String 객체인지 체크하는겁니다)
// 3. 공백 확인 4. 공백 제거
public class LoginRequest {
    @NotBlank
    private String email;

    @NotBlank
    private String password;

}