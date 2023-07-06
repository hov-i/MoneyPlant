package com.MoneyPlant.service;

import com.MoneyPlant.entity.OAuthToken;
import com.MoneyPlant.repository.OAuthTokenRepository;
import com.MoneyPlant.repository.UserRepository;
import com.MoneyPlant.service.jwt.UserDetailsImpl;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Collections;

@Service
@RequiredArgsConstructor
public class GoogleCalendarService {

    private static final String GOOGLE_CALENDAR_API_URL = "https://www.googleapis.com/calendar/v3/users/me/calendarList";
    private final OAuthTokenRepository oAuthTokenRepository;
    private final UserRepository userRepository;

    // calendarID 가져오기
    public String getDefaultCalendarId(UserDetailsImpl userDetails) {
        System.out.println("getDefaultCalendatId 실행");
        Long userId = userDetails.getId();
        System.out.println("userDetails.getId() : " + userId);
        // 유저아이디로 accessToken 가져오기
        OAuthToken oAuthToken = oAuthTokenRepository.findByUser(userRepository.findById(userId).get()).get();

        String accessToken = oAuthToken.getAccessToken();
        System.out.println("accessToken : " + accessToken);
        RestTemplate restTemplate = new RestTemplate();
        ObjectMapper objectMapper = new ObjectMapper();

        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.setBearerAuth(accessToken);

        URI uri = UriComponentsBuilder.fromHttpUrl(GOOGLE_CALENDAR_API_URL).build().toUri();
        RequestEntity<MultiValueMap<String, String>> requestEntity = new RequestEntity<>(headers, HttpMethod.GET, uri);

        ResponseEntity<String> responseEntity = restTemplate.exchange(requestEntity, String.class);

        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            String responseBody = responseEntity.getBody();
            System.out.println("responseBody : " + responseBody);

            try {
                JsonNode responseJson = objectMapper.readTree(responseBody);
                System.out.println("responseJson : " + responseJson);
                JsonNode calendarsJson = responseJson.get("items");
                System.out.println("calendarsJson : " + calendarsJson);

                for (JsonNode calendarJson : calendarsJson) {
                    if (calendarJson.has("primary")) {
                        boolean isPrimary = calendarJson.get("primary").asBoolean();
                        System.out.println("isPrimary: " + isPrimary);
                        System.out.println("id: " + calendarJson.get("id").asText());

                        if (isPrimary) {
                            String calendarId = calendarJson.get("id").asText();
                            System.out.println("calendarId: " + calendarId);
                            return calendarId; // Return the default calendar ID
                        }
                    }
                }
                // No default calendar found
                return null;
            } catch (Exception e) {
                // Handle JSON parsing exception
                // ...
                return null;
            }
        } else {
            // Handle the error response
            // ...
            return null; // Return null or throw an exception
        }
    }
}
