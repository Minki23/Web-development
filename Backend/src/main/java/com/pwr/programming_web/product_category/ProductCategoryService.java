package com.pwr.programming_web.product_category;

import com.pwr.programming_web.product_category.dto.ProductCategoryCreationDTO;
import com.pwr.programming_web.product_category.dto.ProductCategoryDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductCategoryService {
    private final ProductCategoryRepository productCategoryRepository;
    private final ProductCategoryMapper productCategoryMapper;

    public ProductCategoryService(ProductCategoryRepository productCategoryRepository, ProductCategoryMapper productCategoryMapper) {
        this.productCategoryRepository = productCategoryRepository;
        this.productCategoryMapper = productCategoryMapper;
    }

    public ResponseEntity<?> getAllProductCategories() {
        List<ProductCategoryDTO> productCategories = productCategoryRepository
                .findAll()
                .stream()
                .map(productCategoryMapper::toProductCategoryDTO)
                .toList();

        return ResponseEntity.ok(productCategories);
    }

    public ResponseEntity<?> getProductCategoryById(Integer id) {
        ProductCategory productCategory = productCategoryRepository.findById(id).orElse(null);
        if (productCategory == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(productCategoryMapper.toProductCategoryDTO(productCategory));
    }

    public ResponseEntity<?> addProductCategory(ProductCategoryCreationDTO dto) {
        ProductCategory productCategory = productCategoryMapper.toProductCategory(dto);
        productCategoryRepository.save(productCategory);

        ProductCategoryDTO productCategoryDTO = productCategoryMapper.toProductCategoryDTO(productCategory);
        return ResponseEntity.status(HttpStatus.CREATED).body(productCategoryDTO);
    }

    public ResponseEntity<?> updateProductCategory(Integer id, ProductCategoryCreationDTO dto) {
        ProductCategory productCategory = productCategoryRepository.findById(id).orElse(null);

        if (productCategory == null) {
            return ResponseEntity.badRequest().body("Wrong category id");
        }

        productCategory.setName(dto.name());
        productCategory.setCode(dto.code());

        productCategoryRepository.save(productCategory);

        return ResponseEntity.ok(productCategoryMapper.toProductCategoryDTO(productCategory));
    }

    public ResponseEntity<?> deleteProductCategoryById(Integer id) {
        productCategoryRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
