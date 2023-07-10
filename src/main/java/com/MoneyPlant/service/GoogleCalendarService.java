package com.MoneyPlant.service;

import com.MoneyPlant.dto.EventDto;
import com.MoneyPlant.dto.GoogleOAuthToken;
import com.MoneyPlant.entity.OAuthToken;
import com.MoneyPlant.entity.User;
import com.MoneyPlant.repository.OAuthTokenRepository;
import com.MoneyPlant.repository.UserRepository;
import com.MoneyPlant.service.jwt.UserDetailsImpl;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;


import javax.transaction.Transactional;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class GoogleCalendarService {

    private static final String GOOGLE_CALENDAR_API_URL = "https://www.googleapis.com/calendar/v3";
    private final OAuthTokenRepository oAuthTokenRepository;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;

    // calendarID 가져오기
    public String getDefaultCalendarId(GoogleOAuthToken googleOAuthToken) {
        System.out.println("getDefaultCalendatId 실행");
        String accessToken = googleOAuthToken.getAccess_token();
        System.out.println("accessToken : " + accessToken);
        RestTemplate restTemplate = new RestTemplate();
        ObjectMapper objectMapper = new ObjectMapper();

        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.setBearerAuth(accessToken);

        URI uri = UriComponentsBuilder.fromHttpUrl(GOOGLE_CALENDAR_API_URL + "/users/me/calendarList")
                .build().toUri();
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

    // events 조회
    public List<EventDto> getGoogleCalendarEvents(UserDetailsImpl userDetails) {
        try {
            User user = userRepository.findById(userDetails.getId())
                    .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
            String calendarId = user.getGoogleCalendarId();
            System.out.println("CalendarId : " + calendarId);

            // 토큰 없을 만료되었을때 다시 갱신하는것 필요
            OAuthToken oAuthToken = oAuthTokenRepository.findByUser(user)
                    .orElseThrow(() -> new RuntimeException("토큰이 존재하지 않습니다."));
            String accessToken = oAuthToken.getAccessToken();
            if (calendarId != null && accessToken != null) {
                RestTemplate restTemplate = new RestTemplate();
                HttpHeaders headers = new HttpHeaders();
                headers.setBearerAuth(accessToken);

                URI uri = UriComponentsBuilder.fromHttpUrl(GOOGLE_CALENDAR_API_URL + "/calendars/" + calendarId + "/events")
                        .build().toUri();
                RequestEntity<Void> requestEntity = new RequestEntity<>(headers, HttpMethod.GET, uri);

                ResponseEntity<String> responseEntity = restTemplate.exchange(requestEntity, String.class);
                if (responseEntity.getStatusCode().is2xxSuccessful()) {
                    String responseBody = responseEntity.getBody();
                    try {
                        JsonNode responseJson = objectMapper.readTree(responseBody);
                        JsonNode itemsJson = responseJson.get("items");

                        List<EventDto> eventList = new ArrayList<>();
                        System.out.println(itemsJson);
                        for (JsonNode itemJson : itemsJson) {
                            if ( // Exclude recurring events
                                    !itemJson.has("recurrence") &&
                                            !itemJson.has("recurringEventId") &&
                                            itemJson.has("summary"))
                            {
                                String eventId = itemJson.get("id").asText();
                                System.out.println("id : " + eventId);
                                String summary = itemJson.get("summary").asText();
                                System.out.println("summary : " + summary);
                                JsonNode startNode = itemJson.get("start");
                                String startDateTime;
                                String endDateTime;
                                if (startNode.has("dateTime")) {
                                    startDateTime = startNode.get("dateTime").asText();
                                    endDateTime = itemJson.get("end").get("dateTime").asText();
                                } else if (startNode.has("date")) {
                                    startDateTime = startNode.get("date").asText();
                                    endDateTime = itemJson.get("end").get("date").asText();
                                } else {
                                    // Handle the case when neither "dateTime" nor "date" is present
                                    startDateTime = null; // Or set a default value
                                    endDateTime = null;
                                }
                                String updateAt = itemJson.get("updated").asText();
                                System.out.println("start : " + startDateTime);
                                System.out.println("end : " + endDateTime);

                                EventDto eventDTO = new EventDto(eventId, summary, startDateTime, endDateTime);
                                eventList.add(eventDTO);
                            }
                        }

                        return eventList;
                    } catch (Exception e) {
                        // Handle JSON parsing exception
                        e.printStackTrace();
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ArrayList<>(); // Return empty list if there's an error or no events found
    }

    // events 생성 후 eventId를 반환
//    public String insertGoogleCalendarEvent(EventDto eventDto, UserDetailsImpl userDetails) {
//        try {
//            User user = userRepository.findById(userDetails.getId())
//                    .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
//            String calendarId = user.getGoogleCalendarId();
//            System.out.println("CalendarId: " + calendarId);
//
//            OAuthToken oAuthToken = oAuthTokenRepository.findByUser(user)
//                    .orElseThrow(() -> new RuntimeException("토큰이 존재하지 않습니다."));
//            String accessToken = oAuthToken.getAccessToken();
//            if (calendarId != null && accessToken != null) {
//                RestTemplate restTemplate = new RestTemplate();
//                HttpHeaders headers = new HttpHeaders();
//                headers.setContentType(MediaType.APPLICATION_JSON);
//                headers.setBearerAuth(accessToken);
//
//                URI uri = UriComponentsBuilder.fromHttpUrl(GOOGLE_CALENDAR_API_URL + "/calendars/" + calendarId + "/events")
//                        .build().toUri();
//
//                // Create the request body with the new event details
//                JsonNodeFactory jsonFactory = JsonNodeFactory.instance;
//                ObjectNode requestBody = jsonFactory.objectNode();
//                ObjectNode startDateTime = jsonFactory.objectNode();
//                ObjectNode endDateTime = jsonFactory.objectNode();
//
//                startDateTime.put("dateTime", eventDto.getStartDateTime().toString());
//                startDateTime.put("timeZone", "UTC");
//
//                endDateTime.put("dateTime", eventDto.getEndDateTime().toString());
//                endDateTime.put("timeZone", "UTC");
//
//                requestBody.put("summary", eventDto.getSummary());
//                requestBody.set("start", startDateTime);
//                requestBody.set("end", endDateTime);
//
//                HttpEntity<String> requestEntity = new HttpEntity<>(requestBody.toString(), headers);
//
//                ResponseEntity<String> responseEntity = restTemplate.exchange(uri, HttpMethod.POST, requestEntity, String.class);
//                if (responseEntity.getStatusCode().is2xxSuccessful()) {
//                    String responseBody = responseEntity.getBody();
//                    JsonNode responseJson = objectMapper.readTree(responseBody);
//                    return responseJson.get("id").asText(); // Return the eventId
//                } else {
//                    System.out.println("Failed to insert event. Status code: " + responseEntity.getStatusCode());
//                }
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//
//        return null; // Return null if event insertion failed
//    }

    // events 수정 (eventId값을 받아야함)
    public void updateGoogleCalendar(String eventId) {

    }
    // events 삭제

    // events
}