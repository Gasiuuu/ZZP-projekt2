package com.gasiuu.backend.repositories;


import com.gasiuu.backend.domain.entities.TaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TaskRepository extends JpaRepository<TaskEntity, Integer> {
    List<TaskEntity> findByUserId(Integer userId);
}
