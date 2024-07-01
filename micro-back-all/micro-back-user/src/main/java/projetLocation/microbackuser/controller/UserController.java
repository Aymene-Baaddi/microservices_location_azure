package projetLocation.microbackuser.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import projetLocation.microbackuser.dto.UserDto;
import projetLocation.microbackuser.service.IUserService;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private IUserService userService;

    @PostMapping("/register")
    public UserDto register(@RequestBody UserDto userDto){
        UserDto userDto1=userService.register(userDto);
        return userDto1 ;
    }



    @PostMapping("/login")
    public UserDto login(@RequestBody UserDto userDto) {
        UserDto userDto1 = userService.login(userDto);
        boolean auth = false;
        if (userDto1 != null) {
            auth = true;
        }
        return auth ?userDto1 : null;
    }

    @GetMapping("{id}")
    public UserDto getuser(@PathVariable Long id){
          return userService.getuser(id);
    }

    @GetMapping
    public List<UserDto> getall(){return userService.getall();}

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id){
        userService.delete(id);
    }


    @PutMapping("{id}")
    public UserDto update(@RequestBody UserDto userDto, @PathVariable Long id){return userService.update(userDto,id);}

}
