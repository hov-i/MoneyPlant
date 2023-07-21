package com.MoneyPlant.dto;


import com.MoneyPlant.entity.OAuthToken;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Data
public class GoogleOAuthToken {
    private String access_token;
    private int expires_in;
    private String refresh_token;
    private String scope;
    private String token_type;
    private String id_token;


    public static GoogleOAuthToken fromOAuthToken(OAuthToken oAuthToken) {
        GoogleOAuthToken googleOAuthToken = new GoogleOAuthToken();
        googleOAuthToken.setAccess_token(oAuthToken.getAccessToken());
        googleOAuthToken.setRefresh_token(oAuthToken.getRefreshToken());

        return googleOAuthToken;
    }
}