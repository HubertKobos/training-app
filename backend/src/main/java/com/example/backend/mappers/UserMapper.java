package com.example.backend.mappers;

import com.example.backend.dto.SingUpDto;
import com.example.backend.dto.UserDto;
import com.example.backend.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto toUserDto(User user);

    @Mapping(target = "password", ignore = true)
    User signUpToUser(SingUpDto singUpDto);
}
