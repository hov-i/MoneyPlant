package com.MoneyPlant.service;

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
     private final JavaMailSender mailSender;

    @Override
    public String makeCode(int size) {
        Random ran = new Random();
        StringBuilder sb = new StringBuilder();
        int num;
        do {
            num = ran.nextInt(75) + 48;
            if ((num <= 57) || (num >= 65 && num <= 90) || (num >= 97)) {
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

}
