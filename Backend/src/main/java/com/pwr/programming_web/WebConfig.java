package com.pwr.programming_web;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/v1/products")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "DELETE", "PUT")
                .allowedHeaders("*")
                .allowCredentials(true);
        registry.addMapping("/api/v1/products/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("DELETE");
        registry.addMapping("/api/v1/categories")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST");
        registry.addMapping("/api/v1/categories/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("DELETE");
        registry.addMapping("/api/v1/auth/authenticate")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "DELETE", "PUT")
                .allowCredentials(true);
        registry.addMapping("/api/v1/auth/register")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "DELETE", "PUT")
                .allowCredentials(true);

        registry.addMapping("/api/v1/products/")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "DELETE", "PUT", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }


}