package com.MoneyPlant.controller;


import com.MoneyPlant.repository.OAuthTokenRepository;
import com.MoneyPlant.repository.UserRepository;
import com.MoneyPlant.service.GoogleCalendarService;
import com.MoneyPlant.service.jwt.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/google/calendar")
// CalendarController 와 통합예정
public class GoogleCalendarController {

    private final GoogleCalendarService googleCalendarService;
    private final OAuthTokenRepository oAuthTokenRepository;
    private final UserRepository userRepository;





//    @GetMapping("")
//    public ResponseEntity<?> getCalendarID(@AuthenticationPrincipal UserDetailsImpl userDetails) throws IllegalAccessException {
//        String calendarId = googleCalendarService.getDefaultCalendarId(userDetails);
//        System.out.println("calendarId : " + calendarId);
//        return ResponseEntity.ok().body(calendarId);
//    }

//    @GetMapping("/events")
//    public ResponseEntity<?> getEvents(@AuthenticationPrincipal UserDetailsImpl userDetails) throws IllegalAccessException {
//        System.out.println("getEvents실행 ");
//        return googleCalendarService.getGoogleCalendarEvents(userDetails);
//    }
}
