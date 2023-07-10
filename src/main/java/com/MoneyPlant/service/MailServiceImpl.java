package com.MoneyPlant.service;

import com.MoneyPlant.entity.User;
import com.MoneyPlant.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;
import java.util.Random;




@Service
@Transactional
@RequiredArgsConstructor
public class MailServiceImpl implements MailService {
    private final UserRepository userRepository;
    private final JavaMailSender mailSender;

    @Override
    public String makeCode(int size) {
        Random ran = new Random();
        StringBuffer sb = new StringBuffer();
        int num = 0;
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
    public String makeHtml(String type, String code) {
        String html = null;
        switch(type) {
            case "findPw":
                html = "변경된 비밀번호는"+code+"입니다.";
                break;
        }
        return html;
    }

    @Override
    public String sendMail(String type, String email) {
        //타입에 따라
        //1. 인증코드 만들기
        //2. html string만들기
        String code = null, html = null, subject = null;
        switch(type) {
            case "findPw":
                code = makeCode(10);
                html = makeHtml(type, code);
                subject = "MoneyPlan:T에서 변경된 비밀번호를 보냅니다.";
                break;
        }

        //공통 - 메일보내기
        MimeMessage mail = mailSender.createMimeMessage();
        try {
            mail.setSubject(subject,"utf-8");
            mail.setText(html,"utf-8","html");
            mail.addRecipient(MimeMessage.RecipientType.TO, new InternetAddress(email));
            mailSender.send(mail);
        } catch (MessagingException e) {
            e.printStackTrace();
            return "error";
        }

        return code;
    }

    // 이메일이랑 생성 코드를 일치시킨 후 PW를 주입
    public boolean updatePwd(String email, String code) {
        try {
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

            // 비밀번호 수정
            user.setPassword(code);

            userRepository.save(user); // 수정된 사용자 정보 저장
            return true;
        } catch (Exception e) {
            System.err.println("비밀번호 변경 실패: " + e.getMessage());
            return false;
        }
    }

}
