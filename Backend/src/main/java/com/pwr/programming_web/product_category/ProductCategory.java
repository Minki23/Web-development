package com.pwr.programming_web.product_category;

import com.pwr.programming_web.product.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ProductCategory {
    @Id
    @GeneratedValue
    private Integer id;
    private String name;
    @Column(
            unique = true
    )
    private String code;
    @OneToMany(
            mappedBy = "category",
            cascade = CascadeType.ALL
    )
    private List<Product> products;
}
