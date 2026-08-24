package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dto.TaskDTO;
import com.example.demo.entity.Task;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.TaskRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    // CREATE
    @Override
    public TaskDTO createTask(TaskDTO taskDTO) {

        Task task = new Task();

        task.setTitle(taskDTO.getTitle());
        task.setDescription(taskDTO.getDescription());
        task.setCompleted(taskDTO.isCompleted());

        Task savedTask = taskRepository.save(task);

        return convertToDTO(savedTask);
    }

    // GET ALL
    @Override
    public List<TaskDTO> getAllTasks() {

        return taskRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    // GET BY ID
    @Override
    public TaskDTO getTaskById(Long id) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "Task not found with id: " + id
                    )
                );

        return convertToDTO(task);
    }

    // UPDATE
    @Override
    public TaskDTO updateTask(
            Long id,
            TaskDTO taskDTO) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "Task not found with id: " + id
                    )
                );

        task.setTitle(taskDTO.getTitle());
        task.setDescription(taskDTO.getDescription());
        task.setCompleted(taskDTO.isCompleted());

        Task updatedTask = taskRepository.save(task);

        return convertToDTO(updatedTask);
    }

    // DELETE
    @Override
    public void deleteTask(Long id) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "Task not found with id: " + id
                    )
                );

        taskRepository.delete(task);
    }

    // ENTITY → DTO
    private TaskDTO convertToDTO(Task task) {

        return new TaskDTO(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.isCompleted()
        );
    }
}