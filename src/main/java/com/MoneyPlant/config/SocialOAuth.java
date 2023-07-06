package com.MoneyPlant.config;

import com.MoneyPlant.dto.GoogleOAuthToken;
import com.MoneyPlant.dto.GoogleUser;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.http.ResponseEntity;

public interface SocialOAuth {

    String getOAuthRedirectURL();
    ResponseEntity<String> requestAccessToken(String code);

    GoogleOAuthToken getAccessToken(ResponseEntity<String> accessToken) throws JsonProcessingException;

    ResponseEntity<String> requestUserInfo(GoogleOAuthToken googleOAuthToken);

    GoogleUser getUserInfo(ResponseEntity<String> userInfoResponse) throws JsonProcessingException;

}