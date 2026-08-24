package com.example.demo.service;

import java.util.List;

import com.example.demo.dto.TaskDTO;

public interface TaskService {

    TaskDTO createTask(TaskDTO taskDTO);

    List<TaskDTO> getAllTasks();

    TaskDTO getTaskById(Long id);

    TaskDTO updateTask(Long id, TaskDTO taskDTO);

    void deleteTask(Long id);
}