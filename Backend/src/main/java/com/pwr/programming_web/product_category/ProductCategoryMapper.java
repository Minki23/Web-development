package com.pwr.programming_web.product_category;

import com.pwr.programming_web.product_category.dto.ProductCategoryCreationDTO;
import com.pwr.programming_web.product_category.dto.ProductCategoryDTO;
import org.springframework.stereotype.Service;

@Service
public class ProductCategoryMapper {

    public ProductCategory toProductCategory(ProductCategoryCreationDTO dto) {
        return ProductCategory.builder()
                .name(dto.name())
                .code(dto.code())
                .build();
    }

    public ProductCategoryDTO toProductCategoryDTO(ProductCategory productCategory) {
        return new ProductCategoryDTO(
                productCategory.getId(),
                productCategory.getName(),
                productCategory.getCode()
        );
    }
}
