package com.pwr.programming_web.product;

import com.pwr.programming_web.product.dto.ProductCreationDTO;
import com.pwr.programming_web.product.dto.ProductDTO;
import com.pwr.programming_web.product_category.ProductCategoryRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final ProductCategoryRepository productCategoryRepository;

    public ProductService(ProductRepository productRepository, ProductMapper productMapper, ProductCategoryRepository productCategoryRepository) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
        this.productCategoryRepository = productCategoryRepository;
    }

    public ResponseEntity<?> getAllProducts() {
        List<ProductDTO> products = productRepository.findAll()
                .stream()
                .map(productMapper::toProductDTO)
                .toList();

        return ResponseEntity.ok(products);
    }

    public ResponseEntity<?> getProductById(Integer id) {
        Product product = productRepository.getReferenceById(id);
        return ResponseEntity.ok(productMapper.toProductDTO(product));
    }

    public ResponseEntity<?> addProduct(ProductCreationDTO dto) {
        Product product = productMapper.toProduct(dto);
        productRepository.save(product);

        ProductDTO productDTO = productMapper.toProductDTO(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(productDTO);
    }

    public ResponseEntity<?> updateProduct(Integer id, ProductCreationDTO dto) {
        Product product = productRepository.getReferenceById(id);

        product.setName(dto.name());
        product.setWeight(dto.weight());
        product.setPrice(dto.price());
        product.setCategory(productCategoryRepository.getReferenceById(dto.category()));

        productRepository.save(product);

        return ResponseEntity.ok(productMapper.toProductDTO(product));

    }

    public ResponseEntity<?> deleteProductById(Integer id) {
        productRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
