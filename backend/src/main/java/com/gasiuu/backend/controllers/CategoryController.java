package com.gasiuu.backend.controllers;

import com.gasiuu.backend.domain.dto.CategoryDto;
import com.gasiuu.backend.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/adminuser/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping("/create")
    public ResponseEntity<CategoryDto> createCategory(Authentication authentication, @RequestBody CategoryDto categoryDto) {
        String userEmail = authentication.getName();
        CategoryDto createdCategory = categoryService.createCategory(userEmail, categoryDto);
        return ResponseEntity.ok(createdCategory);
    }

    @GetMapping("/get-all-categories")
    public ResponseEntity<List<CategoryDto>> getAllCategories(Authentication authentication) {
        String userEmail = authentication.getName();
        List<CategoryDto> categories = categoryService.getAllCategoriesByUser(userEmail);
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryDto> getCategoryById(@PathVariable Integer id, Authentication authentication) {
        String userEmail = authentication.getName();
        CategoryDto category = categoryService.getCategoryById(id, userEmail);
        return ResponseEntity.ok(category);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<CategoryDto> updateCategory(@PathVariable Integer id, Authentication authentication, @RequestBody CategoryDto categoryDto) {
        String userEmail = authentication.getName();
        CategoryDto updatedCategory = categoryService.updateCategory(id, userEmail, categoryDto);
        return ResponseEntity.ok(updatedCategory);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Integer id, Authentication authentication) {
        String userEmail = authentication.getName();
        categoryService.deleteCategory(id, userEmail);
        return ResponseEntity.noContent().build();
    }
}
