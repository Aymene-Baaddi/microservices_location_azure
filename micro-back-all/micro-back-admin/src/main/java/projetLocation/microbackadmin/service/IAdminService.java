package projetLocation.microbackadmin.service;

import projetLocation.microbackadmin.dto.AdminDto;

public interface IAdminService {

    public AdminDto login(AdminDto adminDto) ;
    public AdminDto register(AdminDto adminDto);

}
