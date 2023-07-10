package com.MoneyPlant.service.jwt;

import com.MoneyPlant.entity.User;
import org.springframework.security.core.userdetails.UserDetails;


import java.util.Collection;
import java.util.Collections;
import java.util.Objects;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import com.fasterxml.jackson.annotation.JsonIgnore;


// UserDetails 는 Spring Security 에서 사용자의 정보를 담는 인터페이스 입니다.
// Spring Security와의 통합: UserDetails는 사용자 세부 정보를 나타내기 위해
// Spring Security에서 기대하는 표준 인터페이스입니다. 사용자 정보를 캡슐화하고
// 이를 Spring Security 프레임워크와 통합하는 표준화된 방법을 제공합니다.
//보안 관련 기능: 'UserDetails'에는 사용자의 사용자 이름, 암호, 권한/역할 및 계정 상태
// (예: 계정이 활성화되었는지 또는 잠겨 있는지 여부)와 같은 필수 정보가 포함됩니다.
// Spring Security에서 수행하는 인증 및 권한 검사에 필요한 데이터를 제공하도록 설계되었습니다.
//사용자 지정 및 확장: UserDetails 또는 UserDetailsImpl과 같은 사용자 지정 UserDetails
// 구현을 구현하여 애플리케이션의 보안 요구 사항에 특정한 추가 필드 또는 메서드를 포함하도록 기능을 확장할 수 있습니다. 이렇게 하면 인증 및 권한 부여와 관련된 사용자 지정 논리 또는 특성을 추가할 수 있습니다.

public class UserDetailsImpl implements UserDetails {
    private static final long serialVersionUID = 1L;

    private Long id;

    private String name;

    private String email;

    private String googleCalendarId;

    @JsonIgnore
    private String password;

    private GrantedAuthority authority;

    public UserDetailsImpl(Long id, String name, String email, String password, String googleCalendarId,
                           GrantedAuthority authority) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.googleCalendarId = googleCalendarId;
        this.authority = authority;
    }

    public static UserDetailsImpl build(User user) {
        GrantedAuthority authority = new SimpleGrantedAuthority(user.getRole().getName().name());


        return new UserDetailsImpl(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPassword(),
                user.getGoogleCalendarId(),
                authority
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(authority);
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getName() { return name; }

    public String getGoogleCalendarId() { return googleCalendarId; }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        UserDetailsImpl user = (UserDetailsImpl) o;
        return Objects.equals(id, user.id);
    }
}