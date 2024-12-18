package com.pwr.programming_web.product.dto;

public record ProductDTO(
        Integer id,
        String name,
        Double weight,
        Double price,
        String category
) {
}
