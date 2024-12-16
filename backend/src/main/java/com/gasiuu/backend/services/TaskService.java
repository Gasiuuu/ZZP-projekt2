package com.gasiuu.backend.services;

import com.gasiuu.backend.domain.dto.TaskDto;
import com.gasiuu.backend.domain.entities.TaskEntity;
import com.gasiuu.backend.domain.entities.CategoryEntity;
import com.gasiuu.backend.domain.entities.UserEntity;
import com.gasiuu.backend.repositories.TaskRepository;
import com.gasiuu.backend.repositories.CategoryRepository;
import com.gasiuu.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    // Tworzenie zadania
    public TaskDto createTask(String userEmail, TaskDto taskDto) {
        TaskDto response = new TaskDto();
        try {
            UserEntity user = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            CategoryEntity category = null;
            if (taskDto.getCategoryId() != null) {
                category = categoryRepository.findByIdAndUserId(taskDto.getCategoryId(), user.getId())
                        .orElseThrow(() -> new RuntimeException("Category not found or does not belong to the user"));
            }

            TaskEntity task = new TaskEntity();
            task.setTitle(taskDto.getTitle());
            task.setDescription(taskDto.getDescription());
            task.setCategory(category);
            task.setStatus(taskDto.getStatus());
            task.setUser(user);

            TaskEntity savedTask = taskRepository.save(task);

            response.setId(savedTask.getId());
            response.setTitle(savedTask.getTitle());
            response.setDescription(savedTask.getDescription());
            task.setStatus(taskDto.getStatus() != null ? taskDto.getStatus() : "Pending");
            response.setStatus(savedTask.getStatus());
            response.setCategoryName(category != null ? category.getName() : "Uncategorized");
        } catch (Exception e) {
            throw new RuntimeException("Error while creating task: " + e.getMessage());
        }
        return response;
    }

    // Pobieranie zadań użytkownika
    public List<TaskDto> getTasksByUser(String userEmail) {
        List<TaskDto> taskDtoList = new ArrayList<>();
        try {
            UserEntity user = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            List<TaskEntity> tasks = taskRepository.findByUserId(user.getId());

            for (TaskEntity task : tasks) {
                TaskDto dto = new TaskDto();
                dto.setId(task.getId());
                dto.setTitle(task.getTitle());
                dto.setDescription(task.getDescription());
                dto.setStatus(task.getStatus());
                dto.setCategoryId(task.getCategory() != null ? task.getCategory().getId() : null);
                dto.setCategoryName(task.getCategory() != null ? task.getCategory().getName() : "Uncategorized");

                taskDtoList.add(dto);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error while fetching tasks: " + e.getMessage());
        }
        return taskDtoList;
    }

    public TaskDto getTaskById(Integer id) {
        TaskDto response = new TaskDto();
        try {
            TaskEntity task = taskRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Task not found"));

            response.setId(task.getId());
            response.setTitle(task.getTitle());
            response.setDescription(task.getDescription());
            response.setStatus(task.getStatus());
            response.setCategoryId(task.getCategory() != null ? task.getCategory().getId() : null);
            response.setCategoryName(task.getCategory() != null ? task.getCategory().getName() : "Uncategorized");

        } catch (Exception e) {
            throw new RuntimeException("Error while fetching task by ID: " + e.getMessage());
        }
        return response;
    }

    public TaskDto updateTask(Integer id, TaskDto taskDto) {
        TaskDto response = new TaskDto();
        try {
            TaskEntity task = taskRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Task not found"));

            if (taskDto.getTitle() != null) task.setTitle(taskDto.getTitle());
            if (taskDto.getDescription() != null) task.setDescription(taskDto.getDescription());
            if (taskDto.getStatus() != null) task.setStatus(taskDto.getStatus());

            if (taskDto.getCategoryId() != null) {
                CategoryEntity category = categoryRepository.findByIdAndUserId(taskDto.getCategoryId(), task.getUser().getId())
                        .orElseThrow(() -> new RuntimeException("Category not found or does not belong to the user"));
                task.setCategory(category);
            } else {
                task.setCategory(null); // Jeśli nie podano kategorii, usuń istniejącą
            }

            TaskEntity updatedTask = taskRepository.save(task);

            response.setId(updatedTask.getId());
            response.setTitle(updatedTask.getTitle());
            response.setDescription(updatedTask.getDescription());
            response.setStatus(updatedTask.getStatus());
            response.setCategoryId(updatedTask.getCategory() != null ? updatedTask.getCategory().getId() : null);
            response.setCategoryName(updatedTask.getCategory() != null ? updatedTask.getCategory().getName() : "Uncategorized");
        } catch (Exception e) {
            throw new RuntimeException("Error while updating task: " + e.getMessage());
        }
        return response;
    }

    public void deleteTask(Integer id) {
        try {
            TaskEntity task = taskRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Task not found"));
            taskRepository.delete(task);
        } catch (Exception e) {
            throw new RuntimeException("Error while deleting task: " + e.getMessage());
        }
    }
}
