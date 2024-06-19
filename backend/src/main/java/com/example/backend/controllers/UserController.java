package com.example.backend.controllers;

import com.example.backend.entities.Training;
import com.example.backend.mappers.TrainingMapper;
import com.example.backend.requests.CreateTrainingRequest;
import com.example.backend.requests.UpdateTrainingRequest;
import com.example.backend.responses.CreateTrainingResponse;
import com.example.backend.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;
    private final TrainingMapper trainingMapper;

    @PostMapping("/trainings")
    public ResponseEntity<Training> createNewTraining(@Valid @RequestBody CreateTrainingRequest createTrainingRequest){
        log.info(createTrainingRequest.toString());
        Training createdTraining= userService.createTraining(createTrainingRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTraining);
    }

    @GetMapping("/{userId}/trainings")
    public ResponseEntity<List<CreateTrainingResponse>> getAllTrainings(@PathVariable Long userId){
        List<Training> trainings = userService.getTrainings(userId);
        List<CreateTrainingResponse> response = trainingMapper.toCreateTrainingResponseList(trainings);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping("/{userId}/trainings/{trainingId}")
    public ResponseEntity<Void> deleteTraining(@PathVariable("userId") Long userId, @PathVariable("trainingId") Long trainingId){
        userService.deleteTraining(userId, trainingId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PutMapping("/{userId}/trainings")
    public ResponseEntity<CreateTrainingResponse> updateTraining(@PathVariable("userId") Long userId, @RequestBody UpdateTrainingRequest updateRequest){
        Training training = userService.updateTraining(userId, updateRequest);
        CreateTrainingResponse response = trainingMapper.toCreateTrainingResponse(training);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
