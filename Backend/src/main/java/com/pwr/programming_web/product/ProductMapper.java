package com.pwr.programming_web.product;

import com.pwr.programming_web.product.dto.ProductCreationDTO;
import com.pwr.programming_web.product.dto.ProductDTO;
import com.pwr.programming_web.product_category.ProductCategoryRepository;
import org.springframework.stereotype.Service;

@Service
public class ProductMapper {

    private final ProductCategoryRepository productCategoryRepository;

    public ProductMapper(ProductCategoryRepository productCategoryRepository) {
        this.productCategoryRepository = productCategoryRepository;
    }

    public Product toProduct(ProductCreationDTO dto) {
        return Product.builder()
                .name(dto.name())
                .price(dto.price())
                .weight(dto.weight())
                .category(productCategoryRepository.getReferenceById(dto.category()))
                .build();
    }

    public ProductDTO toProductDTO(Product product) {
        return new ProductDTO(
                product.getId(),
                product.getName(),
                product.getWeight(),
                product.getPrice(),
                product.getCategory().getName()
        );
    }
}
