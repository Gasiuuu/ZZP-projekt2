package com.gasiuu.backend.services;

import com.gasiuu.backend.domain.dto.CategoryDto;
import com.gasiuu.backend.domain.entities.CategoryEntity;
import com.gasiuu.backend.domain.entities.UserEntity;
import com.gasiuu.backend.repositories.CategoryRepository;
import com.gasiuu.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    public CategoryDto createCategory(String userEmail, CategoryDto categoryDto) {
        UserEntity user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));


        CategoryEntity category = new CategoryEntity();
        category.setName(categoryDto.getName());
        category.setUser(user);

        CategoryEntity savedCategory = categoryRepository.save(category);

        return mapToDto(savedCategory);
    }


    public List<CategoryDto> getAllCategoriesByUser(String userEmail) {
        UserEntity user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<CategoryEntity> categories = categoryRepository.findByUserId(user.getId());

        List<CategoryDto> categoryDtoList = new ArrayList<>();
        for (CategoryEntity category : categories) {
            categoryDtoList.add(mapToDto(category));
        }
        return categoryDtoList;
    }

    public CategoryDto getCategoryById(Integer id, String userEmail) {
        UserEntity user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        CategoryEntity category = categoryRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new RuntimeException("Category not found or does not belong to the user"));

        return mapToDto(category);
    }

    public CategoryDto updateCategory(Integer id, String userEmail, CategoryDto categoryDto) {
        UserEntity user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        CategoryEntity category = categoryRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new RuntimeException("Category not found or does not belong to the user"));

        if (categoryDto.getName() != null) {
            category.setName(categoryDto.getName());
        }

        CategoryEntity updatedCategory = categoryRepository.save(category);
        return mapToDto(updatedCategory);
    }

    public void deleteCategory(Integer id, String userEmail) {
        UserEntity user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        CategoryEntity category = categoryRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new RuntimeException("Category not found or does not belong to the user"));

        categoryRepository.delete(category);
    }

    private CategoryDto mapToDto(CategoryEntity category) {
        CategoryDto dto = new CategoryDto();
        dto.setId(category.getId());
        dto.setName(category.getName());
        return dto;
    }
}