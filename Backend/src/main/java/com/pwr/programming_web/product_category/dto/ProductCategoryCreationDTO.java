package com.pwr.programming_web.product_category.dto;

import jakarta.validation.constraints.NotBlank;

public record ProductCategoryCreationDTO(
        @NotBlank
        String name,
        @NotBlank
        String code
) {
}
