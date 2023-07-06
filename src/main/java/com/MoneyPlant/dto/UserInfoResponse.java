package com.MoneyPlant.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Getter
@AllArgsConstructor
@Setter
public class UserInfoResponse {
    private Long id;
    private String name;
    private String email;
    private String role;
}