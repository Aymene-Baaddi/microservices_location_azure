package projetLocation.microbackadmin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import projetLocation.microbackadmin.model.Admin;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin,Long> {

    Optional<Admin> findByName(String name);
    Optional<Admin> findByEmail(String email);


}
