package com.MoneyPlant.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("https://www.moneyplan.today"); // Update this to restrict allowed origins if needed
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        // Add customizations if needed, e.g., exposed headers, allowed request headers, etc.
        // config.setExposedHeaders(Arrays.asList("header1", "header2"));
        // config.setAllowedHeaders(Arrays.asList("header1", "header2"));

        return new CorsFilter(source);
    }
}

