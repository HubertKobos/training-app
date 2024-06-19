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
public class UpdateTrainingRequest {
    @NotNull
    private Long id;
    private LocalDate date;

    private Float distanceKm;

    private LocalTime time;

    private Integer kcal;

    private String comment;
}
