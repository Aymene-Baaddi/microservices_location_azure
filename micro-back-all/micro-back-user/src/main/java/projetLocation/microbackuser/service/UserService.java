package projetLocation.microbackuser.service;

import org.mindrot.jbcrypt.BCrypt;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import projetLocation.microbackuser.dto.UserDto;
import projetLocation.microbackuser.model.User;
import projetLocation.microbackuser.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    ModelMapper modelMapper;

    @Override
    public UserDto login(UserDto userDto) {
        Optional<User> user = userRepository.findByEmail(userDto.getEmail());

        if(user.isPresent()){
            User user1 = user.get();
            UserDto userDto1 = modelMapper.map(user1,UserDto.class);
            if (BCrypt.checkpw(userDto.getPassword(), user1.getPassword())){
                return userDto1;
            }
            return null;

        }
        return null;
    }

    @Override
    public UserDto register(UserDto userDto) {

        Optional<User> existingEmail = userRepository.findByEmail(userDto.getEmail());


        if (existingEmail.isPresent()) {
            throw new RuntimeException("Email already exists.");
        }
        User user = modelMapper.map(userDto,User.class);
        user.setPassword(BCrypt.hashpw(user.getPassword(),BCrypt.gensalt()));

        User user1=userRepository.save(user);

        UserDto userDto1 = modelMapper.map(user1,UserDto.class);
        return userDto1 ;

    }

    @Override
    public UserDto getuser(Long id) {
        Optional<User> user = userRepository.findById(id);
        UserDto userDto = modelMapper.map(user,UserDto.class);
        return userDto;
    }

    @Override
    public List<UserDto> getall() {
        List<UserDto> userDto = new ArrayList<>();
        List<User> users = userRepository.findAll();
        for (User v : users ){
            UserDto uDto = modelMapper.map(v,UserDto.class);
            userDto.add(uDto);
        }
        return userDto;

    }



    @Override
    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public UserDto update(UserDto userDto, Long id) {
        User u = new User();
        u = modelMapper.map(userDto, User.class);
        User user = u;
        userRepository.findById(id).map(us ->{
            us.setNom(user.getNom());
            us.setPrenom(user.getPrenom());
            us.setEmail(user.getEmail());
            us.setAge(user.getAge());
            us.setPassword(user.getPassword());
            us.setAdresse(user.getAdresse());
            us.setTelephone(user.getTelephone());
            us.setCin(user.getCin());
            us.setVille(user.getVille());

            return userRepository.save(us);
        } );
        return userDto;
    }
}
