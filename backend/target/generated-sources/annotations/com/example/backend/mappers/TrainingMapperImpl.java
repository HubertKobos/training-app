package com.example.backend.mappers;

import com.example.backend.entities.Training;
import com.example.backend.responses.CreateTrainingResponse;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-06-19T11:52:15+0200",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 21.0.1 (Oracle Corporation)"
)
@Component
public class TrainingMapperImpl implements TrainingMapper {

    @Override
    public CreateTrainingResponse toCreateTrainingResponse(Training training) {
        if ( training == null ) {
            return null;
        }

        CreateTrainingResponse.CreateTrainingResponseBuilder createTrainingResponse = CreateTrainingResponse.builder();

        createTrainingResponse.date( training.getDate() );
        if ( training.getTime() != null ) {
            createTrainingResponse.time( LocalTime.parse( mapLocalTimeToString( training.getTime() ) ) );
        }
        createTrainingResponse.id( training.getId() );
        createTrainingResponse.distanceKm( training.getDistanceKm() );
        createTrainingResponse.kcal( training.getKcal() );
        createTrainingResponse.comment( training.getComment() );
        createTrainingResponse.averageSpeed( training.getAverageSpeed() );

        return createTrainingResponse.build();
    }

    @Override
    public List<CreateTrainingResponse> toCreateTrainingResponseList(List<Training> trainings) {
        if ( trainings == null ) {
            return null;
        }

        List<CreateTrainingResponse> list = new ArrayList<CreateTrainingResponse>( trainings.size() );
        for ( Training training : trainings ) {
            list.add( toCreateTrainingResponse( training ) );
        }

        return list;
    }
}
