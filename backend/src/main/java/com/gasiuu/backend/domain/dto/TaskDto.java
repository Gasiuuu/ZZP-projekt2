package com.gasiuu.backend.domain.dto;

import lombok.Data;


@Data
public class TaskDto {
    private Integer id;
    private String title;
    private String description;
    private String status;
    private Integer categoryId;
    private String categoryName;
}
