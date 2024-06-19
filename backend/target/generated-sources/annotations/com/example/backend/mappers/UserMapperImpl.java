package com.example.backend.mappers;

import com.example.backend.dto.SingUpDto;
import com.example.backend.dto.UserDto;
import com.example.backend.entities.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-06-19T11:52:15+0200",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 21.0.1 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserDto toUserDto(User user) {
        if ( user == null ) {
            return null;
        }

        UserDto.UserDtoBuilder userDto = UserDto.builder();

        userDto.id( user.getId() );
        userDto.firstName( user.getFirstName() );
        userDto.lastName( user.getLastName() );
        userDto.login( user.getLogin() );

        return userDto.build();
    }

    @Override
    public User signUpToUser(SingUpDto singUpDto) {
        if ( singUpDto == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.firstName( singUpDto.firstName() );
        user.lastName( singUpDto.lastName() );
        user.login( singUpDto.login() );

        return user.build();
    }
}
