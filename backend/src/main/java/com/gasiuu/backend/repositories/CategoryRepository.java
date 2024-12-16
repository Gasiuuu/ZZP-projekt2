package com.gasiuu.backend.repositories;

import com.gasiuu.backend.domain.entities.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Integer> {
    List<CategoryEntity> findByUserId(Integer userId);

    Optional<CategoryEntity> findByIdAndUserId(Integer id, Integer userId);
}