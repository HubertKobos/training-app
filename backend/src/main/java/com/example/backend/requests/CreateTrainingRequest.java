package com.example.backend.requests;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class CreateTrainingRequest {
    @NotNull
    private LocalDate date;

    @NotNull
    private float distanceKm;

    @NotNull
    private LocalTime time;

    private int kcal;

    private String comment;

    @NotNull
    private Long userId;
}
