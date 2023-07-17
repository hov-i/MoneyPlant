package com.MoneyPlant.service;
import com.MoneyPlant.entity.User;
import com.MoneyPlant.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Random;




@Service
@RequiredArgsConstructor
@Transactional
public class MailServiceImpl implements MailService {

    private final UserRepository userRepository;
    private final JavaMailSender mailSender;
    private final PasswordEncoder encoder;

    @Override
    public String makeCode(int size) {
        Random ran = new Random();
        StringBuffer sb = new StringBuffer();
        int num;
        do {
            num = ran.nextInt(75) + 48;
            if ((num >= 48 && num <= 57) || (num >= 65 && num <= 90) || (num >= 97 && num <= 122)) {
                sb.append((char) num);
            } else {
                continue;
            }
        } while (sb.length() < size);
        return sb.toString();
    }

    @Override
    public boolean sendMailAndUpdatePwd(String type, String email) {
        // 타입에 따라 인증코드 생성 및 HTML 문자열 생성 로직 작성
        String code = null, html = null, subject = null;
        switch(type) {
            case "findPw":
                code = makeCode(10);
                subject = "MoneyPlan:T에서 변경된 비밀번호를 전송했습니다.";
                break;
            // 다른 타입에 대한 처리 로직 필요시 추가
        }

        if ("findPw".equals(type)) {
            html = "변경된 비밀번호는 " + code + "입니다.";
            System.out.println("code 값: " + code); // code 변수의 값을 출력
        }
//        else {
//            // 다른 타입에 대한 HTML 문자열 생성 로직
//        }

        // 이메일 전송 로직 작성
        MimeMessage mail = mailSender.createMimeMessage();
        try {
            mail.setSubject(subject,"utf-8");
            mail.setText(html,"utf-8","html");
            mail.addRecipient(MimeMessage.RecipientType.TO, new InternetAddress(email));
            mailSender.send(mail);
        } catch (MessagingException e) {
            e.printStackTrace();
            return false; // 이메일 전송 실패 시 false 반환
        }

        // 비밀번호 변경 로직 작성
        try {
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

            System.out.println("code 값: " + code);

            // 비밀번호 수정
            encoder.encode(code);
            user.setPassword(encoder.encode(code));


            userRepository.save(user); // 수정된 사용자 정보 저장
            return true; // 비밀번호 변경 성공 시 true 반환

        } catch (Exception e) {
            System.err.println("비밀번호 변경 실패: " + e.getMessage());
            return false; // 비밀번호 변경 실패 시 false 반환
        }
    }

}
