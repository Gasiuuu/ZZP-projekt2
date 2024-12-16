
package com.gasiuu.backend.controllers;

import com.gasiuu.backend.domain.dto.TaskDto;
import com.gasiuu.backend.services.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/adminuser/task")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping("/create")
    public ResponseEntity<TaskDto> createTask(Authentication authentication, @RequestBody TaskDto taskDto) {
        String userEmail = authentication.getName();
        TaskDto task = taskService.createTask(userEmail, taskDto);
        return ResponseEntity.ok(task);
    }

    @GetMapping("/get-all-tasks")
    public ResponseEntity<List<TaskDto>> getUserTasks(Authentication authentication) {
        String userEmail = authentication.getName();
        List<TaskDto> tasks = taskService.getTasksByUser(userEmail);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskDto> getTaskById(@PathVariable Integer id) {
        TaskDto task = taskService.getTaskById(id);
        return ResponseEntity.ok(task);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<TaskDto> updateTask(@PathVariable Integer id, @RequestBody TaskDto taskDto) {
        TaskDto updatedTask = taskService.updateTask(id, taskDto);
        return ResponseEntity.ok(updatedTask);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Integer id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
}
