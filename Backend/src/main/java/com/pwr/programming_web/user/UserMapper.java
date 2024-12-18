package com.pwr.programming_web.user;


import com.pwr.programming_web.user.dto.UserCreationDTO;
import com.pwr.programming_web.user.dto.UserResponseDTO;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserMapper {
    private final PasswordEncoder passwordEncoder;

    public UserMapper(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public User toUser(UserCreationDTO dto) {
        return User.builder()
                .firstname(dto.firstname())
                .lastname(dto.lastname())
                .email(dto.email())
                .password(passwordEncoder.encode(dto.password()))
                .role(Role.valueOf(dto.role()))
                .build();
    }

    public UserResponseDTO toUserResponseDTO(User user) {
        return new UserResponseDTO(
                user.getFirstname(),
                user.getLastname(),
                user.getEmail(),
                user.getRole().name()
        );
    }

    public List<UserResponseDTO> toUserResponseDTO(List<User> users) {
        return users.stream()
                .map(this::toUserResponseDTO)
                .toList();
    }
}
