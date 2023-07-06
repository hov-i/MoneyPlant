package com.MoneyPlant.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;

import javax.validation.constraints.*;

@Getter
@Setter
public class SignupRequest {
    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @NotBlank
    @Size(min = 3, max = 20)
    private String name;

    private String role;

    @NotBlank
    @Size(min = 6, max = 40)
    private String password;
}