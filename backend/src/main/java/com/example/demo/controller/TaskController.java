package com.example.demo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.TaskDTO;
import com.example.demo.service.TaskService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    // ==========================================
    // CREATE TASK
    // POST /api/tasks
    // ==========================================

    @PostMapping
    public ResponseEntity<TaskDTO> createTask(
            @Valid @RequestBody TaskDTO taskDTO) {

        TaskDTO createdTask =
                taskService.createTask(taskDTO);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(createdTask);
    }

    // ==========================================
    // GET ALL TASKS
    // GET /api/tasks
    // ==========================================

    @GetMapping
    public ResponseEntity<List<TaskDTO>> getAllTasks() {

        return ResponseEntity.ok(
                taskService.getAllTasks()
        );
    }

    // ==========================================
    // GET TASK BY ID
    // GET /api/tasks/{id}
    // ==========================================

    @GetMapping("/{id}")
    public ResponseEntity<TaskDTO> getTaskById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                taskService.getTaskById(id)
        );
    }

    // ==========================================
    // UPDATE TASK
    // PUT /api/tasks/{id}
    // ==========================================

    @PutMapping("/{id}")
    public ResponseEntity<TaskDTO> updateTask(
            @PathVariable Long id,
            @Valid @RequestBody TaskDTO taskDTO) {

        TaskDTO updatedTask =
                taskService.updateTask(id, taskDTO);

        return ResponseEntity.ok(updatedTask);
    }

    // ==========================================
    // DELETE TASK
    // DELETE /api/tasks/{id}
    // ==========================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask(
            @PathVariable Long id) {

        taskService.deleteTask(id);

        return ResponseEntity.ok(
                "Task deleted successfully"
        );
    }
}