package com.MoneyPlant.service;

import com.MoneyPlant.dto.*;
import com.MoneyPlant.entity.*;
import com.MoneyPlant.repository.*;
import com.MoneyPlant.service.jwt.UserDetailsImpl;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.time.LocalDate;
import java.util.*;
import javax.transaction.Transactional;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class CalendarService {
    private static final String GOOGLE_CALENDAR_API_URL = "https://www.googleapis.com/calendar/v3";
    private final UserRepository userRepository;
    private final ScheduleRepository scheduleRepository;
    private final WorkRepository workRepository;
    private final IncomeRepository incomeRepository;
    private final ExpenseRepository expenseRepository;
    private final CategoryRepository categoryRepository;
    private final CategoryIncomeRepository categoryIncomeRepository;
    private final OAuthTokenRepository oAuthTokenRepository;
    private final ObjectMapper objectMapper;

    // event ID 생성기
    // 구글 캘린더 아이디 넣으면 중복없는 eventId값 하나 만들어줌
    private String generateEventId(String calendarId) {
        Random random = new Random();
        final int minLength = 30;
        final int maxLength = 100;
        final String ALLOWED_CHARACTERS = "abcdefghijklmnopqrstuv0123456789";
        String eventId;

        do {
            int length = random.nextInt(maxLength - minLength + 1) + minLength;
            StringBuilder sb = new StringBuilder(length);
            for (int i = 0; i < length; i++) {
                int randomIndex = random.nextInt(ALLOWED_CHARACTERS.length());
                char randomChar = ALLOWED_CHARACTERS.charAt(randomIndex);
                sb.append(randomChar);
            }
            eventId = sb.toString();
            System.out.println("eventId존재하는가? : " + scheduleRepository.existsByGoogleCalendarIdAndEventId(calendarId, eventId));
        }
        while (scheduleRepository.existsByGoogleCalendarIdAndEventId(calendarId, eventId));
        return eventId;
    }

    // 캘린더 일정 생성
    public boolean createSchedule(ScheduleDto scheduleDto, UserDetailsImpl userDetails) {
        Long userId = userDetails.getId();
        System.out.println("userId : " + userId);
        String calendarId = userDetails.getGoogleCalendarId();

        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("존재하지 않는 유저입니다"));
            Schedule schedule = new Schedule();

            // If Google Calendar is linked, proceed with Google API
            if (calendarId != null) {
                String eventId = generateEventId(calendarId);
                System.out.println("eventId : " + eventId);

                OAuthToken oAuthToken = oAuthTokenRepository.findByUser(user)
                        .orElseThrow(() -> new RuntimeException("토큰이 존재 하지 않습니다"));
                String accessToken = oAuthToken.getAccessToken();
                System.out.println(accessToken);
                RestTemplate restTemplate = new RestTemplate();
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);
                headers.setBearerAuth(accessToken);

                String start = scheduleDto.getScDate();
                String end = LocalDate.parse(start).plusDays(1).toString();

                String url = GOOGLE_CALENDAR_API_URL + "/calendars/" + calendarId + "/events";
                String requestBody = "{\"id\":\"" + eventId +
                        "\",\"summary\":\"" + scheduleDto.getScName() +
                        "\",\"start\":{\"date\":\"" + start +
                        "\"},\"end\":{\"date\":\"" + end + "\"}}";

                HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);
                ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);

                if (responseEntity.getStatusCode().is2xxSuccessful()) {
                    schedule.setEventId(eventId);
                } else {
                    throw new RuntimeException("이벤트 생성 실패");
                }
            }
            System.out.println("여기까지");
            schedule.setUser(user);
            schedule.setGoogleCalendarId(calendarId);
            schedule.setScName(scheduleDto.getScName());
            schedule.setScDate(scheduleDto.getScDate());
            schedule.setScBudget(scheduleDto.getScBudget());
            schedule.setColorId(scheduleDto.getColorId());

            scheduleRepository.save(schedule);

            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    // 마이페이지 나의 일정 가져와서 등록하기 (이건 프론트에서 마이페이지에서 고를 시 색이랑 이름을 채워주는 거 아닌가요)
    // 그러면 기능은 같으니까 생성하기 사용하면 될 듯합니다.

    // 캘린더 일정 수정 (입력값 scheduleRequest)
    public boolean updateSchedule(ScheduleDto scheduleDto, UserDetailsImpl userDetails) {
        Long userId = userDetails.getId();
        String calendarId = userDetails.getGoogleCalendarId();
        Long scId = scheduleDto.getScId();

        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("존재하지 않는 유저입니다."));

            Schedule schedule = scheduleRepository.findByScId(scId);

            if (schedule == null) {
                throw new RuntimeException("존재하지 않는 일정입니다");
            }

            if (calendarId != null) {
                OAuthToken oAuthToken = oAuthTokenRepository.findByUser(user)
                        .orElseThrow(() -> new RuntimeException("토큰을 찾을 수 없습니다."));
                String accessToken = oAuthToken.getAccessToken();

                RestTemplate restTemplate = new RestTemplate();
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);
                headers.setBearerAuth(accessToken);

                String start = scheduleDto.getScDate();
                String end = LocalDate.parse(start).plusDays(1).toString();

                String url = GOOGLE_CALENDAR_API_URL + "/calendars/" + calendarId + "/events/" + schedule.getEventId();
                System.out.println(url);
                String requestBody = "{\"summary\":\"" + scheduleDto.getScName() +
                        "\",\"start\":{\"date\":\"" + start +
                        "\"},\"end\":{\"date\":\"" + end + "\"}}";

                HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);
                ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.PUT, requestEntity, String.class);

                if (!responseEntity.getStatusCode().is2xxSuccessful()) {
                    throw new RuntimeException("업데이트 실패");
                }
            }

            schedule.setColorId(scheduleDto.getColorId());
            schedule.setScName(scheduleDto.getScName());
            schedule.setScBudget(scheduleDto.getScBudget());
            schedule.setScDate(scheduleDto.getScDate());

            scheduleRepository.save(schedule);

            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    // 캘린더 일정 삭제
    public boolean deleteSchedule(Long scId, UserDetailsImpl userDetails) {
        Long userId = userDetails.getId();

        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("존재하지 않는 유저입니다."));
            Schedule schedule = scheduleRepository.findByScId(scId);
            String eventId = schedule.getEventId();

            // Request deletion from Google Calendar
            if (eventId != null) {
                String calendarId = schedule.getGoogleCalendarId();
                OAuthToken oAuthToken = oAuthTokenRepository.findByUser(user)
                        .orElseThrow(() -> new RuntimeException("토큰을 찾을 수 없습니다."));
                String accessToken = oAuthToken.getAccessToken();

                RestTemplate restTemplate = new RestTemplate();
                HttpHeaders headers = new HttpHeaders();
                headers.setBearerAuth(accessToken);

                String url = GOOGLE_CALENDAR_API_URL + "/calendars/" + calendarId + "/events/" + eventId;

                HttpEntity<String> requestEntity = new HttpEntity<>(headers);
                ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.DELETE, requestEntity, String.class);

                if (!responseEntity.getStatusCode().is2xxSuccessful()) {
                    throw new RuntimeException("Failed to delete event");
                }
            }

            // Delete the schedule from the database
            scheduleRepository.deleteByScId(scId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    // GoogleCalendar events 조회후 DB에 추가 또는 업데이트
    public void getGoogleCalendarEvents(UserDetailsImpl userDetails) {
        try {
            User user = userRepository.findById(userDetails.getId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            String calendarId = user.getGoogleCalendarId();
            System.out.println("CalendarId : " + calendarId);

            OAuthToken oAuthToken = oAuthTokenRepository.findByUser(user)
                    .orElseThrow(() -> new RuntimeException("Token does not exist"));
            String accessToken = oAuthToken.getAccessToken();
            if (calendarId == null || accessToken == null) {
                return; // Exit early if calendarId or accessToken is null
            }

            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(accessToken);

            URI uri = UriComponentsBuilder.fromHttpUrl(GOOGLE_CALENDAR_API_URL + "/calendars/" + calendarId + "/events")
                    .build().toUri();
            RequestEntity<Void> requestEntity = new RequestEntity<>(headers, HttpMethod.GET, uri);

            ResponseEntity<String> responseEntity = restTemplate.exchange(requestEntity, String.class);
            if (!responseEntity.getStatusCode().is2xxSuccessful()) {
                return; // Exit early if response is not successful
            }

            String responseBody = responseEntity.getBody();
            System.out.println(responseBody);

            try {
                JsonNode responseJson = objectMapper.readTree(responseBody);
                JsonNode itemsJson = responseJson.get("items");
                System.out.println(itemsJson);
                for (JsonNode itemJson : itemsJson) {
                    if (isEventValid(itemJson)) {
                        String eventId = itemJson.get("id").asText();
                        System.out.println("id : " + eventId);
                        Schedule schedule = getOrCreateSchedule(calendarId, eventId, user);

                        String summary = itemJson.get("summary").asText();
                        System.out.println("summary : " + summary);
                        schedule.setScName(summary);

                        String startDateTime = getDateTimeValue(itemJson, "start");
                        String endDateTime = getDateTimeValue(itemJson, "end");
                        System.out.println("start : " + startDateTime);
                        System.out.println("end : " + endDateTime);
                        schedule.setScDate(startDateTime);

                        scheduleRepository.save(schedule);
                    }
                }
            } catch (Exception e) {
                // Handle JSON parsing exception
                e.printStackTrace();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private boolean isEventValid(JsonNode itemJson) {
        return !itemJson.has("recurrence") &&
                !itemJson.has("recurringEventId") &&
                itemJson.has("summary");
    }

    private Schedule getOrCreateSchedule(String calendarId, String eventId, User user) {
        Schedule schedule = scheduleRepository.findByGoogleCalendarIdAndEventId(calendarId, eventId);
        if (schedule == null) {
            schedule = new Schedule();
            schedule.setUser(user);
            schedule.setGoogleCalendarId(calendarId);
            schedule.setColorId(1);
            schedule.setEventId(eventId);
        }
        return schedule;
    }

    private String getDateTimeValue(JsonNode itemJson, String field) {
        JsonNode node = itemJson.get(field);
        if (node.has("dateTime")) {
            return node.get("dateTime").asText();
        } else if (node.has("date")) {
            return node.get("date").asText();
        } else {
            return null; // Or set a default value
        }
    }


    // 캘린더 근무 생성
    public boolean createWork(WorkDto workDto, UserDetailsImpl userDetails) {
        try {
            Long userId = userDetails.getId();
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

            Work work = new Work();
            work.setUser(user);
            work.setWorkName(workDto.getWorkName());
            work.setColorId(workDto.getColorId());
            work.setPayType(workDto.getPayType());
            work.setWorkDate(workDto.getWorkDate());
            work.setWorkStart(workDto.getWorkStart());
            work.setWorkEnd(workDto.getWorkEnd());
            work.setWorkPay(calMyHourlySalary(workDto));
            work.setPayday(workDto.getPayday());

            workRepository.save(work);
            return true;
        } catch (Exception e) {
            e.printStackTrace();

            return false;
        }
    }

    public int calMyHourlySalary(WorkDto workDto) {
        int type = workDto.getPayType();
        int money = workDto.getWorkMoney();
        String stTime = workDto.getWorkStart();
        String endTime = workDto.getWorkEnd();
        int caseCnt = workDto.getWorkCase();
        int restTime = workDto.getWorkRest();
        double tax = 1 - (workDto.getWorkTax() / 100);
        int pay;

        if (type == 1) {
            String[] stTimeParts = stTime.split(":");
            int stHourToMin = Integer.parseInt(stTimeParts[0]) * 60;
            int stMinutes = Integer.parseInt(stTimeParts[1]);

            String[] endTimeParts = endTime.split(":");
            int endHourToMin = Integer.parseInt(endTimeParts[0]) * 60;
            int endMinutes = Integer.parseInt(endTimeParts[1]);

            double totalHours = (endHourToMin + endMinutes - stHourToMin - stMinutes - restTime) / 60;

            pay = (int) Math.round((money * totalHours) * tax);
        } else if (type == 2) {
            pay = (int) (money * caseCnt * tax);
        } else pay = (int) (money * tax);

        return pay;
    }


    // ===========================================================================
    // 캘린더 전체 일정 조회 - 달력
    public List<ScheduleDto> getScheduleForCal(UserDetailsImpl userDetails) {
        getGoogleCalendarEvents(userDetails);
        Long userId = userDetails.getId();
        List<Schedule> scheduleList = scheduleRepository.findByUserId(userId);

        List<ScheduleDto> scheduleDtos = new ArrayList<>();
        for (Schedule schedule : scheduleList) {
            ScheduleDto scheduleDto = new ScheduleDto();

            // 조회 내용 : 일정 날짜, 일정 이름, 일정 색
            scheduleDto.setScName(schedule.getScName());
            scheduleDto.setScDate(schedule.getScDate());
            scheduleDto.setScBudget(schedule.getScBudget());
            scheduleDto.setColorId(schedule.getColorId());

            scheduleDtos.add(scheduleDto);
        }
        return scheduleDtos;
    }


    // 캘린더 전체 근무 조회 - 달력
    public List<WorkDto> getWorkForCal(UserDetailsImpl userDetails) {
        Long userId = userDetails.getId();
        List<Work> workList = workRepository.findByUserId(userId);

        List<WorkDto> workDtoList = new ArrayList<>();
        for (Work work : workList) {
            WorkDto workDto = new WorkDto();

            // 조회 내용 :  근무 날짜, 근무 이름, 급여일, 근무 color, 급여
            work.setWorkName(workDto.getWorkName());
            work.setColorId(workDto.getColorId());
            work.setWorkDate(workDto.getWorkDate());
            work.setWorkPay(workDto.getWorkPay());
            work.setPayday(workDto.getPayday());

            workDtoList.add(workDto);
        }
        return workDtoList;
    }

    // 캘린더 전체 수입 합계 (daily Income) - 날짜, 수입 합계
    public Map<String, Integer> getDailyIncome(UserDetailsImpl userDetails) {
        Long userId = userDetails.getId();

        List<Income> incomeList = incomeRepository.findByUserId(userId);

        Map<String, Integer> dailyIncomeList = new LinkedHashMap<>();

        for (Income income : incomeList) {
            String incomeDate = income.getIncomeDate();
            int incomeAmount = income.getIncomeAmount();

            // 이미 해당 날짜의 합계가 계산되었는지 확인
            if (dailyIncomeList.containsKey(incomeDate)) {
                int currentTotal = dailyIncomeList.get(incomeDate);
                dailyIncomeList.put(incomeDate, currentTotal + incomeAmount);
            } else {
                dailyIncomeList.put(incomeDate, incomeAmount);
            }
        }

        return dailyIncomeList;
    }

    // 캘린더 전체 지출 합계 (daily Expense) - 날짜, 지출 합계
    public Map<String, Integer> getDailyExpense(UserDetailsImpl userDetails) {
        Long userId = userDetails.getId();

        List<Expense> expenseList = expenseRepository.findByUserId(userId);

        Map<String, Integer> dailyExpenseList = new LinkedHashMap<>();

        for (Expense expense : expenseList) {
            String expenseDate = expense.getExpenseDate();
            int expenseAmount = expense.getExpenseAmount();

            // 이미 해당 날짜의 합계가 계산되었는지 확인
            if (dailyExpenseList.containsKey(expenseDate)) {
                int currentTotal = dailyExpenseList.get(expenseDate);
                dailyExpenseList.put(expenseDate, currentTotal + expenseAmount);
            } else {
                dailyExpenseList.put(expenseDate, expenseAmount);
            }
        }

        return dailyExpenseList;
    }


    // 캘린더 전체 일정 조회 - 일별 상세
    public List<ScheduleDto> getScheduleForDetail(UserDetailsImpl userDetails) {
        Long userId = userDetails.getId();
        List<Schedule> scheduleList = scheduleRepository.findByUserId(userId);

        List<ScheduleDto> scheduleDtoList = new ArrayList<>();
        for (Schedule schedule : scheduleList) {
            ScheduleDto scheduleDto = new ScheduleDto();

            // 조회 내용 : 일정 날짜, 일정 이름, 일정 색, 일정 예산
            scheduleDto.setScDate(schedule.getScDate());
            scheduleDto.setScName(schedule.getScName());
            scheduleDto.setColorId(schedule.getColorId());
            scheduleDto.setScBudget(schedule.getScBudget());

            scheduleDtoList.add(scheduleDto);
        }
        return scheduleDtoList;
    }

    // 캘린더 전체 근무 조회 - 일별 상세
    public List<WorkDto> getWorkForDetail(UserDetailsImpl userDetails) {
        Long userId = userDetails.getId();
        List<Work> workList = workRepository.findByUserId(userId);

        List<WorkDto> workDtoList = new ArrayList<>();
        for (Work work : workList) {
            WorkDto workDto = new WorkDto();

            // 조회 내용 :  근무 날짜, 근무 이름, 근무 시간(시작, 종료), 급여일, 근무 color, 급여
            workDto.setWorkName(work.getWorkName());
            workDto.setColorId(work.getColorId());
            workDto.setWorkDate(work.getWorkDate());
            workDto.setWorkStart(work.getWorkStart());
            workDto.setWorkEnd(work.getWorkEnd());
            workDto.setWorkDate(work.getWorkDate());
            workDto.setWorkPay(work.getWorkPay());

            workDtoList.add(workDto);
        }
        return workDtoList;
    }

    // 캘린더 전체 수입 detail (daily Income) - 날짜, 개별 수입 내역
    public List<IncomeDto> getIncomeWithCategory(UserDetailsImpl userDetails) {
        Long userId = userDetails.getId();
        log.info("시용자 아이디 : " + userId);
        List<Income> incomeList = incomeRepository.findByUserId(userId);

        List<IncomeDto> incomeDtoList = new ArrayList<>();
        for (Income income : incomeList) {
            IncomeDto incomeDto = new IncomeDto();
            incomeDto.setIncomeId(income.getIncomeId());
            incomeDto.setIncomeAmount(income.getIncomeAmount());
            incomeDto.setIncomeDate(income.getIncomeDate());
            incomeDto.setIncomeContent(income.getIncomeContent());
            incomeDto.setCategoryIncomeId(income.getCategoryIncome().getCategoryIncomeId());
            incomeDto.setUserId(income.getUser().getId());

            String categoryIncomeName = categoryIncomeRepository.findByCategoryIncomeId(income.getCategoryIncome().getCategoryIncomeId()).getCategoryIncomeName();
            incomeDto.setCategoryIncomeName(categoryIncomeName);

            incomeDtoList.add(incomeDto);
        }

        return incomeDtoList;
    }

    // 캘린더 전체 지출 detail (daily Expense) - 날짜, 개별 지출 내역
    public List<ExpenseDto> getExpenseWithCategory(UserDetailsImpl userDetails) {
        Long userId = userDetails.getId();
        log.info("지출 사용자 아이디 : " + userId);
        List<Expense> expenseList = expenseRepository.findByUserId(userId);

        List<ExpenseDto> expenseDtoList = new ArrayList<>();
        for (Expense expense : expenseList) {
            ExpenseDto expenseDto = new ExpenseDto();
            expenseDto.setExpenseId(expense.getExpenseId());
            expenseDto.setExpenseAmount(expense.getExpenseAmount());
            expenseDto.setExpenseDate(expense.getExpenseDate());
            expenseDto.setExpenseContent(expense.getExpenseContent());
            expenseDto.setCategoryId(expense.getCategory().getCategoryId());
            expenseDto.setUserId(expense.getUser().getId());

            String categoryName = categoryRepository.findByCategoryId(expense.getCategory().getCategoryId()).getCategoryName();
            expenseDto.setCategoryName(categoryName);

            expenseDtoList.add(expenseDto);
        }

        return expenseDtoList;
    }


}
