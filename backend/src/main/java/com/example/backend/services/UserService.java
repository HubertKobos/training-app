package com.example.backend.services;

import com.example.backend.entities.Training;
import com.example.backend.entities.User;
import com.example.backend.exceptions.AppException;
import com.example.backend.repositories.TrainingRepository;
import com.example.backend.repositories.UserRepository;
import com.example.backend.requests.CreateTrainingRequest;
import com.example.backend.requests.UpdateTrainingRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.time.LocalTime;
import java.util.List;


@Service
@RequiredArgsConstructor
@Log
public class UserService {
    private final UserRepository userRepository;
    private final TrainingRepository trainingRepository;

    @Transactional
    public Training createTraining(CreateTrainingRequest createTrainingRequest) {
        User user = userRepository.findById(createTrainingRequest.getUserId())
                .orElseThrow(() -> new AppException("User with given id " + createTrainingRequest.getUserId() + " do not exist", HttpStatus.NOT_FOUND));

        float timeInHours = convertLocalTimeToHours(createTrainingRequest.getTime());

        float averageSpeed = calculateAverageSpeed(createTrainingRequest.getDistanceKm(), timeInHours);


        Training training = Training.builder()
                .time(createTrainingRequest.getTime())
                .comment(createTrainingRequest.getComment())
                .kcal(createTrainingRequest.getKcal())
                .date(createTrainingRequest.getDate())
                .distanceKm(createTrainingRequest.getDistanceKm())
                .user(user)
                .averageSpeed(averageSpeed)
                .build();

        training = trainingRepository.save(training);
        return training;
    }

    private float calculateAverageSpeed(float distanceKm, float timeInHours) {
        float averageSpeed;
        // prevent from infinity value if timeInHours is too small
        if (Float.isFinite(timeInHours) && timeInHours != 0) {
            averageSpeed = distanceKm / timeInHours;
        } else {
            averageSpeed = 0;
        }

        DecimalFormat df = new DecimalFormat("0.00");
        String format = df.format(averageSpeed);
        String replace = format.replace(',', '.');
        averageSpeed = Float.parseFloat(replace);

        return averageSpeed;
    }

    private float convertLocalTimeToHours(LocalTime time) {
        double doubleTime = time.getHour() + (double) time.getMinute() / 60 + (double) time.getSecond() / 3600;
        double roundedTime = Math.round(doubleTime * 100.0) / 100.0;
        return (float) roundedTime;
    }
    @Transactional
    public List<Training> getTrainings(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException("User with given id " + userId + " do not exist", HttpStatus.NOT_FOUND));
        return user.getTrainings();
    }
    @Transactional
    public void deleteTraining(Long userId, Long trainingId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException("User with given id " + userId + " do not exist", HttpStatus.NOT_FOUND));
        Training trainingToRemove = user.getTrainings().stream()
                .filter(training -> training.getId().equals(trainingId))
                .findFirst()
                .orElseThrow(() -> new AppException("Training with id " + trainingId + " not found for user " + userId, HttpStatus.NOT_FOUND));

        user.getTrainings().remove(trainingToRemove);
        userRepository.save(user);
    }

    public Training updateTraining(Long userId, UpdateTrainingRequest updateRequest) {
        boolean isDistanceOrTimeUpdated = false; // if distance or time is being updated, change the flag to calculate new average speed

        User user = userRepository.findById(userId).orElseThrow(() -> new AppException("User with given id " + userId + " do not exist", HttpStatus.NOT_FOUND));

        Training training = user.getTrainings().stream()
                .filter(tr -> tr.getId().equals(updateRequest.getId()))
                .findFirst()
                .orElseThrow(() -> new AppException("Training with id " + updateRequest.getId() + " not found for user " + userId, HttpStatus.NOT_FOUND));

        if (updateRequest.getDate() != null) {
            training.setDate(updateRequest.getDate());
        }
        if (updateRequest.getDistanceKm() != null) {
            training.setDistanceKm(updateRequest.getDistanceKm());
            isDistanceOrTimeUpdated = true;
        }
        if (updateRequest.getTime() != null) {
            training.setTime(updateRequest.getTime());
            isDistanceOrTimeUpdated = true;
        }
        if (updateRequest.getKcal() != null) {
            training.setKcal(updateRequest.getKcal());
        }
        if (updateRequest.getComment() != null) {
            training.setComment(updateRequest.getComment());
        }
        float averageSpeed = calculateAverageSpeed(training.getDistanceKm(), convertLocalTimeToHours(training.getTime()));
        training.setAverageSpeed(averageSpeed);

        return trainingRepository.save(training);
    }
}
