package projetLocation.microbackuser.service;

import projetLocation.microbackuser.dto.UserDto;
import projetLocation.microbackuser.model.User;

import java.util.List;

public interface IUserService {

    public UserDto login(UserDto userDto) ;
    public UserDto register(UserDto userDto);

    public UserDto getuser(Long id);

    public List<UserDto> getall();

    public void delete(Long id);

    public UserDto update(UserDto userDto,Long id);


}
