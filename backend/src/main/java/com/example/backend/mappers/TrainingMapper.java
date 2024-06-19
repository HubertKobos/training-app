package com.example.backend.mappers;

import com.example.backend.entities.Training;
import com.example.backend.responses.CreateTrainingResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.time.LocalTime;
import java.util.List;

@Mapper(componentModel = "spring")
public interface TrainingMapper {

    @Mapping(target = "date", source = "date", dateFormat = "yyyy-MM-dd")
    @Mapping(target = "time", source = "time", qualifiedByName = "mapLocalTimeToString")
    CreateTrainingResponse toCreateTrainingResponse(Training training);

    @Mapping(target = "date", source = "date", dateFormat = "yyyy-MM-dd")
    @Mapping(target = "time", source = "time", qualifiedByName = "mapLocalTimeToString")
    List<CreateTrainingResponse> toCreateTrainingResponseList(List<Training> trainings);

    @Named("mapLocalTimeToString")
    default String mapLocalTimeToString(LocalTime localTime) {
        return localTime != null ? localTime.toString() : null;
    }
}
