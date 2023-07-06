package com.MoneyPlant.security.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


// TokenRefreshException 발생 시 403: FORBIDDEN을 띄워줍니다
@ResponseStatus(HttpStatus.FORBIDDEN)
public class TokenRefreshException extends RuntimeException {

    // serialVersionUID 는 직렬화와 역직렬화에 관련된 코드입니다
    // 직렬화란? 객체를 저장하거나 전송가능한 형태로 바꾸는 것
    // 객체가 직렬화 될떄 serialVersionUID도 포함되어 직렬화 됩니다.
    // 그럼 역직렬화 될떄 serialVersionUID를 맞춰서 역직렬화 하면 저장된 객체를 확인할 수 있다
    // 이 후에 TokenRefreshException의 클래스 정의가 변화해도 serialVersionUID 가 일치하다면 역직렬화 가능

    private static final long serialVersionUID = 1L;

    // TokenRefreshException의 부모인 RunTimeException을 호출하고 에러메시지를 출력
    public TokenRefreshException(String token, String message) {
        super(String.format("Failed for [%s]: %s", token, message));
    }
}