package com.MoneyPlant.config;

import com.MoneyPlant.dto.GoogleOAuthToken;
import com.MoneyPlant.dto.GoogleUser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
@Slf4j
public class GoogleOAuth implements SocialOAuth{

    @Value("${app.googleUrl}")
    private String GOOGLE_SNS_LOGIN_URL;

    @Value("${app.googleTokenUrl}")
    private String GOOGLE_SNS_TOKEN_URL;

    @Value("${app.googleClientId}")
    private String GOOGLE_SNS_CLIENT_ID;

    @Value("${app.googleRedirectUrl}")
    private String GOOGLE_SNS_CALLBACK_URL;

    @Value("${app.googleClientSecret}")
    private String GOOGLE_SNS_CLIENT_SECRET;

    @Value("${app.googleScope}")
    private String GOOGLE_DATA_ACCESS_SCOPE;

    // String 값을 객체로 바꾸는 Mapper
    private final ObjectMapper objectMapper;

    @Override
    public String getOAuthRedirectURL() {
        Map<String,Object> params = new HashMap<>();

        params.put("scope",GOOGLE_DATA_ACCESS_SCOPE);
        params.put("response_type","code");
        params.put("access_type","offline");
        params.put("client_id",GOOGLE_SNS_CLIENT_ID);
        params.put("redirect_uri",GOOGLE_SNS_CALLBACK_URL);

        String parameterString=params.entrySet().stream()
                .map(x->x.getKey()+"="+x.getValue())
                .collect(Collectors.joining("&"));
        String redirectURL=GOOGLE_SNS_LOGIN_URL+"?"+parameterString;
        log.info("redirect-URL={}", redirectURL);
        return redirectURL;
    }

    @Override
    public ResponseEntity<String> refreshAccessToken(GoogleOAuthToken googleOAuthToken) {
        RestTemplate restTemplate = new RestTemplate();

        // 토큰 갱신하기 위한 requestBody 생성
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("grant_type", "refresh_token");
        requestBody.put("client_id",GOOGLE_SNS_CLIENT_ID );
        requestBody.put("client_secret", GOOGLE_SNS_CLIENT_SECRET);
        requestBody.put("refresh_token", googleOAuthToken.getRefresh_token());

        // header 생성
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        // HttpEntity 에 담아서
        HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);

        // restTemplate을 이용해 post 요청
        return restTemplate.exchange(
                GOOGLE_SNS_TOKEN_URL,
                HttpMethod.POST,
                requestEntity,
                String.class
        );
    }
    @Override
    public ResponseEntity<String> requestAccessToken(String code) {
        String GOOGLE_TOKEN_REQUEST_URL = "https://OAuth2.googleapis.com/token";
        RestTemplate restTemplate = new RestTemplate();
        Map<String, Object> params = new HashMap<>();
        params.put("code", code);
        params.put("client_id", GOOGLE_SNS_CLIENT_ID);
        params.put("client_secret", GOOGLE_SNS_CLIENT_SECRET);
        params.put("redirect_uri", GOOGLE_SNS_CALLBACK_URL);
        params.put("grant_type", "authorization_code");
        return restTemplate.postForEntity(GOOGLE_TOKEN_REQUEST_URL, params, String.class);

    }

    @Override
    public GoogleOAuthToken getAccessToken(ResponseEntity<String> accessToken) throws JsonProcessingException {
        log.info("accessTokenBody: {}",accessToken.getBody());
        return objectMapper.readValue(accessToken.getBody(),GoogleOAuthToken.class);
    }

    @Override
    public ResponseEntity<String> requestUserInfo(GoogleOAuthToken googleOAuthToken) {
        String GOOGLE_USERINFO_REQUEST_URL= "https://www.googleapis.com/userinfo/v2/me";

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();

        headers.setBearerAuth(googleOAuthToken.getAccess_token());
        HttpEntity<MultiValueMap<String,String>> request = new HttpEntity<>(headers);
        headers.add("access_token", googleOAuthToken.getAccess_token());

        return restTemplate.exchange(GOOGLE_USERINFO_REQUEST_URL, HttpMethod.GET, request, String.class);


    }

    @Override
    public GoogleUser getUserInfo(ResponseEntity<String> userInfoResponse) throws JsonProcessingException {
        return objectMapper.readValue(userInfoResponse.getBody(), GoogleUser.class);
    }
}