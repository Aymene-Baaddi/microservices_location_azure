package projetLocation.microbackadmin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import projetLocation.microbackadmin.dto.AdminDto;
import projetLocation.microbackadmin.service.IAdminService;

@CrossOrigin
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private IAdminService adminService;


    @PostMapping("/register")
    public AdminDto register(@RequestBody AdminDto adminDto){
        AdminDto adminDto1=adminService.register(adminDto);
        return adminDto1 ;
    }



    @PostMapping("/login")
    public AdminDto login(@RequestBody AdminDto adminDto) {
        AdminDto adminDto1 = adminService.login(adminDto);
        boolean auth = false;
        if (adminDto1 != null) {
            auth = true;
        }
        return auth ? adminDto1 : null;
    }

}
