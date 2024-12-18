package com.pwr.programming_web.product.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;

public record ProductCreationDTO(
        @NotBlank
        String name,
        @PositiveOrZero
        Double weight,
        @PositiveOrZero
        Double price,
        Integer category
) {
}

