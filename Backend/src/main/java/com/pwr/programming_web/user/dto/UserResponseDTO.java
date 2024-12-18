package com.pwr.programming_web.user.dto;

public record UserResponseDTO(
        String firstname,
        String lastname,
        String email,
        String role
) {
}
