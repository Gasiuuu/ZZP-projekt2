package com.gasiuu.backend.domain.dto;

import lombok.Data;

import java.util.List;

@Data
public class CategoryDto {
    private Integer id;
    private String name;
    private List<TaskDto> tasks;
}
