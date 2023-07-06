package com.MoneyPlant.entity;

import com.MoneyPlant.dto.GoogleOAuthToken;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "oauth_token")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OAuthToken {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Column(name = "access_token")
    private String accessToken;

    @Column(name = "expire")
    private LocalDateTime expire;

    @Column(name = "refresh_token")
    private String refreshToken;

    // 무분별하게 Setter를 쓰지말자
    // access token 수정 시 사용
    public void updateOAuthToken (String accessToken, LocalDateTime expire) {
        this.accessToken = accessToken;
        this.expire = expire;
    }
}
