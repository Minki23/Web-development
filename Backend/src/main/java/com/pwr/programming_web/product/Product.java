package com.pwr.programming_web.product;

import com.pwr.programming_web.product_category.ProductCategory;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Product {
    @Id
    @GeneratedValue
    private Integer id;
    private String name;
    private Double weight;
    private Double price;
    @ManyToOne
    @JoinColumn(
        name = "category_id"
    )
    private ProductCategory category;
}
