package com.MoneyPlant.service;

public interface MailService {
    String makeCode(int size);
    boolean sendMailAndUpdatePwd(String type, String email);
}
