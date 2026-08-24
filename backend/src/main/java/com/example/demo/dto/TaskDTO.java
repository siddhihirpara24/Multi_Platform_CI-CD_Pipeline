package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TaskDTO {

    private Long id;

    @NotBlank(message = "Task title is required")
    private String title;

    private String description;

    private boolean completed;
}