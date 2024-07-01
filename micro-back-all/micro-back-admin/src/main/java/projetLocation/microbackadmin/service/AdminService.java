package projetLocation.microbackadmin.service;

import org.mindrot.jbcrypt.BCrypt;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import projetLocation.microbackadmin.dto.AdminDto;
import projetLocation.microbackadmin.model.Admin;
import projetLocation.microbackadmin.repository.AdminRepository;


import java.util.Optional;

@Service
public class AdminService implements IAdminService{
    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    ModelMapper modelMapper;



    @Override
    public AdminDto login(AdminDto adminDto) {
        Optional<Admin> admin = adminRepository.findByName(adminDto.getName());

        if(admin.isPresent()){
            Admin admin1 = admin.get();
            AdminDto adminDto1 = modelMapper.map(admin1,AdminDto.class);
            if (BCrypt.checkpw(adminDto.getPassword(), admin1.getPassword())){
                return adminDto1;
            }
            return null;

        }
        return null;
    }

    @Override
    public AdminDto register(AdminDto adminDto) {

        Optional<Admin> existingEmail = adminRepository.findByEmail(adminDto.getEmail());


        if (existingEmail.isPresent()) {
            throw new RuntimeException("Email already exists.");
        }
        Admin admin = modelMapper.map(adminDto,Admin.class);
        admin.setPassword(BCrypt.hashpw(admin.getPassword(),BCrypt.gensalt()));

        Admin admin1=adminRepository.save(admin);

        AdminDto adminDto1 = modelMapper.map(admin1,AdminDto.class);
        return adminDto1 ;
    }
}
















